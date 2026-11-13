"use client";

import { useState } from "react";
import { parseDocument } from "yaml";

type QuizQuestion = {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

type PipelineLesson = {
  title: string;
  description: string;
  purpose: string;
  concepts: string[];
  example: string;
  practice: string[];
  mistakes: string[];
  incident: string;
  recovery: string[];
  quiz: QuizQuestion[];
};

const lessons: Record<string, PipelineLesson> = {
  "Jenkinsfile": {
    title: "Jenkinsfile — Declarative Pipeline",
    description:
      "A Jenkinsfile defines a Jenkins Pipeline as code. It describes the stages, agents, steps, environment, conditions and post-build behavior used to automate software delivery. Keeping the pipeline definition in source control makes CI/CD changes reviewable and repeatable.",
    purpose:
      "Use Jenkins Pipeline as Code to standardize build, test, security scanning, packaging and deployment workflows. A Jenkinsfile allows teams to review pipeline changes alongside application code and reproduce the same delivery process across environments.",
    concepts: [
      "pipeline is the root block of a Declarative Pipeline.",
      "agent defines where the pipeline or a stage executes. Common choices include any, none and a labeled agent.",
      "stages groups the major phases of a delivery workflow.",
      "stage names a logical phase such as Build, Test, Scan or Deploy.",
      "steps contains the commands or Jenkins steps executed inside a stage.",
      "environment defines environment variables available to the pipeline or a stage.",
      "parameters allow users to supply controlled input when starting a build.",
      "when controls whether a stage should execute based on conditions.",
      "post defines actions for conditions such as always, success, failure and unstable.",
      "credentials should be retrieved through Jenkins credential bindings rather than hardcoded secrets.",
      "tools can select configured build tools such as Maven or JDK installations.",
      "timeout, retry and timestamps help make pipeline execution more predictable and diagnosable.",
      "Shared Libraries allow teams to reuse pipeline logic across repositories.",
      "A Jenkinsfile is Groovy-based pipeline syntax, not YAML."
    ],
    example: `pipeline {
    agent any

    options {
        timestamps()
        timeout(time: 30, unit: 'MINUTES')
    }

    environment {
        APP_NAME = 'sample-api'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                sh 'mvn clean package -DskipTests'
            }
        }

        stage('Test') {
            steps {
                sh 'mvn test'
            }
        }

        stage('Package') {
            steps {
                echo "Packaging \${APP_NAME}"
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution finished'
        }
        success {
            echo 'Build completed successfully'
        }
        failure {
            echo 'Investigate failed pipeline stage'
        }
    }
}`,
    practice: [
      "Create a Declarative Pipeline with Checkout, Build and Test stages.",
      "Add an agent declaration and explain where the steps execute.",
      "Add a timeout option so a stuck build cannot run indefinitely.",
      "Add a post block with success and failure behavior.",
      "Create a stage that runs Maven tests and explain how a non-zero exit code affects the pipeline.",
      "Use a Jenkins credential binding for a secret instead of placing a password in the Jenkinsfile.",
      "Add a when condition so a deployment stage executes only for the main branch."
    ],
    mistakes: [
      "Using YAML syntax inside a Jenkinsfile instead of Groovy-based Pipeline syntax.",
      "Hardcoding credentials, tokens or passwords in source-controlled pipeline files.",
      "Running deployment commands on an unintended agent because agent selection is too broad.",
      "Skipping test stages without documenting the risk.",
      "Allowing builds to run indefinitely without timeout controls.",
      "Using shell commands that hide failures or return misleading exit codes.",
      "Duplicating large pipeline blocks across many repositories instead of considering Shared Libraries.",
      "Assuming a Jenkinsfile alone creates secure deployment permissions; Jenkins credentials and authorization must also be configured."
    ],
    incident:
      "A production release pipeline fails during the deployment stage. The build and tests passed, but the Jenkins agent cannot access the deployment credential. Earlier pipeline revisions also exposed a secret in console output.",
    recovery: [
      "Open the failed build and identify the first failing stage and exact console error.",
      "Confirm that the intended Jenkins agent is online and has the required tools.",
      "Verify the credential ID exists and that the pipeline job is authorized to use it.",
      "Remove hardcoded credentials and rotate any secret that may have been exposed.",
      "Use credentials binding and avoid echoing secret values.",
      "Check shell exit codes and ensure failures are not swallowed.",
      "Rerun the pipeline in a controlled environment and verify that logs do not reveal secrets."
    ],
    quiz: [
      {
        question: "Which language is used by Jenkins Declarative Pipeline syntax?",
        options: ["YAML", "Groovy-based Pipeline syntax", "JSON", "Dockerfile syntax"],
        answer: 1,
        explanation: "Jenkinsfile uses Groovy-based Pipeline syntax. Declarative Pipeline provides a structured syntax built on Jenkins Pipeline."
      },
      {
        question: "What is the purpose of the stages block?",
        options: ["Define logical pipeline phases", "Store Docker images", "Create Kubernetes nodes", "Encrypt source code"],
        answer: 0,
        explanation: "The stages block groups the pipeline's logical execution stages."
      },
      {
        question: "How should a Jenkins pipeline access credentials?",
        options: ["Hardcode passwords", "Print tokens to logs", "Use Jenkins credentials and bindings", "Commit secrets to Git"],
        answer: 2,
        explanation: "Jenkins credential management and bindings keep secrets outside the pipeline source code."
      }
    ]
  },

  "GitHub Actions Workflow": {
    title: "GitHub Actions Workflow",
    description:
      "GitHub Actions automates repository workflows using YAML files stored under .github/workflows. A workflow responds to events, runs jobs on configured runners, and executes steps that can build, test, package and deploy applications.",
    purpose:
      "Use GitHub Actions to automate pull-request validation, branch builds, releases, scheduled maintenance and deployment workflows. Workflow files keep automation versioned with the repository.",
    concepts: [
      "name gives the workflow a readable name.",
      "on defines the events that trigger the workflow, such as push, pull_request, workflow_dispatch or schedule.",
      "jobs contains independent or dependent units of work.",
      "runs-on selects the runner environment for a job.",
      "steps contains individual commands or reusable actions.",
      "uses references an action, while run executes shell commands.",
      "needs defines job dependencies and execution order.",
      "if applies conditional execution to jobs or steps.",
      "env defines environment variables at workflow, job or step scope.",
      "secrets provides access to configured secrets through the GitHub secrets context.",
      "permissions controls the workflow's GITHUB_TOKEN permissions.",
      "artifacts allow files to be uploaded and downloaded between workflow jobs or runs.",
      "cache can reuse dependencies to reduce repeated installation time.",
      "matrix strategies run a job across multiple versions or operating systems.",
      "Concurrency controls can prevent unnecessary overlapping workflow runs.",
      "Pinning third-party actions to reviewed commit SHAs can improve supply-chain security."
    ],
    example: `name: CI Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout source
        uses: actions/checkout@v4

      - name: Set up Java
        uses: actions/setup-java@v4
        with:
          distribution: temurin
          java-version: '21'

      - name: Build application
        run: mvn clean package

      - name: Run tests
        run: mvn test

      - name: Upload build artifact
        uses: actions/upload-artifact@v4
        with:
          name: application-package
          path: target/*.jar`,
    practice: [
      "Create a workflow that runs on push to main and on pull requests targeting main.",
      "Add a workflow_dispatch trigger for manual execution.",
      "Create a job using ubuntu-latest and explain what runs-on controls.",
      "Add checkout and Java setup steps before running Maven.",
      "Use needs to make a deployment job wait for a successful test job.",
      "Set least-privilege GITHUB_TOKEN permissions for a read-only build workflow.",
      "Upload a build artifact and explain how a later job can download it.",
      "Explain why secrets must not be printed in workflow logs."
    ],
    mistakes: [
      "Using incorrect indentation or placing jobs and steps at the wrong YAML level.",
      "Writing an event trigger incorrectly under on.",
      "Forgetting checkout and expecting repository files to exist on a fresh runner.",
      "Using secrets in pull-request workflows without considering fork and untrusted-code risks.",
      "Granting broad write permissions when the workflow only needs read access.",
      "Assuming jobs execute sequentially when no needs dependency is defined.",
      "Uploading an artifact from a path that does not exist.",
      "Using unreviewed third-party actions or mutable references without supply-chain controls."
    ],
    incident:
      "A pull request is merged, but the production deployment job does not run. The workflow has a branch filter that does not match the actual event. A separate build job also fails because its artifact path is incorrect.",
    recovery: [
      "Open the Actions run and inspect the event that triggered the workflow.",
      "Check the workflow YAML under .github/workflows and verify the trigger and branch filters.",
      "Inspect job dependencies, conditional expressions and skipped-job details.",
      "Confirm the checkout and build steps completed successfully.",
      "Verify the artifact output path exists before uploading.",
      "Review token permissions and secret availability without exposing secret values.",
      "Test the corrected workflow on a non-production branch before enabling deployment."
    ],
    quiz: [
      {
        question: "Where are GitHub Actions workflow files normally stored?",
        options: [".github/workflows", "jenkins/jobs", ".gitlab/pipelines", "kubernetes/workflows"],
        answer: 0,
        explanation: "GitHub Actions discovers workflow YAML files under the repository's .github/workflows directory."
      },
      {
        question: "What does runs-on specify?",
        options: ["The deployment namespace", "The runner environment", "The Docker registry password", "The Git branch"],
        answer: 1,
        explanation: "runs-on selects the runner environment where a job executes."
      },
      {
        question: "What is the purpose of needs?",
        options: ["Define job dependencies", "Create Git tags", "Install GitHub", "Encrypt artifacts"],
        answer: 0,
        explanation: "needs defines dependencies so a job waits for the required jobs to complete."
      }
    ]
  },

  "GitLab CI Pipeline": {
    title: "GitLab CI/CD Pipeline",
    description:
      "GitLab CI/CD defines automated pipelines using a .gitlab-ci.yml file in the repository root. Jobs run on GitLab Runners and can be organized into stages, controlled with rules, and connected through artifacts, caches and dependencies.",
    purpose:
      "Use GitLab CI/CD to standardize build, test, security and deployment workflows. The pipeline configuration is versioned with the application and can use GitLab's runner, environment, artifact and deployment capabilities.",
    concepts: [
      "stages defines the ordered pipeline phases.",
      "A job defines the commands and configuration executed by a runner.",
      "stage assigns a job to a pipeline phase.",
      "script contains commands executed by the job.",
      "before_script and after_script define commands around the main script.",
      "image selects the container image used by a Docker-based runner.",
      "tags select runners that have matching tags.",
      "rules controls whether a job is included and how it behaves for a pipeline context.",
      "variables defines environment variables for pipeline jobs.",
      "artifacts stores job output for later download or use by downstream jobs.",
      "cache reuses selected files across jobs to speed up repeated work.",
      "needs can express job dependencies and enable eligible jobs to start earlier.",
      "when controls execution behavior, including manual jobs.",
      "environment associates a job with a deployment environment.",
      "Protected and masked CI/CD variables help manage sensitive configuration.",
      "Runner availability and executor configuration affect whether jobs can start."
    ],
    example: `stages:
  - build
  - test
  - package

variables:
  MAVEN_OPTS: "-Dmaven.repo.local=.m2/repository"

build:
  stage: build
  image: maven:3.9-eclipse-temurin-21
  script:
    - mvn clean compile
  cache:
    key: maven-dependencies
    paths:
      - .m2/repository/

test:
  stage: test
  image: maven:3.9-eclipse-temurin-21
  script:
    - mvn test

package:
  stage: package
  image: maven:3.9-eclipse-temurin-21
  script:
    - mvn package -DskipTests
  artifacts:
    paths:
      - target/*.jar
    expire_in: 7 days
  rules:
    - if: '$CI_COMMIT_BRANCH == "main"'`,
    practice: [
      "Create build, test and package stages in a .gitlab-ci.yml file.",
      "Create one job in each stage and assign the correct stage name.",
      "Choose a suitable build image and explain how the runner uses it.",
      "Add artifacts to preserve a packaged JAR for later use.",
      "Add a cache for Maven dependencies and explain the difference between cache and artifacts.",
      "Use rules to run a job only on the main branch.",
      "Configure a manual deployment job and explain when manual approval is useful.",
      "Explain how runner tags affect job scheduling."
    ],
    mistakes: [
      "Defining a job with a stage name that is missing from the stages list.",
      "Using incorrect YAML indentation under script, artifacts or rules.",
      "Assuming cache and artifacts serve the same purpose.",
      "Expecting a job to run when no eligible runner is available.",
      "Using rules conditions that do not match the pipeline source or branch.",
      "Placing sensitive values directly in the repository's YAML file.",
      "Assuming all jobs run in parallel even when stage ordering or needs creates dependencies.",
      "Using artifacts paths that do not match the actual build output."
    ],
    incident:
      "A GitLab pipeline remains pending because no runner matches the job tags. After the runner issue is fixed, the package job completes but the next job cannot find the expected JAR because the artifact path was configured incorrectly.",
    recovery: [
      "Open the pipeline and identify whether the job is pending, failed, skipped or canceled.",
      "Inspect the job log and confirm which runner tags are required.",
      "Check runner registration, availability, executor configuration and project assignment.",
      "Review the stages list and confirm every job uses a valid stage.",
      "Inspect the build output and correct artifact paths.",
      "Verify that artifact retention and downstream job access are configured correctly.",
      "Review CI/CD variables and ensure sensitive values are stored securely.",
      "Rerun the pipeline and verify the artifact is available to the intended downstream job."
    ],
    quiz: [
      {
        question: "Which file normally defines a GitLab CI/CD pipeline?",
        options: ["Jenkinsfile", ".gitlab-ci.yml", "Dockerfile", "package-lock.json"],
        answer: 1,
        explanation: "GitLab CI/CD uses .gitlab-ci.yml in the repository root by default."
      },
      {
        question: "What is the primary difference between cache and artifacts?",
        options: ["They are identical", "Cache accelerates reuse; artifacts preserve job outputs", "Artifacts define runners", "Cache defines pipeline stages"],
        answer: 1,
        explanation: "Cache is intended to speed up repeated work, while artifacts preserve outputs from jobs."
      },
      {
        question: "What can cause a GitLab job to remain pending?",
        options: ["No eligible runner", "A successful test", "A valid artifact", "A completed deployment"],
        answer: 0,
        explanation: "A job remains pending when GitLab cannot find an eligible available runner to execute it."
      }
    ]
  }
};


export default function YamlCICDConfigurationsWorkspace({
  topic,
  tab
}: {
  topic: string;
  tab: string;
}) {
  const lesson = lessons[topic] ?? lessons["Jenkinsfile"];
  const activeTab = tab || "Learn";
  const [source, setSource] = useState(lesson.example);
  const [validation, setValidation] = useState("");
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const correct = lesson.quiz.filter((question, index) => answers[index] === question.answer).length;

  function restoreExample() {
    setSource(lesson.example);
    setValidation("");
  }

  function validateSource() {
    if (topic === "Jenkinsfile") {
      const required = ["pipeline", "stages", "stage", "steps"];
      const missing = required.filter(item => !new RegExp("\\b" + item + "\\b").test(source));

      const opens = (source.match(/\{/g) || []).length;
      const closes = (source.match(/\}/g) || []).length;

      const issues = [];
      if (missing.length) issues.push("Missing expected pipeline keywords: " + missing.join(", "));
      if (opens !== closes) issues.push("Opening and closing brace counts do not match.");
      if (!source.trim().startsWith("pipeline")) issues.push("Declarative Pipeline should normally start with pipeline {.");

      setValidation(
        issues.length
          ? "Basic Jenkinsfile checks found:\n" + issues.join("\n") + "\nThis is not a Groovy compiler or Jenkins execution test."
          : "PASS: Basic Jenkinsfile structure checks passed. This is not a Groovy compiler, Jenkins linter or live pipeline execution."
      );
      return;
    }

    try {
      const document = parseDocument(source, { uniqueKeys: true });
      if (document.errors.length) {
        setValidation(document.errors.map(error => error.message).join("\n"));
        return;
      }

      const parsed = document.toJS();
      const problems: string[] = [];

      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        problems.push("Expected a YAML mapping at the document root.");
      } else if (topic === "GitHub Actions Workflow") {
        if (!parsed.jobs || typeof parsed.jobs !== "object") problems.push("GitHub Actions requires a jobs mapping.");
        if (!("on" in parsed) && !("true" in parsed)) problems.push("Workflow trigger 'on' is missing. Check YAML parsing and key interpretation.");
        if (parsed.jobs && typeof parsed.jobs === "object") {
          Object.entries(parsed.jobs).forEach(([name, job]: [string, any]) => {
            if (!job || typeof job !== "object") {
              problems.push(`Job ${name} must be a mapping.`);
            } else if (!job["runs-on"]) {
              problems.push(`Job ${name} is missing runs-on.`);
            } else if (!Array.isArray(job.steps)) {
              problems.push(`Job ${name} is missing a steps array.`);
            }
          });
        }
      } else {
        if (!Array.isArray(parsed.stages) || parsed.stages.length === 0) {
          problems.push("GitLab CI requires a non-empty stages array for this learning example.");
        }

        const reserved = new Set(["stages", "variables", "default", "workflow", "include", "image", "services", "cache"]);
        Object.entries(parsed).forEach(([name, value]: [string, any]) => {
          if (reserved.has(name) || name.startsWith(".")) return;
          if (value && typeof value === "object" && !Array.isArray(value)) {
            if (!value.stage) problems.push(`Job ${name} does not declare a stage.`);
            if (!Array.isArray(value.script) && !value.trigger) problems.push(`Job ${name} should define script or trigger.`);
          }
        });
      }

      setValidation(
        problems.length
          ? "YAML syntax is valid, but structural checks found:\n" + problems.join("\n")
          : "PASS: YAML syntax and basic " + topic + " structure checks passed. This local validator does not replace the official platform linter or an actual pipeline run."
      );
    } catch (error) {
      setValidation(error instanceof Error ? error.message : "Unknown validation error.");
    }
  }

  return (
    <section className="w-full space-y-6">
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-5 space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
          CI/CD Configurations Learning Workspace
        </span>
        <h2 className="text-2xl font-bold">{lesson.title}</h2>
        <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{lesson.description}</p>
        <div className="rounded-xl bg-slate-50 dark:bg-slate-900 p-4">
          <h3 className="font-semibold mb-2">Purpose in real DevOps workflows</h3>
          <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{lesson.purpose}</p>
        </div>
      </div>


      {activeTab === "Learn" && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Core Concepts and Architecture</h3>
          {lesson.concepts.map((item, index) => (
            <div key={index} className="flex gap-3 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
              <span className="font-bold text-blue-600">{String(index + 1).padStart(2, "0")}</span>
              <p className="text-sm leading-7">{item}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "Examples" && (
        <div className="space-y-3">
          <h3 className="text-xl font-semibold">Complete Pipeline Example</h3>
          <p className="text-sm text-slate-500">
            {topic === "Jenkinsfile"
              ? "This is Groovy-based Jenkins Declarative Pipeline syntax."
              : "This is YAML configuration. Review indentation and nesting carefully."}
          </p>
          <pre className="overflow-x-auto rounded-xl bg-slate-950 text-green-300 p-5 text-sm leading-7">
            <code>{lesson.example}</code>
          </pre>
          <button onClick={restoreExample} className="rounded-lg bg-blue-600 text-white px-4 py-2 text-sm">
            Load example into editor
          </button>
        </div>
      )}

      {activeTab === "Practice" && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Hands-on Pipeline Exercises</h3>
          {lesson.practice.map((item, index) => (
            <div key={index} className="rounded-xl border border-slate-200 dark:border-slate-700 p-4">
              <p className="font-semibold text-sm">Exercise {index + 1}</p>
              <p className="mt-2 text-sm leading-7">{item}</p>
            </div>
          ))}
          <p className="text-sm text-slate-500">
            Implement the exercises in the editor and use the Validate tab for the supported local checks.
          </p>
        </div>
      )}

      {activeTab === "Debug" && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Common Pipeline Failures</h3>
          {lesson.mistakes.map((item, index) => (
            <div key={index} className="rounded-xl border border-amber-200 dark:border-amber-900 p-4">
              <p className="text-sm leading-7"><strong>Issue {index + 1}:</strong> {item}</p>
            </div>
          ))}
          <div className="rounded-xl bg-slate-100 dark:bg-slate-900 p-4 space-y-2">
            <h4 className="font-semibold">General Git diagnostics</h4>
            <pre className="overflow-x-auto text-xs leading-7">
              <code>{`git status
git log --oneline -5
git diff
git branch --show-current
git remote -v`}</code>
            </pre>
            <p className="text-xs text-slate-500">
              Use the relevant CI platform's run logs and runner diagnostics to investigate execution failures.
            </p>
          </div>
        </div>
      )}

      {activeTab === "Validate" && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Pipeline Configuration Editor</h3>
          <p className="text-sm text-slate-500">
            {topic === "Jenkinsfile"
              ? "Basic Jenkinsfile keyword and brace checks only. Use the Jenkins Declarative Pipeline linter for authoritative syntax validation."
              : "YAML syntax and topic-specific structural checks. This does not execute a workflow or replace the official platform validator."}
          </p>
          <textarea
            value={source}
            onChange={event => {
              setSource(event.target.value);
              setValidation("");
            }}
            spellCheck={false}
            className="w-full min-h-[440px] rounded-xl bg-slate-950 text-green-300 p-5 font-mono text-sm leading-6"
          />
          <div className="flex flex-wrap gap-2">
            <button onClick={validateSource} className="rounded-lg bg-green-700 text-white px-5 py-2 text-sm font-semibold">
              Validate Configuration
            </button>
            <button onClick={restoreExample} className="rounded-lg border border-slate-300 px-5 py-2 text-sm">
              Restore Example
            </button>
          </div>
          {validation && (
            <pre className="whitespace-pre-wrap rounded-xl border border-slate-300 dark:border-slate-700 p-4 text-sm leading-6">
              {validation}
            </pre>
          )}
        </div>
      )}

      {activeTab === "Scenarios" && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Production Pipeline Incident</h3>
          <div className="rounded-xl border border-red-200 dark:border-red-900 p-5 space-y-3">
            <span className="text-xs font-semibold uppercase text-red-600">Incident scenario</span>
            <p className="text-sm leading-7">{lesson.incident}</p>
          </div>
          <h4 className="font-semibold">Investigation and recovery</h4>
          {lesson.recovery.map((item, index) => (
            <div key={index} className="flex gap-3 border-b border-slate-200 dark:border-slate-700 pb-3">
              <span className="rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 w-7 h-7 flex items-center justify-center text-xs font-bold shrink-0">
                {index + 1}
              </span>
              <p className="text-sm leading-7">{item}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "Quiz" && (
        <div className="space-y-5">
          <div>
            <h3 className="text-xl font-semibold">CI/CD Knowledge Assessment</h3>
            <p className="text-sm text-slate-500 mt-1">Choose an answer and review the explanation.</p>
          </div>
          {lesson.quiz.map((item, index) => (
            <div key={index} className="rounded-xl border border-slate-200 dark:border-slate-700 p-5 space-y-3">
              <p className="font-semibold text-sm">{index + 1}. {item.question}</p>
              {item.options.map((option, optionIndex) => (
                <label key={optionIndex} className="flex items-center gap-3 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name={`cicd-quiz-${topic}-${index}`}
                    checked={answers[index] === optionIndex}
                    onChange={() => setAnswers(current => ({ ...current, [index]: optionIndex }))}
                  />
                  {option}
                </label>
              ))}
              {answers[index] !== undefined && (
                <div className={`rounded-lg p-3 text-sm ${
                  answers[index] === item.answer
                    ? "bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-300"
                    : "bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                }`}>
                  <strong>{answers[index] === item.answer ? "Correct" : "Review this answer"}</strong>
                  <p className="mt-1">{item.explanation}</p>
                </div>
              )}
            </div>
          ))}
          <div className="rounded-xl bg-slate-100 dark:bg-slate-900 p-4">
            <p className="font-semibold">Answered: {Object.keys(answers).length}/{lesson.quiz.length}</p>
            <p className="text-sm mt-1">Correct answers: {correct}/{lesson.quiz.length}</p>
            <button onClick={() => setAnswers({})} className="mt-3 rounded-lg border border-slate-300 px-4 py-2 text-sm">
              Reset assessment
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
