💻 Go Mastery — Complete Hands-on Learning Roadmap
<p align="center">
<img src="https://go.dev/blog/go-brand/Go-Logo/PNG/Go-Logo_Blue.png" alt="Go Programming Language Logo" width="200" />
</p>

<p align="center">
<strong>From Go Fundamentals to Production-Ready Backend, Cloud-Native, SRE and Platform Engineering</strong>
</p>

<p align="center">
<img src="https://img.shields.io/badge/Language-Go-00ADD8?logo=go&logoColor=white" alt="Go" />
<img src="https://img.shields.io/badge/Roadmap-25%20Parts-7C3AED" alt="Roadmap" />
<img src="https://img.shields.io/badge/Levels-5-16A34A" alt="Levels" />
<img src="https://img.shields.io/badge/Hands--On-Practical%20Labs-F97316" alt="Hands-on Labs" />
<img src="https://img.shields.io/badge/Backend-Engineering-2563EB" alt="Backend Engineering" />
<img src="https://img.shields.io/badge/Docker-Containerization-2496ED?logo=docker&logoColor=white" alt="Docker" />
<img src="https://img.shields.io/badge/Kubernetes-Cloud--Native-326CE5?logo=kubernetes&logoColor=white" alt="Kubernetes" />
<img src="https://img.shields.io/badge/CI%2FCD-Automation-2088FF?logo=githubactions&logoColor=white" alt="CI/CD" />
</p>

🚀 1. Welcome to Go Mastery
Go Mastery — Complete Hands-on Learning Roadmap is a structured engineering program designed to help developers progress from Go programming fundamentals to production-oriented backend services, distributed systems, cloud-native infrastructure, site reliability engineering, and platform automation.

Go, commonly known as Golang, is a statically typed, compiled programming language with a concise syntax, garbage collection, built-in concurrency primitives, and a powerful standard library.

Go is widely used for:

🌐 HTTP APIs, backend services, and microservices.
⚡ Concurrent workers, networking applications, and distributed systems.
🐳 Container tooling and cloud infrastructure.
☁️ Cloud-native services and Kubernetes integrations.
🔄 CI/CD automation, command-line utilities, and developer tools.
📊 Monitoring agents, operational automation, and reliability tooling.
This roadmap goes beyond syntax. You will practise designing applications, implementing features, testing behavior, diagnosing failures, improving performance, securing dependencies, deploying containers, and operating services.

🎯 Mission: Learn Go by building real applications, validating them with tests, automating delivery, and applying production engineering principles.
🌟 What makes this roadmap different?
Learning area	What you will practise
📘 Language fundamentals	Types, functions, structs, interfaces, methods, and error handling
🛠️ Application engineering	Modules, packages, configuration, APIs, and database access
⚡ Concurrency	Goroutines, channels, cancellation, synchronization, and worker pools
🧪 Testing	Unit tests, integration tests, race detection, fuzzing, and benchmarks
🔐 Security	Input validation, authentication, authorization, secrets, and dependency checks
🐳 Containers	Dockerfiles, multi-stage builds, image optimization, and container hardening
☸️ Cloud-native	Kubernetes workloads, health probes, resources, and deployment strategies
📊 Observability	Structured logs, metrics, traces, dashboards, and SLOs
🚀 Platform engineering	CLI tooling, reusable templates, automation, and developer workflows
🏆 Capstones	Four end-to-end engineering projects
📌 2. Roadmap Overview
Attribute	Details
Learning path	Go Mastery
Total levels	5
Total parts	25
Capstone projects	4
Primary language	Go
HTTP/API	net/http, REST, optional gRPC
Data access	database/sql, PostgreSQL
Caching	Redis where appropriate
Testing	go test, race detector, benchmarks, fuzz tests
Containerization	Docker
Orchestration	Kubernetes
CI/CD	GitHub Actions or an equivalent pipeline
Observability	OpenTelemetry, Prometheus, Grafana
Infrastructure	Terraform where required
Final outcome	A tested, documented, production-oriented Go portfolio
📑 3. Table of Contents
Learning Objectives
Architecture
Technology Stack
Repository Structure
Prerequisites and Setup
Level 1 — Go Foundations
Level 2 — Application Engineering
Level 3 — Advanced Engineering
Level 4 — Enterprise Production Engineering
Level 5 — Senior and Platform Engineering
Capstone 1 — Production-Ready Go API
Capstone 2 — Secure Go CI/CD Platform
Capstone 3 — Go Observability and SRE Platform
Capstone 4 — Go Developer Platform and Automation
Troubleshooting
Completion Checklist
Production-Readiness Checklist
Official Resources
🎯 4. Learning Objectives
By completing the roadmap, you should be able to:

Write readable, idiomatic Go using appropriate types, functions, methods, interfaces, and packages.
Organize code using Go modules and maintain clear package boundaries.
Design HTTP APIs with validation, consistent error responses, middleware, and appropriate status codes.
Use goroutines and channels while avoiding data races, goroutine leaks, and deadlocks.
Access relational databases safely using parameterized queries and transactions.
Build repeatable unit and integration tests.
Investigate performance problems using benchmarks, CPU profiles, and memory profiles.
Create secure Docker images with minimal runtime dependencies.
Deploy applications with Kubernetes health probes, resource requests, and resource limits.
Automate tests, static analysis, security checks, image builds, and releases.
Instrument services with logs, metrics, and distributed traces.
Apply reliability engineering practices such as timeouts, bounded retries, SLOs, and incident reviews.
Build CLI utilities and reusable developer automation.
Document architecture, deployment, troubleshooting, and recovery procedures.
🏗️ 5. Learning Architecture
The learning path progresses from programming fundamentals to production engineering. Each level builds on the previous level.

mermaid
flowchart TD
    A["Level 1: Go Foundations"] --> B["Level 2: Application Engineering"]
    B --> C["Level 3: Advanced Engineering"]
    C --> D["Level 4: Enterprise Production Engineering"]
    D --> E["Level 5: Senior and Platform Engineering"]

    E --> F["Capstone 1: Production-Ready Go API"]
    E --> G["Capstone 2: Secure Go CI/CD Platform"]
    E --> H["Capstone 3: Go Observability and SRE Platform"]
    E --> I["Capstone 4: Go Developer Platform"]

    F --> J["Tested and Documented Portfolio"]
    G --> J
    H --> J
    I --> J
🔄 Application delivery workflow
mermaid
flowchart LR
    A["Requirements"] --> B["Architecture and Design"]
    B --> C["Implement Go Code"]
    C --> D["Unit and Integration Tests"]
    D --> E["Static Analysis and Security"]
    E --> F["Build Application"]
    F --> G["Build Container Image"]
    G --> H["Deploy to Test Environment"]
    H --> I["Observe and Validate"]
    I --> J["Release and Operate"]
    J --> K["Feedback and Improvement"]
    K --> B
The workflow is iterative. A production issue may require an architectural change, a new regression test, an improved dashboard, or an updated deployment strategy.

🧰 6. Technology Stack
Use the standard library wherever it is sufficient. Add dependencies only when they solve a clear engineering problem.

Technology	Purpose	Typical learning stage
Go	Application language	All levels
Go Modules	Dependency and module management	Level 1 onward
gofmt	Consistent source formatting	Level 1 onward
go vet	Detect suspicious code patterns	Level 2 onward
go test	Unit, integration, and benchmark tests	Level 2 onward
net/http	HTTP servers and clients	Level 2 onward
PostgreSQL	Relational persistence	Level 3 onward
Redis	Caching and selected coordination use cases	Level 3 onward
Docker	Build and run application containers	Level 4
Kubernetes	Workload orchestration	Level 4
GitHub Actions	Automated validation and delivery	Level 4 onward
OpenTelemetry	Instrumentation and telemetry APIs	Level 4 onward
Prometheus	Metrics collection	Level 4 onward
Grafana	Dashboards and visualization	Level 4 onward
Terraform	Infrastructure as code	Level 5
govulncheck	Check Go code against known vulnerabilities	Level 4 onward
Important: These are recommended technologies, not mandatory dependencies for every project. For example, a small service may not need Redis, gRPC, or Kubernetes.

📁 7. Recommended Repository Structure
text
go-mastery/
├── README.md
├── go.mod
├── go.sum
├── cmd/
│   └── api/
│       └── main.go
├── internal/
│   ├── config/
│   ├── handler/
│   ├── service/
│   ├── repository/
│   └── domain/
├── migrations/
├── api/
├── tests/
├── deployments/
│   └── kubernetes/
├── Dockerfile
├── compose.yaml
├── Makefile
└── .github/
    └── workflows/
        └── go-ci.yml
📂 Directory responsibilities
Directory/file	Responsibility
cmd/api/	Application entry point
internal/	Application-specific implementation
internal/handler/	HTTP request and response handling
internal/service/	Business rules and application use cases
internal/repository/	Persistence interfaces and implementations
internal/domain/	Core domain types and invariants
migrations/	Versioned database schema changes
api/	API specifications, such as OpenAPI documents
tests/	Integration tests and test support
deployments/	Deployment manifests
Dockerfile	Container build instructions
compose.yaml	Local multi-container development environment
.github/workflows/	CI automation
Do not create every directory at the beginning. Start with the smallest structure that fits the application and introduce packages when they provide meaningful boundaries.

🖥️ 8. Prerequisites and Setup
8.1 Required tools
Install the following tools on your development machine:

Go toolchain.
Git.
A code editor with Go support.
Terminal or shell.
Docker for container labs.
kubectl and a Kubernetes environment for orchestration labs.
Access to PostgreSQL for database labs.
Kubernetes, Docker, and cloud accounts are not required for the first few parts.

8.2 Verify installation
bash
go version
git --version
docker --version
kubectl version --client
The last two commands require Docker and kubectl to be installed. If you have not installed them yet, complete the Go fundamentals first.

8.3 Create a starter project
bash
mkdir go-mastery
cd go-mastery

go mod init example.com/go-mastery
mkdir -p cmd/api
Create cmd/api/main.go:

go
package main

import "fmt"

func main() {
    fmt.Println("Welcome to Go Mastery!")
}
Run the program:

bash
go run ./cmd/api
Expected output:

text
Welcome to Go Mastery!
Validate the source:

bash
gofmt -w cmd/api/main.go
go vet ./...
go test ./...
go build ./cmd/api
Expected outcome:

The application runs.
Formatting is applied.
Static checks finish without reported issues.
Tests pass; at this stage, there may be no test files.
A compiled executable is produced in the current directory.
🌱 Level 1 — Go Foundations (Parts 1–5)
Goal: Understand the Go toolchain, core language features, functions, errors, structs, methods, and interfaces.

Part 1 — Go Installation and Development Environment
Concepts
Learn how the Go toolchain compiles and executes programs, how modules identify projects, and how source files are formatted and tested.

Understand the difference between:

go run: compiles and runs a program.
go build: builds an executable or package artifact.
go test: executes tests.
go fmt / gofmt: formats Go source.
go vet: identifies suspicious code patterns.
go mod tidy: reconciles module dependencies.
Hands-on lab
Create a small executable:

bash
mkdir -p cmd/hello
Create cmd/hello/main.go:

go
package main

import "fmt"

func main() {
    fmt.Println("Hello from Go!")
}
Run:

bash
go run ./cmd/hello
go build ./cmd/hello
Expected output from the program:

text
Hello from Go!
Exercise
Modify the message.
Format the source.
Build the executable.
Run go vet ./....
Add a README section documenting the commands.
Expected outcome: You can create, run, format, inspect, and compile a basic Go program.

Part 2 — Variables, Types, Constants, and Control Flow
Concepts
Go uses static typing. Variables have types determined by declarations or type inference. The language includes integers, floating-point values, booleans, strings, arrays, slices, maps, structs, and pointers.

Understand the difference between an array and a slice:

An array has a fixed length as part of its type.
A slice describes a segment of an underlying array and can grow when appended.
Hands-on lab
Create a file with the following example:

go
package main

import "fmt"

func main() {
    const appName = "Go Mastery"
    port := 8080
    enabled := true

    scores := []int{80, 90, 95}
    scores = append(scores, 100)

    services := map[string]int{
        "api":    8080,
        "worker": 8081,
    }

    fmt.Println(appName, port, enabled)
    fmt.Println("Scores:", scores)
    fmt.Println("API port:", services["api"])

    for _, score := range scores {
        if score >= 90 {
            fmt.Println("High score:", score)
        }
    }
}
Run:

bash
go run .
Expected key results:

text
Go Mastery 8080 true
Scores: [80 90 95 100]
API port: 8080
High score: 90
High score: 95
High score: 100
Exercise
Write a program that:

Stores service names and ports in a map.
Iterates over the configured services.
Checks whether each port is within the valid TCP port range.
Reports invalid configuration.
Expected outcome: You can work with core data types, collections, conditions, and loops.

Part 3 — Functions, Packages, and Error Handling
Concepts
Functions encapsulate reusable behavior. Go supports multiple return values, making it common to return a result alongside an error.

Idiomatic Go usually handles errors explicitly rather than relying on exceptions for ordinary control flow.

Hands-on lab
go
package main

import (
    "errors"
    "fmt"
)

func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("division by zero")
    }

    return a / b, nil
}

func main() {
    result, err := divide(10, 2)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }

    fmt.Println("Result:", result)

    _, err = divide(10, 0)
    if err != nil {
        fmt.Println("Expected error:", err)
    }
}
Expected output:

text
Result: 5
Expected error: division by zero
Engineering practice
Return errors with useful context.
Wrap errors with %w when callers need to inspect the underlying error.
Use errors.Is and errors.As when appropriate.
Keep package responsibilities clear.
Avoid ignoring errors from file, network, or database operations.
Exercise
Create a configuration parser that rejects an empty application name and invalid port numbers.

Expected outcome: You can design reusable functions and communicate failures through explicit errors.

Part 4 — Structs, Methods, Interfaces, and Composition
Concepts
Structs group related data. Methods associate behavior with types. Interfaces describe behavior and enable implementations to be substituted without requiring inheritance.

Prefer small interfaces that describe what a consumer actually needs.

Hands-on lab
go
package main

import "fmt"

type Notifier interface {
    Send(message string) error
}

type ConsoleNotifier struct{}

func (ConsoleNotifier) Send(message string) error {
    fmt.Println("Notification:", message)
    return nil
}

func notify(n Notifier, message string) error {
    return n.Send(message)
}

func main() {
    notifier := ConsoleNotifier{}

    if err := notify(notifier, "Service started"); err != nil {
        fmt.Println("Notification failed:", err)
    }
}
Expected output:

text
Notification: Service started
Exercise
Implement two notifier types:

A console notifier.
A test notifier that records messages in memory.
Pass both through the same Notifier interface.

Expected outcome: You understand composition, methods, interfaces, and dependency substitution.

Part 5 — Go Project Design, Pointers, and Memory Semantics
Concepts
Pointers refer to values stored elsewhere in memory. They can be useful when a function must modify a value or when copying a large structure would be undesirable.

Go also supports garbage collection, but developers must still consider allocation, object lifetime, data races, and unnecessary memory retention.

Understand:

Value versus pointer receivers.
Nil pointers and zero values.
Slice and map reference behavior.
Escaping values and allocations.
Package boundaries and exported identifiers.
Error propagation and resource cleanup.
Hands-on lab
go
package main

import "fmt"

type Config struct {
    Port int
}

func updatePort(config *Config, port int) {
    config.Port = port
}

func main() {
    config := Config{Port: 8080}

    updatePort(&config, 9090)

    fmt.Println("Port:", config.Port)
}
Expected output:

text
Port: 9090
Exercise
Build a small service configuration package with:

Application name.
HTTP port.
Environment name.
Validation method.
Tests for invalid values.
Expected outcome: You can organize Go code into reusable types and packages while understanding basic memory and value semantics.

🛠️ Level 2 — Application Engineering (Parts 6–10)
Goal: Build maintainable applications with modules, configuration, testing, file handling, JSON, and HTTP APIs.**

Part 6 — Modules, Dependencies, and Project Organization
Concepts
Go Modules define a module path and record dependencies. The go.mod file describes the module and its dependency requirements; go.sum records checksums for module content.

Use explicit package responsibilities. Keep internal implementation details in internal/ when they should not be imported by external modules.

Hands-on lab
bash
go mod init example.com/go-mastery
go mod tidy
go list ./...
Inspect the module:

bash
cat go.mod
Exercise
Split an application into configuration, business logic, and HTTP handler packages. Keep the entry point in cmd/api/.

Expected outcome: The project builds consistently and has understandable package boundaries.

Part 7 — Testing and Code Quality
Concepts
Tests verify expected behavior and protect against regressions. Go's built-in testing package supports unit tests, benchmarks, examples, and fuzz tests.

Use table-driven tests to cover multiple inputs without duplicating test logic.

Hands-on lab
Create internal/mathutil/math.go:

go
package mathutil

func Add(a, b int) int {
    return a + b
}
Create internal/mathutil/math_test.go:

go
package mathutil

import "testing"

func TestAdd(t *testing.T) {
    tests := []struct {
        name string
        a, b int
        want int
    }{
        {"positive", 2, 3, 5},
        {"negative", -2, -3, -5},
        {"zero", 0, 5, 5},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            if got := Add(tt.a, tt.b); got != tt.want {
                t.Fatalf("Add(%d, %d) = %d, want %d",
                    tt.a, tt.b, got, tt.want)
            }
        })
    }
}
Run:

bash
go test ./...
go test -race ./...
go vet ./...
Expected result: the tests pass and no data race is reported by the tested code.

Exercise
Add tests for invalid input, boundary values, and errors. Run the race detector on code that uses concurrency.

Expected outcome: You can validate behavior automatically and catch regressions before release.

Part 8 — Files, JSON, and Configuration
Concepts
Applications often read configuration, process JSON, and write files. Validate untrusted input and handle file errors explicitly.

Avoid committing secrets to source control. Load sensitive values through a suitable secret-management mechanism or protected environment configuration.

Hands-on lab
go
package main

import (
    "encoding/json"
    "fmt"
    "os"
)

type ServiceConfig struct {
    Name string `json:"name"`
    Port int    `json:"port"`
}

func main() {
    data := []byte(`{"name":"api","port":8080}`)

    var config ServiceConfig
    if err := json.Unmarshal(data, &config); err != nil {
        fmt.Println("Invalid JSON:", err)
        return
    }

    if config.Name == "" || config.Port < 1 || config.Port > 65535 {
        fmt.Println("Invalid configuration")
        return
    }

    fmt.Printf("Service %s configured on port %d\n",
        config.Name, config.Port)

    if err := os.WriteFile("config-output.json", data, 0600); err != nil {
        fmt.Println("Write failed:", err)
    }
}
Expected output:

text
Service api configured on port 8080
Exercise
Extend the program to read configuration from a file, validate the fields, and report useful errors when the file is missing or malformed.

Expected outcome: You can process structured input safely and validate configuration before starting an application.

Part 9 — HTTP Servers and REST APIs
Concepts
An HTTP server receives requests and sends responses. A REST-style API exposes resources through predictable URLs and HTTP methods.

Important concepts include:

HTTP methods and status codes.
Request parsing and validation.
JSON serialization.
Request timeouts.
Middleware.
Graceful shutdown.
Health endpoints.
Consistent error responses.
Hands-on lab
Create cmd/api/main.go:

go
package main

import (
    "encoding/json"
    "log"
    "net/http"
    "time"
)

func main() {
    mux := http.NewServeMux()

    mux.HandleFunc("GET /healthz", func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Content-Type", "application/json")
        _ = json.NewEncoder(w).Encode(map[string]string{
            "status": "ok",
        })
    })

    server := &http.Server{
        Addr:              ":8080",
        Handler:           mux,
        ReadHeaderTimeout: 5 * time.Second,
        ReadTimeout:       10 * time.Second,
        WriteTimeout:      15 * time.Second,
        IdleTimeout:       60 * time.Second,
    }

    log.Println("Listening on :8080")

    if err := server.ListenAndServe(); err != nil &&
        err != http.ErrServerClosed {
        log.Fatal(err)
    }
}
Run:

bash
go run ./cmd/api
In another terminal:

bash
curl -i http://localhost:8080/healthz
Expected response: HTTP 200 and JSON containing "status":"ok".

Note: This starter uses the standard library's method-aware routing patterns available in modern Go versions. Ensure the installed toolchain supports them.
Exercise
Add a GET /api/v1/version endpoint. Return JSON and use the appropriate content type.

Expected outcome: You can implement and test a basic HTTP service with explicit server timeouts.

Part 10 — Middleware, Validation, and API Design
Concepts
Middleware wraps HTTP handlers to provide cross-cutting behavior such as request logging, correlation IDs, authentication, and recovery from unexpected panics.

Validation should happen at the API boundary. Business logic should not rely on client input being valid.

Hands-on lab
Create a request logging middleware:

go
package main

import (
    "log"
    "net/http"
    "time"
)

func loggingMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        started := time.Now()

        next.ServeHTTP(w, r)

        log.Printf("method=%s path=%s duration=%s",
            r.Method, r.URL.Path, time.Since(started))
    })
}
Wrap your router:

go
handler := loggingMiddleware(mux)
Pass handler to the server configuration.

Exercise
Implement:

JSON request validation.
A consistent error response format.
A request ID.
Correct 400, 401, 404, and 500 status handling.
Tests for invalid requests.
Expected outcome: Your API has a clear request pipeline and predictable error behavior.

⚡ Level 3 — Advanced Engineering (Parts 11–15)
Goal: Build safe concurrent services, integrate databases, secure APIs, and understand performance.**

Part 11 — Goroutines, Channels, and Worker Pools
Concepts
Goroutines provide lightweight concurrent execution. Channels allow goroutines to communicate, while mutexes protect shared mutable state.

Concurrency does not automatically make a program faster. It introduces coordination, cancellation, error handling, and resource-management concerns.

Hands-on lab
go
package main

import (
    "fmt"
    "sync"
)

func main() {
    jobs := make(chan int)
    var wg sync.WaitGroup

    for worker := 1; worker <= 3; worker++ {
        wg.Add(1)

        go func(id int) {
            defer wg.Done()

            for job := range jobs {
                fmt.Printf("Worker %d processed job %d\n", id, job)
            }
        }(worker)
    }

    for job := 1; job <= 6; job++ {
        jobs <- job
    }

    close(jobs)
    wg.Wait()
}
The order of worker messages may vary. Every job should be processed once.

Exercise
Implement a bounded worker pool with:

A fixed worker count.
A jobs channel.
Graceful shutdown.
Error reporting.
Tests for completion.
Expected outcome: You can coordinate concurrent work without leaking worker goroutines.

Part 12 — Context, Cancellation, and Timeouts
Concepts
The context package propagates deadlines, cancellation signals, and request-scoped values. Contexts are especially important for HTTP requests, database calls, and distributed service operations.

Every potentially blocking operation should have a clear cancellation or timeout strategy.

Hands-on lab
go
package main

import (
    "context"
    "fmt"
    "time"
)

func main() {
    ctx, cancel := context.WithTimeout(
        context.Background(),
        2*time.Second,
    )
    defer cancel()

    select {
    case <-time.After(5 * time.Second):
        fmt.Println("Work completed")
    case <-ctx.Done():
        fmt.Println("Stopped:", ctx.Err())
    }
}
Expected output:

text
Stopped: context deadline exceeded
Exercise
Add a timeout to an outbound HTTP request. Test the behavior against a deliberately slow local endpoint.

Expected outcome: Requests can be cancelled and slow operations do not continue indefinitely.

Part 13 — PostgreSQL, SQL, and Transactions
Concepts
Relational databases provide durable storage and transactional guarantees. Go's database/sql package manages database connections through a pool.

Important practices:

Use parameterized queries.
Configure connection-pool limits.
Close rows and check iteration errors.
Propagate contexts and deadlines.
Use transactions for related writes.
Manage schema changes with versioned migrations.
Never log passwords or sensitive database values.
Hands-on lab
The following example demonstrates the standard-library API. It requires a PostgreSQL driver dependency and a running database.

go
package main

import (
    "context"
    "database/sql"
    "fmt"
    "log"
    "os"
    "time"

    _ "github.com/jackc/pgx/v5/stdlib"
)

func main() {
    dsn := os.Getenv("DATABASE_URL")
    if dsn == "" {
        log.Fatal("DATABASE_URL is required")
    }

    db, err := sql.Open("pgx", dsn)
    if err != nil {
        log.Fatal(err)
    }
    defer db.Close()

    db.SetMaxOpenConns(10)
    db.SetMaxIdleConns(5)
    db.SetConnMaxLifetime(30 * time.Minute)

    ctx, cancel := context.WithTimeout(
        context.Background(),
        5*time.Second,
    )
    defer cancel()

    if err := db.PingContext(ctx); err != nil {
        log.Fatal(err)
    }

    var currentTime time.Time
    if err := db.QueryRowContext(
        ctx, "SELECT NOW()",
    ).Scan(&currentTime); err != nil {
        log.Fatal(err)
    }

    fmt.Println("Database time:", currentTime)
}
Add the driver dependency:

bash
go get github.com/jackc/pgx/v5/stdlib
go mod tidy
Configure DATABASE_URL with your actual development database connection string. Do not put real credentials in source control.

Exercise
Create a table, insert a record using a parameterized query, retrieve it, and test transaction rollback.

Expected outcome: You can connect to PostgreSQL and implement safe data-access code.

Part 14 — Authentication, Authorization, and API Security
Concepts
Authentication establishes identity; authorization decides what an identity may do.

Security controls should include:

Request validation.
Authentication middleware.
Resource-level authorization.
TLS in deployed environments.
Secure password handling if passwords are used.
Token validation and expiry checks.
Rate limiting where appropriate.
Safe error messages.
Secret rotation and least-privilege credentials.
Hands-on lab
Create middleware that rejects requests without an expected development-only API key:

go
func requireAPIKey(expected string, next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        if expected == "" || r.Header.Get("X-API-Key") != expected {
            http.Error(w, "unauthorized", http.StatusUnauthorized)
            return
        }

        next.ServeHTTP(w, r)
    })
}
Use a key loaded from protected configuration. Do not hard-code a production secret.

Exercise
Test missing and incorrect keys.
Test valid authentication.
Implement resource authorization.
Ensure secrets never appear in logs.
Document how credentials are rotated.
Expected outcome: You can explain and test the difference between authentication and authorization.

Part 15 — Profiling, Benchmarking, and Performance
Concepts
Performance engineering starts with measurement. Benchmarks can reveal whether a change improves throughput or latency, while profiles help identify expensive functions and allocation patterns.

Use:

Benchmarks for repeatable measurements.
CPU profiles for execution hotspots.
Memory profiles for allocations and retained objects.
The race detector for concurrent data-access problems.
Load tests for realistic request patterns.
Hands-on lab
Create a benchmark:

go
package mathutil

import "testing"

func BenchmarkAdd(b *testing.B) {
    for i := 0; i < b.N; i++ {
        _ = Add(i, i+1)
    }
}
Run:

bash
go test ./... -bench=. -benchmem
go test ./... -race
For an HTTP application that exposes Go's net/http/pprof endpoints in a protected development environment:

bash
go tool pprof http://localhost:6060/debug/pprof/profile
The profile endpoint must be explicitly enabled and reachable. Do not expose profiling endpoints publicly without appropriate access controls.

Exercise
Measure a baseline, optimize one identified hotspot, and compare benchmark results.

Expected outcome: You can justify optimization decisions with evidence instead of guesses.

🏢 Level 4 — Enterprise Production Engineering (Parts 16–20)
Goal: Package, deliver, observe, and operate Go applications safely.**

Part 16 — Docker, Multi-Stage Builds, and Image Security
Concepts
A Docker image packages an application and its runtime requirements. Multi-stage builds separate the compilation environment from the runtime image, reducing unnecessary tools and files in the final image.

Important practices:

Pin base images to an approved version or digest.
Use .dockerignore.
Build with reproducible inputs where possible.
Run as a non-root user.
Keep credentials outside image layers.
Scan images and dependencies.
Handle graceful shutdown.
Use a minimal runtime without removing required certificates or timezone data.
Hands-on lab
Create a Dockerfile:

dockerfile
FROM golang:1.24 AS builder

WORKDIR /src

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build \
    -trimpath \
    -ldflags="-s -w" \
    -o /out/api ./cmd/api

FROM gcr.io/distroless/static-debian12:nonroot

COPY --from=builder /out/api /api

EXPOSE 8080
USER nonroot:nonroot

ENTRYPOINT ["/api"]
This example assumes the project has a go.sum file. If the project has no external dependencies and no go.sum, adjust the dependency-copy step accordingly. Validate base-image availability and policy before using it in a real pipeline.

Create .dockerignore:

text
.git
.env
.env.*
*.log
tmp/
coverage.out
Build and run:

bash
docker build -t go-mastery-api:local .
docker run --rm -p 8080:8080 go-mastery-api:local
Test the service:

bash
curl -i http://localhost:8080/healthz
Troubleshooting
Problem	Investigation
Build fails	Check Go version, module files, and compiler output
Executable missing	Verify the build output path
Container exits	Inspect docker logs and process startup
Connection refused	Check server address, port mapping, and application logs
Permission denied	Verify file permissions and the runtime user
Image too large	Inspect layers and remove unnecessary build artifacts
Expected outcome: You can produce a container image that separates build tools from runtime requirements.

Part 17 — Kubernetes and Cloud-Native Deployment
Concepts
Kubernetes manages workloads through declarative resources. A Deployment manages replicas, while a Service provides stable network access to matching Pods.

Important components include:

Deployments and Pods.
Services.
ConfigMaps and Secrets.
Readiness, liveness, and startup probes.
CPU and memory requests and limits.
Rolling updates and rollback.
Service accounts and RBAC.
Network policies where supported.
Hands-on lab
Create deployments/kubernetes/deployment.yaml:

yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: go-mastery-api
spec:
  replicas: 2
  selector:
    matchLabels:
      app: go-mastery-api
  template:
    metadata:
      labels:
        app: go-mastery-api
    spec:
      containers:
        - name: api
          image: go-mastery-api:local
          imagePullPolicy: IfNotPresent
          ports:
            - name: http
              containerPort: 8080
          readinessProbe:
            httpGet:
              path: /healthz
              port: http
            initialDelaySeconds: 2
            periodSeconds: 5
          livenessProbe:
            httpGet:
              path: /healthz
              port: http
            initialDelaySeconds: 5
            periodSeconds: 10
          resources:
            requests:
              cpu: 100m
              memory: 64Mi
            limits:
              cpu: 500m
              memory: 256Mi
The image must be available to the Kubernetes cluster. For a local cluster, load or build the image using the cluster's supported workflow. In shared environments, publish it to an approved registry.

Validate and apply:

bash
kubectl apply --dry-run=client -f deployments/kubernetes/deployment.yaml
kubectl apply -f deployments/kubernetes/deployment.yaml
kubectl rollout status deployment/go-mastery-api
kubectl get pods
kubectl describe deployment go-mastery-api
Exercise
Add a Service, expose the application within the cluster, and test the health endpoint through port forwarding.

Expected outcome: You can deploy and inspect a basic Go workload and understand Kubernetes health checks.

Part 18 — Observability: Logs, Metrics, and Tracing
Concepts
Observability helps engineers understand internal application behavior through external signals.

Logs: Events and diagnostic details.
Metrics: Numeric measurements over time.
Traces: The path of an operation across service boundaries.
Use structured logging, consistent request IDs, and instrumentation that avoids sensitive data. Metrics labels must have controlled cardinality; never use arbitrary user IDs as unbounded metric labels.

Hands-on lab
Go's standard library includes log/slog for structured logging:

go
package main

import (
    "log/slog"
    "os"
)

func main() {
    logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))

    logger.Info(
        "service_started",
        "service", "go-mastery-api",
        "port", 8080,
    )
}
Run:

bash
go run .
Expected output is a JSON log record containing the event and its attributes.

Exercise
Add request-duration measurements and request counters to an HTTP service. Export metrics through a protected or internal endpoint, then configure a collector or monitoring system.

Expected outcome: You can identify request failures and latency patterns from telemetry.

Part 19 — CI/CD and Release Engineering
Concepts
CI/CD automates validation and delivery. A dependable pipeline should fail early when formatting, tests, compilation, or security checks fail.

A release workflow should:

Check out the source.
Install a supported Go version.
Validate formatting.
Run tests and static checks.
Build the application.
Run appropriate dependency and vulnerability checks.
Build and scan a container image.
Publish only from trusted workflows.
Deploy through an approved release process.
Hands-on lab
Create .github/workflows/go-ci.yml:


yaml
name: Go CI

on:
  push:
    branches: [main]
  pull_request:

permissions:
  contents: read

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up Go
        uses: actions/setup-go@v5
        with:
          go-version-file: go.mod
          cache: true

      - name: Verify formatting
        run: |
          test -z "$(gofmt -l .)"

      - name: Download dependencies
        run: go mod download

      - name: Run tests
        run: go test -race ./...

      - name: Static analysis
        run: go vet ./...

      - name: Build
        run: go build ./...
For a real production pipeline, review action versions and pin third-party actions to approved immutable commit SHAs according to your organization's policy.

Exercise
Add dependency vulnerability checks, build artifact retention, and a separate trusted release workflow.

Expected outcome: Every pull request is automatically validated before merge.

Part 20 — Resilience, Graceful Shutdown, and Production Operations
Concepts
Production services must respond predictably to timeouts, dependency failures, restarts, and traffic spikes.

Important patterns:

Explicit request and dependency timeouts.
Bounded retries with backoff and jitter.
Graceful shutdown.
Connection and concurrency limits.
Health checks that represent actual service state.
Idempotent operations where retries are possible.
Controlled degradation and load shedding.
Documented incident and recovery procedures.
Retries must be bounded and used carefully. Retrying non-idempotent operations without an idempotency strategy can create duplicate side effects.

Hands-on lab
Use signal.NotifyContext to detect shutdown signals:


go
ctx, stop := signal.NotifyContext(
    context.Background(),
    os.Interrupt,
    syscall.SIGTERM,
)
defer stop()
Add the required imports:


go
import (
    "context"
    "os"
    "os/signal"
    "syscall"
)
Use the context to initiate a graceful server shutdown:


go
go func() {
    <-ctx.Done()

    shutdownCtx, cancel := context.WithTimeout(
        context.Background(),
        10*time.Second,
    )
    defer cancel()

    if err := server.Shutdown(shutdownCtx); err != nil {
        log.Printf("graceful shutdown failed: %v", err)
    }
}()
This snippet belongs inside a complete server implementation with a configured server variable and the corresponding net/http, time, and log imports.

Exercise
Run the service, send a termination signal, and verify that in-flight requests receive an opportunity to finish within the shutdown deadline.

Expected outcome: The application can stop gracefully instead of abruptly terminating active requests.

🚀 Level 5 — Senior and Platform Engineering (Parts 21–25)
Goal: Apply architectural thinking, distributed systems principles, platform automation, and engineering leadership.**

Part 21 — Distributed Systems and Messaging
Concepts
Distributed applications communicate across process and network boundaries, where latency, partial failures, duplicated messages, and temporary unavailability are normal possibilities.

Learn:

Synchronous HTTP and RPC communication.
Asynchronous messaging.
Delivery guarantees and duplicate handling.
Idempotent consumers.
Dead-letter handling.
Event schemas and compatibility.
Correlation IDs and distributed tracing.
Hands-on lab
Implement a simple in-process event worker using a buffered channel. Add a message ID and ensure that repeated IDs are handled safely.

Then compare the in-process implementation with a message broker such as NATS or Kafka.

Important: An in-memory channel is not durable messaging. Process restarts can lose queued work. A broker is required when durable delivery and independent consumer lifecycles are part of the design.

Exercise
Design an order-processing workflow with retries, idempotency, failure handling, and observable message processing.

Expected outcome: You can explain distributed delivery trade-offs and design safer asynchronous workflows.

Part 22 — SRE, Reliability, and Incident Management
Concepts
Site Reliability Engineering applies software engineering methods to service operations.

Core concepts:

Service-level indicators (SLIs).
Service-level objectives (SLOs).
Error budgets.
Availability and latency measurement.
Alert quality.
Incident response.
Capacity planning.
Blameless post-incident reviews.
An SLI is a measurement; an SLO is a target for that measurement. An error budget represents the allowed unreliability implied by the objective and measurement window.

Hands-on lab
Define a request-success SLI:


text
Successful requests / Total eligible requests
Define a latency SLI:


text
Requests completed within the agreed latency threshold
/ Total eligible requests
Choose thresholds based on the service's actual requirements rather than copying arbitrary targets.

Exercise
Write an incident runbook that includes:

Symptoms and impact.
Dashboards and diagnostic commands.
Mitigation steps.
Escalation contacts or roles.
Recovery verification.
Follow-up actions.
Expected outcome: You can connect service telemetry with operational objectives and incident response.

Part 23 — CLI Tools and Platform Automation
Concepts
Command-line tools help engineers automate repetitive operations. A reliable CLI should have predictable arguments, clear errors, useful exit codes, and safe defaults.

Useful features include:

Subcommands and flags.
Configuration validation.
Structured output formats.
Dry-run modes.
Context-aware API requests.
Explicit timeouts.
Unit tests.
Clear usage documentation.
Hands-on lab
Create a CLI that validates a configuration file before deployment. Return a non-zero exit status if validation fails.


bash
go run ./cmd/validate --config ./config.json
The command and flags above are the interface you implement in your own application, not a built-in Go command.

Exercise
Add JSON output and a dry-run mode that shows planned actions without modifying infrastructure.

Expected outcome: You can build a maintainable CLI that is suitable for automation and scripting.

Part 24 — Advanced Security and Software Supply Chain
Concepts
Application security extends beyond authentication. It includes dependencies, build provenance, artifact integrity, secret handling, container configuration, and deployment permissions.

Learn:

Dependency vulnerability management.
Least-privilege CI permissions.
Secret scanning.
Software bills of materials (SBOMs).
Container image scanning.
Artifact signing and verification.
Protected release workflows.
Threat modeling.
Security logging and incident handling.
Hands-on lab
Run the official Go vulnerability checker:


bash
go install golang.org/x/vuln/cmd/govulncheck@latest
govulncheck ./...
For controlled CI environments, install a reviewed, pinned tool version instead of automatically taking the latest release every time.

Exercise
Document a threat model for the Go API capstone. Include assets, trust boundaries, attack scenarios, mitigations, and residual risks.

Expected outcome: You can identify and reduce application and software-supply-chain risks.

Part 25 — Architecture, Engineering Leadership, and Final Integration
Concepts
Senior engineering involves making trade-offs that fit business requirements, operational constraints, team capabilities, and system behavior.

Practise:

Defining bounded responsibilities.
Reviewing architecture alternatives.
Documenting significant decisions.
Balancing simplicity and extensibility.
Establishing quality gates.
Planning migrations and releases.
Reviewing reliability and security risks.
Communicating technical decisions clearly.
Hands-on lab
Produce an architecture decision record (ADR):


markdown
# ADR-001: Select the API persistence strategy

## Status
Proposed

## Context
The service requires durable storage and transactional updates.

## Decision
Use PostgreSQL through database/sql and a reviewed driver.

## Alternatives
- In-memory storage
- File-based storage
- PostgreSQL

## Consequences
- Durable data and transaction support
- Database operations require timeout and pool management
- Migrations and backups become operational responsibilities
Exercise
Complete one capstone project and present:

Architecture and component responsibilities.
Security assumptions.
Testing strategy.
Deployment process.
Monitoring and SLOs.
Known limitations.
Recovery and rollback procedure.
Expected outcome: You can justify engineering decisions and deliver a documented, testable system.

🏆 Capstone 1 — Production-Ready Go API
🎯 Objective
Build a Go REST API with validated requests, persistent storage, automated tests, secure configuration, Docker packaging, and operational visibility.

Architecture

mermaid
flowchart TD
    C["API Client"] --> I["Ingress or Reverse Proxy"]
    I --> A["Go REST API"]
    A --> V["Validation and Business Logic"]
    V --> D["PostgreSQL"]
    A --> O["Logs, Metrics and Traces"]
    A --> H["Health and Readiness Checks"]
    CI["CI Pipeline"] --> T["Tests and Security Checks"]
    T --> IMG["Container Image"]
    IMG --> DEP["Deployment Environment"]
Components

Component	Responsibility
Go HTTP server	Routes and HTTP behavior
Service layer	Business rules
Repository layer	Database interactions
PostgreSQL	Durable storage
Tests	Regression prevention
Docker	Application packaging
CI pipeline	Automated validation
Observability	Diagnostics and performance visibility
Implementation steps
Define the API contract and data model.
Implement request validation and consistent error responses.
Add database migrations.
Implement parameterized queries and transaction boundaries.
Add unit tests for business rules.
Add integration tests for persistence and HTTP behavior.
Add graceful shutdown and request timeouts.
Build a multi-stage container image.
Add health endpoints and telemetry.
Document deployment, rollback, and recovery.
Example API contract

Method	Endpoint	Expected behavior
GET	/healthz	Process health
GET	/readyz	Readiness for traffic
GET	/api/v1/items	List items
POST	/api/v1/items	Create an item
GET	/api/v1/items/{id}	Retrieve an item
DELETE	/api/v1/items/{id}	Delete an item
Implement the item endpoints and their persistence logic as part of the project.

Testing

bash
gofmt -w .
go vet ./...
go test ./...
go test -race ./...
go build ./...
Use integration tests against a disposable test database. Do not treat unit tests alone as proof that database behavior is correct.

Security requirements
Validate untrusted input.
Use parameterized SQL.
Store secrets outside source control.
Require authentication where the API handles protected resources.
Enforce authorization for individual resources.
Use TLS at the appropriate network boundary.
Scan dependencies and container images.
Avoid logging credentials and sensitive payloads.
Troubleshooting

Failure	Investigation
API returns 500	Inspect structured logs and error handling
Database connection fails	Check network, credentials, and database readiness
Tests are flaky	Check shared state, time dependencies, and concurrency
Requests time out	Inspect downstream latency and timeout configuration
Container exits	Inspect startup logs and runtime configuration
Expected outcome
A documented API that builds, passes automated tests, persists data correctly, and can be deployed and diagnosed in a controlled environment.

🔐 Capstone 2 — Secure Go CI/CD Platform
🎯 Objective
Create an automated delivery pipeline that validates Go code, runs tests, checks dependencies, builds a container, and publishes artifacts through a controlled release process.

Architecture

mermaid
flowchart TD
    DEV["Developer Pull Request"] --> CI["CI Workflow"]
    CI --> FMT["Formatting and Static Checks"]
    FMT --> TEST["Unit and Integration Tests"]
    TEST --> SEC["Dependency and Security Checks"]
    SEC --> BUILD["Build Go Binary"]
    BUILD --> IMG["Build Container Image"]
    IMG --> SCAN["Image Scan and SBOM"]
    SCAN --> REG["Approved Container Registry"]
    REG --> RELEASE["Protected Release Workflow"]
    RELEASE --> DEPLOY["Approved Deployment"]
Implementation steps
Configure branch protection and pull-request checks.
Run formatting, tests, race detection where appropriate, and static analysis.
Add vulnerability checking.
Build the application and container image.
Generate an SBOM.
Scan the image against an approved vulnerability policy.
Restrict publishing permissions to trusted workflows.
Use immutable artifact references for releases.
Add release notes and rollback instructions.
Security controls
Use minimal workflow permissions.
Pin third-party actions to reviewed immutable versions.
Avoid long-lived cloud credentials in workflow files.
Use short-lived identity federation where supported.
Restrict publishing and deployment to trusted branches or environments.
Never publish artifacts from untrusted pull-request code with privileged credentials.
Testing and verification
Introduce a failing test and confirm the workflow blocks the build.
Introduce a formatting violation and confirm validation fails.
Verify that an untrusted pull request cannot publish an image.
Verify that release artifacts can be traced to the source revision.
Test the rollback process in a non-production environment.
Expected outcome
A repeatable delivery process with automated quality gates, controlled artifact publication, and documented release procedures.

📊 Capstone 3 — Go Observability and SRE Platform
🎯 Objective
Build a Go service and an observability stack that helps engineers investigate errors, latency, resource consumption, and reliability objective violations.

Architecture

mermaid
flowchart TD
    U["Users or Load Generator"] --> API["Go Application"]
    API --> LOG["Structured Logs"]
    API --> MET["Metrics"]
    API --> TRACE["Distributed Traces"]
    MET --> PROM["Prometheus"]
    PROM --> GRAF["Grafana Dashboards"]
    TRACE --> OTEL["OpenTelemetry Collector"]
    LOG --> LOGSTORE["Approved Log Backend"]
    GRAF --> ALERT["Alerting Rules"]
    ALERT --> RUN["Runbooks and Incident Response"]
Implementation steps
Add request IDs and structured logging.
Record request count, errors, and duration.
Add trace instrumentation for incoming requests and downstream calls.
Configure a metrics collector.
Build dashboards for latency, throughput, errors, and resource usage.
Define SLIs and SLOs.
Create alerts tied to user impact.
Document troubleshooting and incident response.
Test behavior under load and simulated dependency failure.
Recommended dashboard signals

Signal	Why it matters
Request rate	Shows workload volume
Error rate	Reveals failed requests
Request latency	Shows user-visible performance
CPU and memory	Helps investigate resource pressure
Database latency	Reveals persistence bottlenecks
Goroutine count	Can help identify leaks or unexpected concurrency growth
Queue depth	Reveals backlogs in asynchronous processing
Testing
Generate normal traffic.
Generate invalid requests.
Simulate slow dependency responses.
Verify dashboard updates.
Trigger a test alert.
Follow the runbook and confirm the incident can be diagnosed.
Expected outcome
An observable Go service with useful dashboards, actionable alerts, defined reliability objectives, and operational documentation.

🚀 Capstone 4 — Go Developer Platform and Automation
🎯 Objective
Build a CLI or internal developer tool that standardizes common engineering workflows and helps teams create, validate, and operate Go services.

Architecture

mermaid
flowchart TD
    DEV["Developer"] --> CLI["Go Platform CLI"]
    CLI --> TPL["Service Templates"]
    CLI --> VALID["Configuration Validation"]
    CLI --> CHECK["Quality and Security Checks"]
    CLI --> CI["CI Workflow Generation"]
    CLI --> DEP["Deployment Automation"]
    TPL --> REPO["New Service Repository"]
    REPO --> CI
    CI --> DEP
Example command interface

bash
platform-cli create service catalog-api
platform-cli validate --config platform.yaml
platform-cli test
platform-cli build
platform-cli deploy --environment staging
These are proposed commands for the CLI you implement, not existing Go toolchain commands.

Implementation steps
Define a stable command-line interface.
Create a service template with a minimal Go application.
Add configuration parsing and validation.
Add a dry-run mode for actions that modify infrastructure.
Generate consistent tests, Dockerfiles, and CI workflows.
Add structured output and meaningful exit codes.
Add unit tests for argument parsing and validation.
Document supported environments and failure recovery.
Security requirements
Validate service names and generated file paths.
Prevent path traversal in template generation.
Avoid executing untrusted shell input.
Use least-privilege deployment credentials.
Require explicit confirmation for destructive actions.
Record useful audit information without exposing secrets.
Expected outcome
A tested developer tool that reduces repetitive work, enforces engineering standards, and makes service creation and validation more consistent.

🧯 Troubleshooting Guide

Symptom	Likely cause	Recommended action
go: command not found	Go is missing or not on PATH	Install Go and verify go version
no required module provides package	Dependency or module configuration is incomplete	Review imports, module path, and go.mod; run go mod tidy
connection refused	Service or database is not listening at the expected address	Check process status, network access, and port configuration
context deadline exceeded	An operation exceeded its configured deadline	Inspect downstream latency and timeout settings
concurrent map writes	Multiple goroutines modify a map without synchronization	Add appropriate synchronization or redesign ownership
Tests pass locally but fail in CI	Environment assumptions or nondeterministic tests	Check toolchain versions, test isolation, time dependencies, and environment variables
Docker image cannot start	Wrong binary path, architecture, permissions, or runtime assumptions	Inspect build output and container logs
Kubernetes Pod is not Ready	Failed readiness probe, startup issue, or unavailable dependency	Use kubectl describe pod and inspect logs
Image pull fails	Registry credentials, tag, or image availability issue	Verify image reference and pull permissions
Metrics are missing	Instrumentation or scrape configuration is incorrect	Verify endpoint access and collector configuration
Memory grows unexpectedly	Retained objects, unbounded queues, or goroutine leaks	Profile memory and inspect concurrency lifecycle
CI security scan fails	Vulnerable dependency or policy violation	Investigate the finding and update or mitigate safely
Useful diagnostic commands:


bash
go version
go env
go list ./...
go test -race ./...
go vet ./...
go mod tidy
docker ps
docker logs <container-name>
kubectl get pods
kubectl describe pod <pod-name>
kubectl logs <pod-name>
Replace angle-bracket values such as <container-name> and <pod-name> with actual resource names.

✅ Completion Checklist
Level 1 — Go Foundations
Install and verify the Go toolchain.
Write and execute simple Go programs.
Use types, slices, maps, conditions, and loops.
Create functions and handle errors.
Implement structs, methods, and interfaces.
Level 2 — Application Engineering
Organize code into modules and packages.
Write table-driven tests.
Validate configuration and process JSON.
Build HTTP handlers and REST endpoints.
Implement middleware and consistent error responses.
Level 3 — Advanced Engineering
Implement a worker pool.
Add cancellation and timeout handling.
Access PostgreSQL using parameterized queries.
Implement authentication and authorization.
Benchmark and profile a Go application.
Level 4 — Enterprise Production Engineering
Build a multi-stage Docker image.
Deploy a Go application to Kubernetes.
Add logs, metrics, and traces.
Automate CI checks.
Implement graceful shutdown and bounded retries.
Level 5 — Senior and Platform Engineering
Design an asynchronous processing workflow.
Define SLIs and SLOs.
Build a CLI automation tool.
Perform a dependency and supply-chain security review.
Complete an architecture decision record.
Finish all four capstone projects.
🛡️ Production-Readiness Checklist
Before describing a service as production-ready, verify the applicable requirements below.

Application quality
Business logic has appropriate unit tests.
Critical integrations have integration tests.
Configuration is validated at startup.
Errors are handled and logged safely.
Timeouts and cancellation are implemented.
Graceful shutdown is tested.
Security
No credentials or secrets are committed to source control.
Authentication and authorization are enforced where needed.
Dependencies and container images are scanned.
The application runs with least privilege.
Input validation and resource limits are in place.
Sensitive data is excluded from logs.
Delivery and operations
CI checks pass on the release revision.
Artifacts can be traced to source revisions.
Container images are versioned and stored in an approved registry.
Deployment and rollback procedures are documented.
Health probes represent the intended application state.
Dashboards and alerts cover critical service behavior.
Backup and recovery requirements are addressed where persistent data exists.
SLOs and incident runbooks are documented.
A checklist alone does not guarantee production readiness. Verify each item with tests, configuration reviews, operational exercises, and evidence appropriate to the application's risk.
📚 Official Learning Resources
The Go Programming Language
A Tour of Go
Go Documentation
Effective Go
Go Modules Reference
Go Blog
Go Testing Package
Go Vulnerability Database
Docker Documentation
Kubernetes Documentation
GitHub Actions Documentation
OpenTelemetry Documentation
Prometheus Documentation
Grafana Documentation
Terraform Documentation
🎉 Final Outcome
By completing all five levels and the four capstones, you will have practised the complete engineering lifecycle:

Learn → Design → Code → Test → Secure → Containerize → Deploy → Observe → Improve

The goal is not merely to finish 25 parts. It is to build a portfolio of working Go applications with tests, clear architecture, secure delivery workflows, operational documentation, and demonstrated engineering decisions.

Keep building. Keep testing. Keep improving. Master Go through hands-on engineering. 🐹
