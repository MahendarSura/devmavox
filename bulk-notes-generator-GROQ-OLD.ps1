$ErrorActionPreference = "Stop"

$ProjectRoot = (Get-Location).Path
$Inventory = Join-Path $ProjectRoot "notes-topics-inventory.csv"
$ReportPath = Join-Path $ProjectRoot "notes-bulk-final-report.csv"
$BackupRoot = Join-Path $ProjectRoot ("notes-bulk-backup-" + (Get-Date -Format "yyyyMMdd-HHmmss"))

$ApiUrl = "https://api.groq.com/openai/v1/chat/completions"
$Model = "openai/gpt-oss-20b"

if (-not $env:GROQ_API_KEY) {
    throw "GROQ_API_KEY missing."
}
if (-not (Test-Path $Inventory)) {
    throw "notes-topics-inventory.csv not found."
}

New-Item -ItemType Directory -Path $BackupRoot -Force | Out-Null

$allItems = Import-Csv $Inventory

$items = @(
    $allItems | Where-Object {
        $_.Tool -and $_.Topic -and $_.Path -and
        $_.Tool.Trim().ToLower() -notin @("linux", "ansible") -and
        $_.Path -match '\\topics\\' -and
        $_.Path -notmatch '\\(linux|ansible)\\'
    }
)

$items = @(
    $items | Sort-Object `
        @{ Expression = { if ($_.Tool.Trim().ToLower() -eq "argocd") { 1 } else { 0 } } },
        Tool, Topic
)

$report = @{}
if (Test-Path $ReportPath) {
    foreach ($row in (Import-Csv $ReportPath)) {
        $report["$($row.Tool)|$($row.Topic)"] = $row
    }
}

function Save-Progress {
    @($report.Values | Sort-Object Tool, Topic) |
        Export-Csv -LiteralPath $ReportPath -NoTypeInformation -Encoding UTF8
}

function Invoke-GroqSection {
    param(
        [string]$Prompt,
        [int]$MaxTokens = 1600
    )

    $payload = @{
        model = $Model
        messages = @(
            @{
                role = "system"
                content = "You are a senior DevOps architect. Return exactly one valid JSON object. No markdown fences, no commentary, no reasoning."
            },
            @{
                role = "user"
                content = $Prompt
            }
        )
        temperature = 0.2
        max_completion_tokens = $MaxTokens
    }

    $body = $payload | ConvertTo-Json -Depth 12

    for ($attempt = 1; $attempt -le 8; $attempt++) {
        try {
            $response = Invoke-WebRequest `
                -Uri $ApiUrl `
                -Method Post `
                -Headers @{
                    Authorization = "Bearer $env:GROQ_API_KEY"
                    "Content-Type" = "application/json"
                } `
                -Body $body `
                -TimeoutSec 180 `
                -SkipHttpErrorCheck

            $status = [int]$response.StatusCode

            if ($status -eq 200) {
                $result = $response.Content | ConvertFrom-Json -ErrorAction Stop
                $content = [string]$result.choices[0].message.content

                if ([string]::IsNullOrWhiteSpace($content)) {
                    throw "Empty model response."
                }

                $start = $content.IndexOf('{')
                $end = $content.LastIndexOf('}')

                if ($start -lt 0 -or $end -le $start) {
                    throw "Response did not contain a complete JSON object."
                }

                $json = $content.Substring($start, $end - $start + 1)
                return ($json | ConvertFrom-Json -ErrorAction Stop)
            }

            Write-Host "Groq HTTP $status" -ForegroundColor Yellow
            Write-Host $response.Content

            if ($status -eq 429) {
                $wait = [Math]::Min(300, 45 * $attempt)
                Write-Host "Rate limited. Waiting $wait seconds..." -ForegroundColor Yellow
                Start-Sleep -Seconds $wait
                continue
            }

            if ($status -ge 500) {
                Start-Sleep -Seconds (20 * $attempt)
                continue
            }

            throw "HTTP $status : $($response.Content)"
        }
        catch {
            if ($_.Exception.Message -match '^HTTP \d+') {
                throw
            }

            if ($attempt -eq 8) {
                throw
            }

            $wait = [Math]::Min(120, 10 * $attempt)
            Write-Host "Section request failed: $($_.Exception.Message)" -ForegroundColor Yellow
            Write-Host "Retrying in $wait seconds..." -ForegroundColor Yellow
            Start-Sleep -Seconds $wait
        }
    }

    throw "Section generation exhausted retries."
}

$sectionSpecs = @(
    @{
        Heading = "1. Introduction, Purpose and Core Concepts"
        Focus = "Explain the technology, its purpose, problems it solves, use cases, terminology, prerequisites, limitations and where it fits in a DevOps environment."
    },
    @{
        Heading = "2. Architecture, Components and Communication"
        Focus = "Explain architecture, every major component, responsibilities, communication paths, dependencies, ports or interfaces where relevant, control flow and data flow."
    },
    @{
        Heading = "3. Internal Working and End-to-End Workflow"
        Focus = "Explain internal working step by step and a realistic workflow from development through source control, build, testing, deployment, production operation and rollback as relevant to this topic."
    },
    @{
        Heading = "4. Practical Implementation and Real-Time Project"
        Focus = "Give a realistic hands-on implementation. Include prerequisites, project structure, installation or setup, commands, configuration, execution, validation and cleanup where relevant."
    },
    @{
        Heading = "5. Production Troubleshooting and Log Analysis"
        Focus = "Explain production symptoms, diagnostic sequence, log locations, log interpretation, metrics, root-cause analysis, safe fixes, rollback and post-fix verification. Include a problems array with at least 3 objects, each having issue and solution properties. Each solution must explain root cause, investigation, fix and verification."
    },
    @{
        Heading = "6. Security, Monitoring, Performance and Best Practices"
        Focus = "Cover authentication, authorization, secrets, network security, monitoring, alerting, logs, performance, scaling, reliability, backup, disaster recovery and operational best practices relevant to this topic."
    },
    @{
        Heading = "7. Operational Best Practices and Interview Preparation"
        Focus = "Give practical production standards, design decisions, common mistakes, operational checklist and interview preparation. Include an interviewQuestions array with at least 5 objects, each containing question and detailed answer properties."
    }
)

$success = 0
$failed = 0
$skipped = 0
$total = $items.Count
$index = 0

Write-Host ""
Write-Host "DEV MAVOX SECTION-BY-SECTION GENERATION" -ForegroundColor Cyan
Write-Host "Eligible topics: $total" -ForegroundColor Cyan
Write-Host "Linux and Ansible excluded." -ForegroundColor Yellow
Write-Host "ArgoCD is queued last." -ForegroundColor Yellow
Write-Host "Each topic uses 7 separate generation requests." -ForegroundColor Yellow
Write-Host "Backup: $BackupRoot" -ForegroundColor Gray

foreach ($item in $items) {
    $index++
    $tool = $item.Tool.Trim().ToLower()
    $topic = $item.Topic.Trim()
    $key = "$tool|$topic"

    if ($report.ContainsKey($key) -and $report[$key].Status -eq "SUCCESS") {
        Write-Host "[$index/$total] SKIP SUCCESS: $key" -ForegroundColor DarkGray
        $skipped++
        continue
    }

    Write-Host ""
    Write-Host "[$index/$total] START: $key" -ForegroundColor Cyan

    $sections = @()
    $topicFailed = $false
    $failureMessage = ""

    for ($s = 0; $s -lt 7; $s++) {
        $spec = $sectionSpecs[$s]
        $sectionNumber = $s + 1

        Write-Host "  Section $sectionNumber/7 : $($spec.Heading)" -ForegroundColor Yellow

        $prompt = @"
Create ONE complete detailed training-note section for a DevOps documentation application.

TOOL: $tool
TOPIC: $topic
SECTION: $sectionNumber of 7
HEADING: $($spec.Heading)

FOCUS:
$($spec.Focus)

Return exactly one JSON object with these properties:
{
  "heading": "Exact supplied heading",
  "explanation": "Detailed topic-specific explanation with practical technical depth.",
  "steps": ["Step 1 with detail", "Step 2 with detail", "Step 3 with detail", "Additional useful steps"],
  "commands": "Real commands with explanations and expected results.",
  "config": "Relevant realistic configuration example with explanations."
}

SPECIAL REQUIREMENTS:
- Section 5 must additionally include:
  "problems": [
    {"issue": "Realistic production symptom", "solution": "Investigation, root cause, safe fix and verification"},
    {"issue": "Second production symptom", "solution": "Investigation, root cause, safe fix and verification"},
    {"issue": "Third production symptom", "solution": "Investigation, root cause, safe fix and verification"}
  ]
- Section 7 must additionally include:
  "interviewQuestions": [
    {"question": "Practical technical question", "answer": "Detailed technically correct answer"},
    {"question": "Practical technical question", "answer": "Detailed technically correct answer"},
    {"question": "Practical technical question", "answer": "Detailed technically correct answer"},
    {"question": "Practical technical question", "answer": "Detailed technically correct answer"},
    {"question": "Practical technical question", "answer": "Detailed technically correct answer"}
  ]

For other sections, do not add problems or interviewQuestions.
All content must be specifically about $tool and $topic.
Use correct commands and valid configuration syntax.
Use safe placeholders for secrets.
Avoid generic filler and repeated content.
Commands and configuration must be useful, not empty.
Return valid JSON only. No markdown fences.
"@

        $sectionData = $null
        $sectionError = ""

        # Retry invalid/truncated section JSON up to 3 times.
        for ($repair = 1; $repair -le 3; $repair++) {
            try {
                $sectionData = Invoke-GroqSection -Prompt $prompt -MaxTokens 1600

                if (
                    -not $sectionData.heading -or
                    -not $sectionData.explanation -or
                    @($sectionData.steps).Count -lt 3 -or
                    -not $sectionData.commands -or
                    -not $sectionData.config
                ) {
                    throw "Section is missing required fields or content."
                }

                if ($s -eq 4 -and @($sectionData.problems).Count -lt 3) {
                    throw "Section 5 needs at least 3 production problems."
                }

                if ($s -eq 6 -and @($sectionData.interviewQuestions).Count -lt 5) {
                    throw "Section 7 needs at least 5 interview questions."
                }

                break
            }
            catch {
                $sectionError = $_.Exception.Message
                $sectionData = $null
                Write-Host "  Retry $repair/3: $sectionError" -ForegroundColor DarkYellow
                Start-Sleep -Seconds 5
            }
        }

        if ($null -eq $sectionData) {
            $topicFailed = $true
            $failureMessage = "Section $sectionNumber failed: $sectionError"
            break
        }

        $sections += $sectionData
        Start-Sleep -Seconds 3
    }

    if ($topicFailed) {
        $report[$key] = [PSCustomObject]@{
            Tool = $tool
            Topic = $topic
            Path = [System.IO.Path]::GetFullPath($item.Path)
            Status = "FAILED"
            Details = $failureMessage
            UpdatedAt = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
        }

        $failed++
        Write-Host "FAILED: $key - $failureMessage" -ForegroundColor Red
        Save-Progress
        continue
    }

    try {
        $data = [PSCustomObject]@{
            title = "$($topic -replace '-', ' ' -replace '_', ' ') - $tool"
            description = "Detailed practical training notes for $topic in $tool, covering architecture, implementation, production operations, troubleshooting, security and interview preparation."
            sections = @($sections)
        }

        $target = [System.IO.Path]::GetFullPath($item.Path)

        if (Test-Path -LiteralPath $target) {
            $relative = $target.Substring($ProjectRoot.Length).TrimStart('\')
            $backupPath = Join-Path $BackupRoot $relative
            New-Item -ItemType Directory -Path (Split-Path $backupPath -Parent) -Force | Out-Null
            Copy-Item -LiteralPath $target -Destination $backupPath -Force
        }
        else {
            New-Item -ItemType Directory -Path (Split-Path $target -Parent) -Force | Out-Null
        }

        $serialized = $data | ConvertTo-Json -Depth 40
        $tsContent = @"
import type { NoteData } from "../../types";

const data: NoteData = $serialized;

export default data;
"@

        $tempPath = "$target.tmp"
        [System.IO.File]::WriteAllText(
            $tempPath,
            $tsContent,
            [System.Text.UTF8Encoding]::new($false)
        )
        Move-Item -LiteralPath $tempPath -Destination $target -Force

        $report[$key] = [PSCustomObject]@{
            Tool = $tool
            Topic = $topic
            Path = $target
            Status = "SUCCESS"
            Details = "7 sections generated separately and validated"
            UpdatedAt = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
        }

        $success++
        Write-Host "SUCCESS: $key" -ForegroundColor Green
    }
    catch {
        $report[$key] = [PSCustomObject]@{
            Tool = $tool
            Topic = $topic
            Path = [System.IO.Path]::GetFullPath($item.Path)
            Status = "FAILED"
            Details = "File write error: $($_.Exception.Message)"
            UpdatedAt = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
        }

        $failed++
        Write-Host "FILE FAILED: $key - $($_.Exception.Message)" -ForegroundColor Red
    }

    Save-Progress
    Start-Sleep -Seconds 5
}

Save-Progress

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "BULK GENERATION FINISHED" -ForegroundColor Green
Write-Host "New successes: $success"
Write-Host "Failures: $failed"
Write-Host "Skipped existing successes: $skipped"
Write-Host "Eligible topics: $total"
Write-Host "Report: $ReportPath"
Write-Host "Backup: $BackupRoot"
Write-Host "========================================" -ForegroundColor Cyan

