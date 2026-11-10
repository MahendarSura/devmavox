import type { CicdTopicLesson } from "./cicd-topic-lessons";

export const stageOneLessonOverrides: Partial<Record<string, CicdTopicLesson>> = {
  "1|Java Fundamentals": {
    overview: "Java is a strongly typed, object-oriented programming language used to build backend services, APIs, enterprise systems, and cloud applications. Java source code is compiled into bytecode, which runs on a Java Virtual Machine. A Spring Boot payment service uses Java classes, methods, objects, interfaces, and exception handling to implement payment rules and communicate with databases and external services.",
    purpose: "Java provides the application logic that performs business operations. In a CI/CD pipeline, developers write Java code, compile it, run automated tests, package it as a JAR, and deploy it into a container. Understanding the language fundamentals helps developers and DevOps engineers diagnose compilation failures, runtime errors, dependency problems, and application startup issues.",
    architecture: "A Java application contains source files, packages, classes, methods, and dependencies. The JDK provides development tools such as javac. Compilation produces bytecode files. The JVM loads and executes bytecode. A Spring Boot application adds a framework layer for dependency injection, web requests, configuration, and application lifecycle management.",
    workflow: [
      "Install a supported JDK and verify the Java version.",
      "Create a project with a package and a main application class.",
      "Write classes and methods that implement the required business logic.",
      "Compile source code using javac or the Maven compiler plugin.",
      "Run unit tests to validate expected behavior.",
      "Package the application and execute it using the Java runtime.",
      "Commit the source code so the CI pipeline can repeat the build and test process."
    ],
    example: "A payment service can define a Payment class with paymentId, amount, currency, and status fields. A PaymentService class validates the amount and calculates the next payment state. A controller receives an HTTP request and calls the service. The application should reject an invalid amount before attempting to contact a payment gateway.",
    commands: [
      "java -version — verify the installed Java runtime.",
      "javac -version — verify the Java compiler.",
      "javac HelloWorld.java — compile a standalone Java source file.",
      "java HelloWorld — execute the compiled class.",
      "jar --version — verify the JAR tool version."
    ],
    configuration: "Install a supported JDK and configure JAVA_HOME to point to its installation directory. Add the JDK bin directory to PATH. In a Maven project, define the Java release version in pom.xml so local and CI builds compile against the same language level. Do not depend on whichever JDK happens to be installed on a developer or Jenkins agent.",
    failures: [
      "javac is not recognized because the JDK bin directory is missing from PATH.",
      "UnsupportedClassVersionError occurs when the runtime is older than the bytecode target.",
      "A package declaration does not match the source directory structure.",
      "A class or method cannot be found because of an incorrect name, import, or dependency.",
      "A NullPointerException occurs when code uses a null reference unexpectedly."
    ],
    recovery: [
      "Run java -version and javac -version to identify the installed tools.",
      "Check JAVA_HOME and PATH when Java commands cannot be found.",
      "Compare the compiler release and runtime versions.",
      "Read the first compilation error and correct the source or import.",
      "Use the stack trace to identify the failing class and line.",
      "Run the relevant unit tests again before committing the correction."
    ],
    bestPractices: [
      "Use a supported and consistent JDK version across local, CI, and production environments.",
      "Use meaningful package, class, method, and variable names.",
      "Keep business logic separate from HTTP controller code.",
      "Validate external input before processing it.",
      "Write unit tests for business rules and edge cases.",
      "Avoid hard-coded credentials, environment-specific URLs, and secrets.",
      "Use code review and automated quality checks before merging changes."
    ],
    exercise: "Create a small Java payment model with paymentId, amount, and status. Implement a service method that accepts a payment only when the amount is greater than zero. Compile the project, write tests for valid and invalid amounts, execute the tests, and commit the code. Record the JDK version used so the CI environment can use a compatible version."
  },

  "1|Java Project Structure": {
    overview: "A Java project structure organizes source code, resources, tests, build files, and generated artifacts into predictable locations. Maven projects normally use src/main/java for application code, src/main/resources for runtime resources, src/test/java for tests, and src/test/resources for test data. The pom.xml file describes dependencies, plugins, project coordinates, and build behavior.",
    purpose: "A standard structure allows developers, IDEs, Maven, and CI servers to locate files consistently. In a payment-service repository, controllers, services, repositories, configuration, and tests should be separated so the project remains maintainable as the application grows. Jenkins can build the repository without needing custom file-discovery logic.",
    architecture: "The project root contains pom.xml and supporting files. Java packages under src/main/java contain the application layers. Resource files under src/main/resources contain application configuration and templates. Test classes under src/test/java validate production code. Maven writes compiled classes and packaged artifacts under target, which is generated output and should not normally be committed.",
    workflow: [
      "Create the project root and add pom.xml.",
      "Create src/main/java and a package matching the application namespace.",
      "Separate controller, service, repository, model, and configuration packages where appropriate.",
      "Place application.yml and other runtime resources under src/main/resources.",
      "Create matching test packages under src/test/java.",
      "Run Maven tests and inspect the generated target directory.",
      "Commit source files and build configuration, not generated output."
    ],
    example: "A payment-service project can use com.devmavox.payment as its root package. Its controller package handles HTTP requests, service package contains payment rules, repository package handles persistence, and model package contains request and response types. PaymentServiceTest belongs under the corresponding test package so Maven discovers and executes it.",
    commands: [
      "tree /F — inspect the project directory structure on Windows.",
      "mvn validate — validate the Maven project model.",
      "mvn test — compile and execute tests using the standard Maven layout.",
      "mvn clean — remove generated build output under target.",
      "mvn package — package the application."
    ],
    configuration: "Keep pom.xml at the project root. Define groupId, artifactId, version, Java release, dependencies, and build plugins. Keep environment-specific configuration in application.yml or application.properties. Use .gitignore to exclude target, IDE metadata, local logs, and other generated files. Do not place production passwords or API tokens in committed configuration files.",
    failures: [
      "Maven reports that no POM exists because the command was run from the wrong directory.",
      "Tests are not discovered because test classes do not follow naming or directory conventions.",
      "Resources are missing from the packaged JAR because they are outside the configured resource directory.",
      "Multiple classes with unclear responsibilities make changes difficult to maintain.",
      "Generated target files are accidentally committed to Git."
    ],
    recovery: [
      "Run pwd or Get-Location and confirm the project root contains pom.xml.",
      "Inspect the directory tree and move source files into the standard Maven locations.",
      "Check test class names and package declarations.",
      "Inspect the packaged JAR to confirm required resources are included.",
      "Correct .gitignore and remove generated files from version control when appropriate.",
      "Run mvn clean verify to validate the corrected structure."
    ],
    bestPractices: [
      "Follow the standard Maven directory layout.",
      "Use a consistent package namespace based on the organization and application.",
      "Keep controllers, business services, repositories, and configuration responsibilities separate.",
      "Keep automated tests alongside the application package structure.",
      "Commit the POM and source code while excluding generated build output.",
      "Document the project build command in the repository README.",
      "Keep secrets outside the repository."
    ],
    exercise: "Create a Maven project named payment-service. Add controller, service, repository, model, and configuration packages. Add one application.yml file and one service test. Run mvn clean verify, inspect the target directory, and confirm that the generated JAR contains the expected classes and resources."
  },

  "1|Object-Oriented Programming": {
    overview: "Object-oriented programming organizes software around classes and objects. A class defines data and behavior, while an object is an instance of that class. Java supports encapsulation, inheritance, polymorphism, and abstraction. These concepts help developers model business entities and create components that can be tested and extended without placing all application logic in one large class.",
    purpose: "A payment application contains different concepts such as Payment, Customer, PaymentMethod, and PaymentService. Object-oriented design gives each component a clear responsibility. It also allows different payment methods to implement a common interface while providing their own processing behavior.",
    architecture: "A model class represents application data. Service classes implement business operations. Interfaces define contracts between components. Implementations provide concrete behavior. Encapsulation protects internal state, abstraction exposes required operations, inheritance reuses suitable behavior, and polymorphism allows code to work with different implementations through a shared type.",
    workflow: [
      "Identify the business entities and responsibilities.",
      "Create classes that represent the required domain concepts.",
      "Keep fields private and expose controlled methods where needed.",
      "Define interfaces for behavior that may have multiple implementations.",
      "Implement each interface for the required business variation.",
      "Inject the required implementation into the service layer.",
      "Write tests against the public behavior rather than internal implementation details."
    ],
    example: "Define a PaymentProcessor interface with a process method. CardPaymentProcessor and UpiPaymentProcessor implement that interface differently. PaymentService depends on the interface instead of directly creating a card processor. This design makes it possible to add another payment method without rewriting the entire service.",
    commands: [
      "mvn clean compile — compile the classes and interfaces.",
      "mvn test — run tests for the object-oriented design.",
      "mvn dependency:tree — inspect libraries used by the project.",
      "javap -classpath target/classes com.devmavox.payment.PaymentService — inspect compiled class members."
    ],
    configuration: "Use Java access modifiers deliberately. Keep domain fields private, define interfaces for genuine variation, and avoid deep inheritance trees. In Spring Boot, annotate components with suitable stereotypes such as @Service and @Component, then use constructor injection. Avoid creating dependencies manually inside business methods when Spring should manage their lifecycle.",
    failures: [
      "A class takes responsibility for validation, database access, HTTP handling, and payment processing.",
      "Inheritance is used for unrelated classes, creating tightly coupled behavior.",
      "A concrete implementation is hard-coded, making alternative implementations difficult to test.",
      "Mutable public fields allow application state to change without validation.",
      "Tests depend on implementation details instead of observable behavior."
    ],
    recovery: [
      "Identify classes that contain multiple unrelated responsibilities.",
      "Move business behavior into focused service or domain classes.",
      "Introduce an interface only where multiple implementations or a clear contract are useful.",
      "Use constructor injection to make dependencies explicit.",
      "Add unit tests for each public business operation.",
      "Refactor incrementally and run the full test suite after each change."
    ],
    bestPractices: [
      "Keep each class focused on a clear responsibility.",
      "Prefer composition over unnecessary inheritance.",
      "Use interfaces to define useful contracts.",
      "Protect state through encapsulation and validation.",
      "Use constructor injection for required Spring dependencies.",
      "Keep domain rules out of controllers.",
      "Test business behavior independently from infrastructure."
    ],
    exercise: "Create a PaymentProcessor interface and two implementations for card and UPI payments. Inject the interface into PaymentService. Write unit tests that verify each implementation is called correctly. Add a third mock implementation in a test to demonstrate that the service does not depend on a specific processor class."
  },

  "1|Collections and Generics": {
    overview: "The Java Collections Framework provides interfaces and implementations for storing and processing groups of objects. List preserves ordered elements, Set prevents duplicate elements according to equality rules, and Map stores key-value pairs. Generics provide compile-time type safety, reducing unsafe casts and preventing many type-related runtime errors.",
    purpose: "A payment service may process a list of transaction records, maintain a set of supported payment methods, or look up payment details by transaction ID. Choosing the correct collection affects ordering, uniqueness, lookup performance, and memory usage. Generics help ensure that a collection contains the intended type.",
    architecture: "Collection interfaces define operations, while classes such as ArrayList, HashSet, TreeSet, and HashMap provide implementations. Map is a separate interface in the framework. Generic declarations such as List<Payment> specify the element type. Iterators and enhanced for loops provide safe ways to traverse collection elements.",
    workflow: [
      "Identify whether the data requires ordering, uniqueness, or key-based lookup.",
      "Choose List, Set, or Map based on the required behavior.",
      "Declare the collection with a meaningful generic type.",
      "Add and retrieve data using the collection API.",
      "Use iteration or stream operations to process records.",
      "Consider concurrent access when collections are shared across threads.",
      "Test duplicate handling, ordering, null behavior, and large input sizes."
    ],
    example: "A payment service can use Map<String, Payment> to look up a payment by payment ID. A List<Payment> can represent a page of search results. A Set<String> can represent supported payment methods without duplicates. For production persistence, these in-memory collections should not replace a database when data must survive application restarts or be shared across multiple replicas.",
    commands: [
      "mvn clean compile — compile generic collection declarations.",
      "mvn test — run collection behavior tests.",
      "jshell — experiment with List, Set, Map, and generics interactively.",
      "jcmd <PID> GC.class_histogram — inspect object counts when investigating memory usage."
    ],
    configuration: "Choose collection implementations based on access patterns. ArrayList is suitable for common indexed access and iteration. HashSet is useful for uniqueness checks. HashMap is useful for key-based lookup. Use immutable collection factories such as List.of when data must not be modified. Do not share mutable collections between request threads without a suitable concurrency strategy.",
    failures: [
      "ConcurrentModificationException occurs when a collection is structurally modified during iteration in an unsupported way.",
      "ClassCastException can result from unsafe raw-type usage.",
      "Duplicate records appear because a List was used where uniqueness was required.",
      "A HashMap lookup fails because key equality or hashCode behavior is incorrect.",
      "Memory grows because an application retains an unbounded collection.",
      "A normal HashMap is accessed concurrently without synchronization."
    ],
    recovery: [
      "Identify the collection implementation and its intended behavior.",
      "Use generic types instead of raw collection declarations.",
      "Check equals and hashCode when custom objects are used as Set elements or Map keys.",
      "Use an Iterator remove operation or a safe collection strategy when removing elements during traversal.",
      "Inspect collection growth and define appropriate retention limits.",
      "Use concurrent collections or synchronization when multiple threads share mutable state.",
      "Add tests for duplicates, concurrent access, and large collections."
    ],
    bestPractices: [
      "Declare collections using interfaces such as List, Set, and Map.",
      "Use generics instead of raw types.",
      "Choose a collection based on ordering, uniqueness, and lookup needs.",
      "Avoid storing unbounded request data in application memory.",
      "Use immutable collections when modification is not required.",
      "Use concurrent data structures only when their concurrency behavior fits the use case.",
      "Use pagination for large database result sets."
    ],
    exercise: "Create a PaymentRegistry using Map<String, Payment>. Add methods to register a payment, find a payment by ID, and return a list of payments. Add a Set for supported payment methods. Test duplicate IDs, missing IDs, and the behavior when the same payment method is added twice."
  },

  "1|Exception Handling": {
    overview: "Java exception handling provides a controlled way to respond to errors during application execution. The language provides try, catch, finally, throw, and throws. Checked exceptions must be handled or declared. Runtime exceptions represent unchecked failures. Spring applications can translate exceptions into consistent HTTP responses using @RestControllerAdvice and @ExceptionHandler.",
    purpose: "A payment API must handle invalid requests, missing records, database failures, and payment gateway timeouts without exposing internal details. Proper exception handling allows the application to distinguish business errors from infrastructure failures, record diagnostic information, and return meaningful status codes to clients.",
    architecture: "An HTTP request enters a controller, calls a service, and may access a repository or external gateway. Each layer should report failures clearly. Business exceptions describe application rules. Infrastructure exceptions describe technical problems. A centralized REST exception handler maps these failures to safe API error responses.",
    workflow: [
      "Validate request fields before processing a payment.",
      "Throw a meaningful business exception when a business rule is violated.",
      "Catch an exception locally only when the current layer can recover or add useful context.",
      "Allow unexpected failures to reach centralized error handling.",
      "Map known exceptions to appropriate HTTP status codes.",
      "Log diagnostic details with a correlation ID while protecting sensitive data.",
      "Test expected failures and unexpected dependency failures."
    ],
    example: "If a customer submits a payment with an amount of zero, PaymentService throws InvalidPaymentException. A @RestControllerAdvice handler returns HTTP 400 with an INVALID_PAYMENT error code. If the gateway times out, the service records the dependency failure and returns a controlled server error without exposing the gateway credentials or internal stack trace.",
    commands: [
      "mvn test -Dtest=PaymentServiceTest — run focused exception tests.",
      "mvn test — run the full test suite.",
      "mvn spring-boot:run — start the API for manual error testing.",
      "curl -i -X POST http://localhost:8080/api/payments -H 'Content-Type: application/json' -d '{\"amount\":0}' — test invalid payment handling."
    ],
    configuration: "Create specific exception classes for business failures. Use @RestControllerAdvice and @ExceptionHandler for centralized REST mapping. Return a stable error format containing a safe code, message, timestamp, and correlation ID. Configure logging levels in application.yml. Never expose raw stack traces, credentials, or internal infrastructure details to API clients.",
    failures: [
      "A broad catch block hides the original failure.",
      "An exception is silently ignored and the application reports success.",
      "An API returns HTTP 200 even though the payment failed.",
      "The error response exposes internal paths or sensitive details.",
      "A finally block throws a second exception and hides the original cause."
    ],
    recovery: [
      "Reproduce the failure and capture its HTTP status and correlation ID.",
      "Inspect logs for the original exception and the failing application layer.",
      "Classify the problem as validation, business logic, infrastructure, or programming failure.",
      "Correct the root cause and add a focused automated test.",
      "Verify the error response and logging behavior.",
      "Confirm retries cannot create duplicate payment transactions."
    ],
    bestPractices: [
      "Catch specific exception types.",
      "Separate business exceptions from technical exceptions.",
      "Use centralized API exception handling.",
      "Never return stack traces or secrets to clients.",
      "Include correlation IDs in diagnostic logs.",
      "Do not log sensitive payment information.",
      "Design payment operations to be idempotent."
    ],
    exercise: "Implement InvalidPaymentException and PaymentGatewayException. Add a @RestControllerAdvice handler that maps invalid input to HTTP 400 and a simulated gateway failure to a controlled 5xx response. Write tests that verify both response codes and safe error bodies."
  },

  "1|JVM Architecture": {
    overview: "The Java Virtual Machine executes Java bytecode. The Java compiler converts source files into class files, and the JVM loads, verifies, and executes those classes. JVM architecture includes class loaders, runtime memory areas, an execution engine, and garbage collection. The interpreter executes bytecode while the Just-In-Time compiler can compile frequently executed code into native machine instructions.",
    purpose: "Spring Boot applications run inside a JVM, including when packaged in Docker and deployed to Kubernetes. Understanding the JVM helps DevOps engineers investigate startup errors, incompatible Java versions, memory pressure, CPU spikes, thread problems, and runtime performance issues.",
    architecture: "The class loader subsystem loads classes. The runtime data areas include the heap, thread stacks, program counter registers, and native method stacks. Metaspace stores class metadata. The execution engine interprets or JIT-compiles bytecode. Garbage collection reclaims unreachable heap objects. Native libraries and direct buffers can consume memory outside the Java heap.",
    workflow: [
      "Compile Java source code into bytecode using javac or Maven.",
      "Start the JVM with the required runtime and memory options.",
      "Load application classes through the class loader subsystem.",
      "Verify bytecode before execution.",
      "Execute bytecode through the interpreter and JIT compiler.",
      "Allocate objects in heap memory and use thread stacks for method execution.",
      "Monitor runtime behavior, garbage collection, and process memory."
    ],
    example: "When a payment-service container starts, its entry point launches the Java process. The JVM loads Spring classes, initializes application components, and begins serving requests. Under increased traffic, object allocation and thread usage may increase. If total process memory exceeds the Kubernetes container limit, the container can be killed even when Java heap usage alone appears acceptable.",
    commands: [
      "java -version — display the runtime version.",
      "javac -version — display the compiler version.",
      "java -XshowSettings:vm -version — display JVM settings.",
      "jcmd <PID> VM.version — inspect the running JVM version.",
      "jcmd <PID> VM.flags — inspect active JVM flags.",
      "jcmd <PID> Thread.print — capture thread information."
    ],
    configuration: "Use the same supported Java major version in development, CI, and production. Configure -Xms and -Xmx only after measuring the application. Consider -XX:MaxRAMPercentage for container-aware heap sizing. Remember that the container also needs memory for metaspace, thread stacks, direct buffers, native libraries, and other process overhead.",
    failures: [
      "UnsupportedClassVersionError indicates incompatible compiler and runtime versions.",
      "ClassNotFoundException indicates a class cannot be located.",
      "NoClassDefFoundError can indicate a missing class or failed class initialization.",
      "OutOfMemoryError: Java heap space indicates heap allocation failure.",
      "Container OOMKilled occurs when total process memory exceeds the container limit.",
      "Invalid JVM flags prevent the process from starting."
    ],
    recovery: [
      "Capture the complete startup error or JVM diagnostic output.",
      "Compare java -version in the build environment and production image.",
      "Inspect the packaged application and dependency contents for class-loading errors.",
      "Use jcmd to inspect JVM flags and threads when the process is available.",
      "Compare JVM heap settings with the Kubernetes memory limit.",
      "Correct the image, dependencies, or JVM flags and rebuild.",
      "Perform a smoke test and monitor startup, CPU, and memory."
    ],
    bestPractices: [
      "Standardize JDK versions across environments.",
      "Use supported and maintained Java distributions.",
      "Size heap based on measured workloads and container limits.",
      "Monitor heap, garbage collection, thread count, and total process memory.",
      "Keep diagnostic tools available in controlled troubleshooting environments.",
      "Do not increase heap blindly.",
      "Test Java upgrades in staging before production rollout."
    ],
    exercise: "Run a Spring Boot service using a selected JDK. Record java -version and the active JVM flags. Package the application in Docker with a defined memory limit. Inspect the Java process with jcmd where available. Compare heap configuration with the container memory limit and document the runtime settings."
  },

  "1|Memory Management and Garbage Collection": {
    overview: "Java memory management controls how the JVM allocates and releases memory. Most objects are stored in the heap, while each thread uses a stack for method calls and local variables. Metaspace stores class metadata. Garbage collection identifies objects that are no longer reachable and reclaims their heap memory. A memory leak can still occur when an application retains references to objects it no longer needs.",
    purpose: "A busy payment API creates many request, response, and transaction objects. Poor memory behavior can cause slow garbage collection, high CPU usage, long pauses, OutOfMemoryError, and Kubernetes pod restarts. DevOps engineers must understand heap usage and total container memory to diagnose these incidents correctly.",
    architecture: "The JVM heap contains application objects. Depending on the selected collector, memory may be organized into generations or regions. Thread stacks contain method frames and local variables. Metaspace stores class metadata. Native memory and direct buffers exist outside the ordinary Java heap. Garbage collectors use reachability from roots such as active thread stacks and static references to determine which objects can be reclaimed.",
    workflow: [
      "The application allocates objects while processing requests.",
      "References keep required objects reachable.",
      "Objects that are no longer reachable become eligible for collection.",
      "The selected garbage collector performs collection and reclaims memory.",
      "The application continues processing requests and allocating new objects.",
      "Monitoring records heap usage, allocation rate, collection frequency, and pause duration.",
      "Engineers analyze sustained growth or abnormal pauses before changing memory settings."
    ],
    example: "A payment API creates request objects for each transaction. Normally, completed requests become unreachable and can be collected. If debugging code stores every request in a static list, those objects remain reachable and heap usage grows continuously. In Kubernetes, the pod may eventually be OOMKilled when total process memory exceeds its limit.",
    commands: [
      "jcmd <PID> GC.heap_info — inspect heap information.",
      "jcmd <PID> GC.class_histogram — inspect object counts by class.",
      "jstat -gc <PID> 1000 10 — sample garbage-collection statistics.",
      "jcmd <PID> GC.heap_dump /tmp/payment-service.hprof — capture a heap dump for controlled analysis.",
      "jcmd <PID> VM.native_memory summary — inspect native memory when tracking is enabled.",
      "kubectl describe pod <pod-name> -n <namespace> — inspect pod termination details."
    ],
    configuration: "Configure heap limits using -Xms and -Xmx when appropriate, or test container-aware sizing with -XX:MaxRAMPercentage. Modern HotSpot JVMs support unified GC logging through options such as -Xlog:gc*:file=/var/log/app/gc.log:time,uptime,level,tags. Protect heap dumps because they may contain sensitive customer data. Ensure diagnostic storage has sufficient capacity.",
    failures: [
      "OutOfMemoryError: Java heap space indicates heap exhaustion.",
      "OutOfMemoryError: Metaspace indicates class metadata allocation failure.",
      "Frequent full garbage collections can create high CPU usage and long pauses.",
      "An unbounded cache or static collection retains objects unnecessarily.",
      "A pod is OOMKilled because total process memory exceeds its limit.",
      "Native memory or thread stacks consume memory even when heap usage looks normal."
    ],
    recovery: [
      "Inspect pod restart count and last termination reason.",
      "Review heap metrics and GC logs around the incident time.",
      "Separate heap exhaustion from metaspace, native memory, and container-limit problems.",
      "Capture and securely analyze a heap dump when safe.",
      "Identify unbounded caches, retained objects, or resources that are not released.",
      "Correct the retention problem or memory sizing and repeat load testing.",
      "Verify memory behavior under realistic production traffic."
    ],
    bestPractices: [
      "Monitor heap and total container memory together.",
      "Set container memory limits with room for non-heap memory.",
      "Avoid unbounded collections and caches.",
      "Use GC logs and heap dumps as evidence instead of guessing.",
      "Restrict access to diagnostic dumps.",
      "Test memory behavior under realistic load.",
      "Alert on sustained growth, long GC pauses, and repeated pod restarts."
    ],
    exercise: "Run the payment service under a controlled memory limit. Generate repeated API requests and observe heap and process memory. Use jstat or jcmd to inspect garbage collection. In a test-only branch, retain objects in an unbounded collection, observe growth, then remove the retention. Document the difference between heap usage and total container memory."
  },

  "1|Maven Project Integration": {
    overview: "Apache Maven is a Java build and dependency-management tool. Its Project Object Model file, pom.xml, defines project coordinates, dependencies, plugins, and build settings. Maven resolves libraries, compiles source code, runs tests, packages artifacts, and executes lifecycle phases such as validate, compile, test, package, verify, and install.",
    purpose: "A Spring Boot application needs a repeatable build process so developers and CI servers create consistent artifacts. Maven manages framework dependencies, compiles Java code, runs tests, and packages an executable JAR. Jenkins can run the same Maven lifecycle and fail the pipeline when compilation or tests fail.",
    architecture: "The project root contains pom.xml. Application code lives under src/main/java and resources under src/main/resources. Tests live under src/test/java. Maven resolves dependencies from local and remote repositories, then invokes plugins for compilation, testing, and packaging. The generated artifact is placed under target and can be published to an artifact repository.",
    workflow: [
      "Create the Maven project using the standard directory layout.",
      "Define project coordinates, Java release, dependencies, and plugins in pom.xml.",
      "Resolve required libraries from configured repositories.",
      "Compile application source code.",
      "Execute unit tests.",
      "Package the application as a JAR or WAR.",
      "Run verification checks and publish the versioned artifact."
    ],
    example: "Jenkins checks out payment-service and executes mvn clean verify. Maven resolves dependencies, compiles Java source, executes JUnit tests, and creates the application artifact. If a test fails, Maven returns a non-zero exit code and Jenkins marks the build as failed. If verification succeeds, the pipeline can publish the JAR and use it in a Docker build.",
    commands: [
      "mvn -version — verify Maven and Java versions.",
      "mvn validate — validate the project model.",
      "mvn dependency:tree — inspect direct and transitive dependencies.",
      "mvn clean compile — clean previous output and compile source.",
      "mvn test — execute unit tests.",
      "mvn clean verify — run the lifecycle through verification.",
      "mvn package — create the configured artifact.",
      "mvn help:effective-pom — inspect inherited and effective configuration."
    ],
    configuration: "Define groupId, artifactId, version, packaging, Java release, dependencies, and plugins in pom.xml. Use Spring Boot dependency management consistently. Pin important plugin versions. Keep repository credentials outside source control using Jenkins credentials or a secured settings.xml. Use Maven profiles carefully and never embed production secrets in the POM.",
    failures: [
      "Dependency resolution fails because a repository is unavailable or coordinates are incorrect.",
      "Transitive dependencies introduce incompatible library versions.",
      "Compilation fails because the configured Java release differs from the installed JDK.",
      "Tests fail because of incorrect configuration or unavailable test dependencies.",
      "Local builds succeed but Jenkins builds fail due to different Java or Maven versions.",
      "The generated JAR is not executable because the required packaging plugin is misconfigured.",
      "Repository authentication fails because credentials are missing or expired."
    ],
    recovery: [
      "Read the first meaningful Maven error instead of only the final BUILD FAILURE line.",
      "Run mvn -version on the developer machine and CI agent.",
      "Inspect mvn dependency:tree for unexpected or conflicting versions.",
      "Check repository URLs, network connectivity, proxy settings, and credentials.",
      "Inspect the effective POM to verify inherited properties and plugins.",
      "Run the failing test individually and inspect its configuration.",
      "Run mvn clean verify and confirm the artifact exists under target."
    ],
    bestPractices: [
      "Use consistent Java and Maven versions in local and CI environments.",
      "Pin important Maven plugin versions.",
      "Review transitive dependencies and remove unnecessary libraries.",
      "Use mvn clean verify as a CI validation step.",
      "Keep repository credentials in secure CI configuration.",
      "Publish versioned artifacts to a controlled repository.",
      "Scan dependencies for known vulnerabilities."
    ],
    exercise: "Create a Spring Boot payment-service Maven project with a valid pom.xml. Add Spring Web and test dependencies, create one REST controller and one JUnit test, then run mvn clean verify. Inspect the dependency tree and effective POM. Confirm the JAR is generated under target. Run the same build in Jenkins and compare Java version, Maven version, test result, and artifact output."
  },

  "1|Spring Boot Fundamentals": {
    overview: "Spring Boot is a Java framework that simplifies the creation of stand-alone, production-oriented Spring applications. It provides auto-configuration, starter dependencies, embedded web servers, externalized configuration, and production support. A Spring Boot application can start with a main method and run as an executable JAR without requiring a separately managed application server.",
    purpose: "A payment-service needs REST endpoints, dependency injection, database integration, validation, and health checks. Spring Boot provides these capabilities with less manual configuration. Its standard startup and packaging model also makes the application suitable for automated CI/CD pipelines and container deployment.",
    architecture: "The main class uses @SpringBootApplication, which combines configuration, component scanning, and auto-configuration behavior. Controllers receive HTTP requests, services implement business logic, repositories access data, and configuration classes define application beans. An embedded server such as Tomcat handles HTTP traffic.",
    workflow: [
      "Create a Spring Boot project with the required starter dependencies.",
      "Define a main class annotated with @SpringBootApplication.",
      "Create controller, service, and repository components.",
      "Configure application properties and external dependencies.",
      "Run the application locally and verify its health endpoint.",
      "Execute unit and integration tests.",
      "Package the application as an executable JAR for CI/CD."
    ],
    example: "A payment-service can expose POST /api/payments through a REST controller. The controller validates the request and calls PaymentService. Spring Boot creates and injects the service bean. The application starts using its embedded server and exposes health information through Spring Boot Actuator.",
    commands: [
      "mvn spring-boot:run — start the application using the Spring Boot Maven plugin.",
      "mvn clean package — build the executable artifact.",
      "java -jar target/payment-service.jar — run the packaged application.",
      "curl http://localhost:8080/actuator/health — inspect the configured health endpoint."
    ],
    configuration: "Use a supported Spring Boot release and compatible JDK. Add only the required starter dependencies in pom.xml. Configure server.port and application-specific settings in application.yml. Keep secrets and environment-specific endpoints outside source control. Enable Actuator endpoints selectively and protect operational endpoints in production.",
    failures: [
      "The application fails to start because required configuration is missing.",
      "A bean cannot be created because a required dependency is unavailable.",
      "The embedded server cannot bind because the configured port is already in use.",
      "Incompatible Spring Boot and Java versions cause build or runtime problems.",
      "The application starts but a required database or external service is unavailable."
    ],
    recovery: [
      "Inspect the first startup exception and identify the failing bean or configuration.",
      "Check the Java version and dependency compatibility.",
      "Verify server.port and check whether another process owns the port.",
      "Validate required environment variables and external service connectivity.",
      "Run tests and package the application again.",
      "Verify health endpoints and application logs after restart."
    ],
    bestPractices: [
      "Use supported Spring Boot and JDK versions.",
      "Keep controllers thin and business logic in services.",
      "Use constructor injection.",
      "Externalize environment-specific configuration.",
      "Expose only necessary Actuator endpoints.",
      "Write unit and integration tests.",
      "Build an executable artifact consistently in CI."
    ],
    exercise: "Create a Spring Boot application named payment-service. Add a REST controller with a health or payment endpoint, a service bean, and an application configuration file. Start it locally, call the endpoint using curl, run tests, and package the application as an executable JAR."
  },

  "1|Spring Boot Application Structure": {
    overview: "A Spring Boot application is commonly organized into a root application class and packages for controllers, services, repositories, domain models, DTOs, configuration, and exception handling. Spring component scanning discovers eligible beans under the application package. A clear structure keeps HTTP concerns, business rules, persistence, and configuration separate.",
    purpose: "As the payment service grows, a flat package containing every class becomes difficult to maintain. A layered structure helps developers locate defects, write focused tests, replace infrastructure components, and review changes. It also makes ownership and responsibilities clearer during production incidents.",
    architecture: "The controller layer handles HTTP input and output. The service layer enforces business rules. The repository layer communicates with persistence. DTOs define API request and response contracts. Domain models represent business data. Configuration classes create infrastructure beans, while exception handlers map application failures to API responses.",
    workflow: [
      "Choose a stable root package for the application.",
      "Place the @SpringBootApplication class near the root package.",
      "Create controller and DTO packages for API contracts.",
      "Create service classes for business operations.",
      "Create repository interfaces for persistence access.",
      "Add configuration and exception-handling packages where needed.",
      "Mirror the application package structure in test sources."
    ],
    example: "The payment API controller receives CreatePaymentRequest and calls PaymentService. The service validates the request and calls PaymentRepository. The repository saves the payment. The controller returns PaymentResponse rather than exposing the persistence entity directly. This separation allows database changes without unnecessarily changing the public API.",
    commands: [
      "mvn validate — validate the project build configuration.",
      "mvn test — run tests across the application packages.",
      "mvn package — package the application.",
      "jar tf target/payment-service.jar — inspect packaged classes and resources."
    ],
    configuration: "Keep the main application class in a root package so component scanning can discover child packages. Use explicit configuration for custom beans. Place application.yml under src/main/resources. Keep DTOs separate from database entities when the API contract should remain stable. Avoid creating circular dependencies between services.",
    failures: [
      "A controller or service is not discovered because it is outside the component scan.",
      "The main application class is placed in a package that excludes required components.",
      "A circular dependency prevents Spring from creating beans.",
      "Database entities are exposed directly and changes unexpectedly break API clients.",
      "Business rules are implemented inside controllers and become difficult to test."
    ],
    recovery: [
      "Inspect package declarations and the location of the main application class.",
      "Check component scanning and bean creation logs.",
      "Identify the dependency cycle and redesign responsibilities.",
      "Move business rules into service classes.",
      "Introduce request and response DTOs where API separation is needed.",
      "Run context-loading and controller tests after restructuring."
    ],
    bestPractices: [
      "Keep the main application class in a suitable root package.",
      "Separate API, business, persistence, and configuration responsibilities.",
      "Use DTOs to define external API contracts.",
      "Avoid circular dependencies.",
      "Keep controllers thin.",
      "Mirror application packages in tests.",
      "Use meaningful names and document important architectural boundaries."
    ],
    exercise: "Organize payment-service into controller, service, repository, dto, entity, config, and exception packages. Implement one create-payment request from controller to service. Add a DTO response and tests for the service. Confirm Spring discovers all required beans at startup."
  },

  "1|Dependency Injection": {
    overview: "Dependency Injection is a design technique in which an object receives the components it needs instead of creating them directly. Spring manages application objects as beans inside its application context. Constructor injection is the recommended approach for required dependencies because it makes dependencies explicit and supports straightforward unit testing.",
    purpose: "PaymentService may depend on PaymentRepository, PaymentProcessor, and a notification client. If it creates these dependencies manually, testing and replacement become difficult. Spring dependency injection manages their lifecycle and allows implementations to be configured or mocked without rewriting business logic.",
    architecture: "Spring scans components or processes configuration methods to create beans. The application context stores and manages these objects. When Spring creates a service bean, it resolves the constructor parameters and injects matching beans. Qualifiers or explicit configuration can select a particular implementation when multiple beans satisfy the same interface.",
    workflow: [
      "Define a component or configuration bean for each required dependency.",
      "Declare required dependencies as constructor parameters.",
      "Allow Spring to resolve and inject the matching beans.",
      "Use interfaces when an implementation boundary is useful.",
      "Use @Qualifier when multiple implementations need explicit selection.",
      "Start the application and verify bean creation.",
      "Use mocks or test configurations to isolate service tests."
    ],
    example: "PaymentService receives PaymentRepository and PaymentProcessor through its constructor. The service does not call new PaymentRepositoryImpl(). Spring provides the configured beans. In a unit test, a mock PaymentRepository can be passed directly to the service, allowing business behavior to be tested without a database.",
    commands: [
      "mvn test — execute dependency-injection and service tests.",
      "mvn spring-boot:run — start the Spring application context.",
      "mvn test -Dtest=PaymentServiceTest — run the focused service test."
    ],
    configuration: "Use @Service, @Repository, and @Component for appropriate application beans. Prefer constructor injection and final fields for required dependencies. Use @Configuration and @Bean for objects that require explicit construction. Use @Qualifier or @Primary when multiple implementations exist. Avoid field injection in application code because it hides dependencies and makes plain unit tests harder.",
    failures: [
      "NoSuchBeanDefinitionException occurs when Spring cannot find a required bean.",
      "NoUniqueBeanDefinitionException occurs when multiple beans match one dependency.",
      "A component is not discovered because package scanning excludes it.",
      "A circular dependency prevents bean initialization.",
      "An optional dependency is treated as required without appropriate handling."
    ],
    recovery: [
      "Read the bean creation error and identify the missing or ambiguous dependency.",
      "Confirm the class has the correct component annotation or configuration method.",
      "Check package scanning and application package placement.",
      "Use @Qualifier or @Primary when multiple valid implementations exist.",
      "Break circular dependencies by separating responsibilities.",
      "Add a focused application-context or service test."
    ],
    bestPractices: [
      "Prefer constructor injection for required dependencies.",
      "Depend on interfaces where a useful abstraction exists.",
      "Keep bean responsibilities focused.",
      "Use qualifiers explicitly when multiple implementations are expected.",
      "Avoid unnecessary global mutable state.",
      "Keep circular dependencies out of the application design.",
      "Test business services with mocks where infrastructure is not required."
    ],
    exercise: "Create a PaymentProcessor interface and a CardPaymentProcessor bean. Inject it into PaymentService using a constructor. Add a unit test that passes a mock processor into the service and verifies that the process method is called with the expected payment."
  },

  "1|REST API Development": {
    overview: "A REST API exposes application resources through HTTP methods and resource-oriented URLs. Spring Boot uses annotations such as @RestController, @RequestMapping, @GetMapping, and @PostMapping to map HTTP requests to Java methods. Request DTOs, validation, response DTOs, and appropriate HTTP status codes define a predictable API contract.",
    purpose: "The payment service needs endpoints to create payments, retrieve payment status, and expose operational health. REST APIs allow web applications, mobile clients, and other services to communicate with the backend through standard HTTP requests. Consistent contracts make integration testing and deployment verification easier.",
    architecture: "A client sends an HTTP request to the embedded server. Spring MVC routes it to a controller method. The controller validates input and delegates business work to a service. The service interacts with repositories or external gateways. The result is converted into an HTTP response with a suitable status code and JSON body.",
    workflow: [
      "Define the resource and its URL structure.",
      "Choose HTTP methods according to the operation.",
      "Create request and response DTOs.",
      "Implement controller methods using Spring MVC annotations.",
      "Validate incoming data before business processing.",
      "Delegate business logic to a service.",
      "Return appropriate status codes and test the API contract."
    ],
    example: "POST /api/payments accepts a CreatePaymentRequest and asks PaymentService to create the payment. A successful creation can return HTTP 201 with a PaymentResponse. GET /api/payments/{id} retrieves the payment status. Invalid input returns HTTP 400, and a missing payment returns HTTP 404.",
    commands: [
      "mvn spring-boot:run — start the REST application.",
      "curl -i http://localhost:8080/api/payments/123 — test a GET endpoint.",
      "curl -i -X POST http://localhost:8080/api/payments -H 'Content-Type: application/json' -d '{\"amount\":100,\"currency\":\"INR\"}' — test payment creation.",
      "mvn test — run controller and service tests."
    ],
    configuration: "Use @RestController and a clear base @RequestMapping. Use @Valid with Jakarta validation annotations on request DTOs. Define consistent JSON response structures and centralized exception handling. Configure CORS only for trusted origins when browser clients require it. Apply authentication and authorization before exposing sensitive payment operations.",
    failures: [
      "HTTP 404 occurs because the route or request path is incorrect.",
      "HTTP 405 occurs when the client uses an unsupported HTTP method.",
      "HTTP 400 occurs because JSON cannot be parsed or validation fails.",
      "HTTP 415 occurs when the Content-Type is unsupported.",
      "HTTP 500 occurs because an unhandled application failure reaches the server.",
      "A slow endpoint occurs because of inefficient database access or a slow external dependency."
    ],
    recovery: [
      "Capture the exact URL, HTTP method, headers, request body, and response status.",
      "Check controller mappings and request DTO field names.",
      "Inspect validation errors and correct the request or validation rules.",
      "Trace server logs using the request correlation ID.",
      "Check database and external service latency for slow requests.",
      "Add or correct integration tests for the endpoint.",
      "Verify authentication, authorization, and error responses before release."
    ],
    bestPractices: [
      "Use resource-oriented URLs and correct HTTP methods.",
      "Validate input at the API boundary.",
      "Use DTOs instead of exposing persistence entities.",
      "Return meaningful HTTP status codes.",
      "Centralize exception-to-response mapping.",
      "Secure sensitive endpoints with authentication and authorization.",
      "Document API contracts and test backward compatibility."
    ],
    exercise: "Implement POST /api/payments and GET /api/payments/{id}. Create request and response DTOs, validate the amount and currency, and return HTTP 201 after successful creation. Test valid input, invalid input, missing payment IDs, and unexpected service failures using curl or an API client."
  },

  "1|Application Properties": {
    overview: "Spring Boot externalizes application settings through application.properties or application.yml. These files configure ports, database connections, logging, feature settings, and framework behavior. Externalized configuration allows the same application artifact to run in different environments without rebuilding it for every environment.",
    purpose: "A payment service may use different database endpoints and logging levels in development, testing, and production. Configuration files and environment variables allow these differences to be supplied during deployment. This supports the twelve-stage pipeline because the artifact can be promoted while its runtime configuration changes safely.",
    architecture: "Spring Boot loads configuration from supported property sources such as packaged application files, profile-specific files, environment variables, system properties, and command-line arguments. Higher-precedence sources can override lower-precedence values. Application code can read settings using @ConfigurationProperties or @Value.",
    workflow: [
      "Identify settings that should vary between environments.",
      "Create application.yml or application.properties under src/main/resources.",
      "Define safe defaults for local development.",
      "Bind related settings to a typed configuration class when appropriate.",
      "Supply production values through environment variables or a managed configuration system.",
      "Validate required settings during application startup.",
      "Test configuration precedence and behavior in each environment."
    ],
    example: "The payment service uses server.port for its HTTP listener and spring.datasource.url for its database connection. Local development may use a local database, while production receives its database endpoint from deployment configuration. The same JAR is used in both environments, but the runtime settings differ.",
    commands: [
      "mvn spring-boot:run — start with the default configuration.",
      "java -jar target/payment-service.jar --server.port=9090 — override the server port at startup.",
      "Get-ChildItem Env: — inspect environment variables in PowerShell.",
      "printenv — inspect environment variables on Linux."
    ],
    configuration: "Use application.yml for readable structured configuration. Use environment variables for deployment-specific values. Spring Boot supports relaxed binding, allowing environment variable names to map to configuration properties. Never commit production passwords, private keys, or API tokens. Validate required values and protect configuration endpoints from unauthorized access.",
    failures: [
      "The application cannot connect to the database because the URL is incorrect.",
      "A required environment variable is missing.",
      "A property is misspelled and the application silently uses an unintended default.",
      "YAML indentation errors cause configuration parsing failures.",
      "A production secret is accidentally committed to source control.",
      "An environment variable has higher precedence than expected and overrides a correct file value."
    ],
    recovery: [
      "Inspect the startup log for configuration binding and connection errors.",
      "Check the active property source and environment variables.",
      "Validate YAML indentation and property names.",
      "Compare required settings with the deployment manifest or secret reference.",
      "Correct the value through the approved configuration mechanism.",
      "Restart or roll out the application and verify its health.",
      "Rotate any secret that was exposed."
    ],
    bestPractices: [
      "Keep one portable application artifact across environments.",
      "Externalize environment-specific settings.",
      "Use typed @ConfigurationProperties for related settings.",
      "Validate required configuration at startup.",
      "Keep secrets in a managed secret store.",
      "Avoid logging credentials or sensitive configuration.",
      "Document configuration keys and safe defaults."
    ],
    exercise: "Create application.yml with server.port and a payment-service setting. Bind the custom setting using @ConfigurationProperties. Start the application with a command-line override and with an environment variable. Verify which value is active and confirm that no production credential is stored in the repository."
  },

  "1|Profiles and Environment Configuration": {
    overview: "Spring profiles allow an application to activate environment-specific beans and configuration. Common profiles include local, dev, test, staging, and prod. Profile-specific files such as application-dev.yml can override general defaults. The active profile can be selected through an environment variable, JVM system property, or command-line argument.",
    purpose: "The payment service needs different database endpoints, external gateway URLs, and logging levels in different environments. Profiles help separate these settings while allowing one build artifact to move through development, testing, staging, and production. Correct profile handling prevents accidental use of development services in production.",
    architecture: "Spring Boot loads the common application configuration and then applies active profile-specific configuration. Beans can be restricted using @Profile. Deployment systems supply the active profile and environment values. The application context creates only the beans appropriate for the selected environment.",
    workflow: [
      "Define common settings in application.yml.",
      "Create profile-specific files such as application-dev.yml and application-prod.yml.",
      "Use @Profile only when a bean truly differs by environment.",
      "Select the profile through deployment configuration.",
      "Supply endpoint and credential values from secure external sources.",
      "Verify the active profile in controlled startup logs.",
      "Run environment-specific integration tests before promotion."
    ],
    example: "The dev profile connects to a development database and a sandbox payment gateway. The production profile connects to the approved production services using credentials injected securely by the deployment platform. Jenkins builds the JAR once, and the deployment environment activates the correct profile without modifying the artifact.",
    commands: [
      "java -jar target/payment-service.jar --spring.profiles.active=dev — start with the dev profile.",
      "java -Dspring.profiles.active=prod -jar target/payment-service.jar — start with a JVM-selected profile.",
      "Get-ChildItem Env:SPRING_PROFILES_ACTIVE — inspect the active-profile environment variable in PowerShell.",
      "printenv SPRING_PROFILES_ACTIVE — inspect it on Linux."
    ],
    configuration: "Use application-dev.yml and application-prod.yml for non-secret environment-specific settings. Set SPRING_PROFILES_ACTIVE through the deployment environment. Inject credentials through a secret manager or protected Kubernetes Secret. Avoid putting passwords in profile files. Define safe defaults and ensure production cannot accidentally activate a local-only configuration.",
    failures: [
      "The wrong profile is active and the service connects to the wrong environment.",
      "A profile-specific file has an incorrect name or location.",
      "A production configuration value is missing.",
      "A local database URL is accidentally used in production.",
      "Conflicting profile activation settings produce unexpected behavior.",
      "A profile-specific bean is unavailable in the selected environment."
    ],
    recovery: [
      "Inspect startup logs and confirm the active profile.",
      "Check SPRING_PROFILES_ACTIVE and command-line or JVM overrides.",
      "Verify profile file names and their location under resources.",
      "Compare required settings with the deployment environment.",
      "Check whether the required profile-specific bean is registered.",
      "Correct the deployment configuration and redeploy safely.",
      "Test the application against the intended environment before accepting traffic."
    ],
    bestPractices: [
      "Use profiles for environment-specific behavior, not as a replacement for all configuration management.",
      "Build the application artifact once and promote it between environments.",
      "Keep secrets outside profile files.",
      "Set the active profile explicitly in deployment configuration.",
      "Prevent production deployments from using local endpoints.",
      "Verify active profiles during release checks.",
      "Test configuration changes in staging before production."
    ],
    exercise: "Create dev and prod profiles for payment-service. Use different non-secret gateway URLs and database names. Activate each profile through SPRING_PROFILES_ACTIVE. Verify the selected configuration at startup. Keep passwords out of the files and document how the production deployment supplies its secrets."
  },

  "1|Logging and Actuator": {
    overview: "Logging records application events, warnings, and failures so teams can understand application behavior. Spring Boot commonly uses SLF4J with Logback as its logging implementation. Spring Boot Actuator provides operational endpoints for health, metrics, and application information. Together they help development and operations teams investigate incidents and verify service health.",
    purpose: "A payment service must provide enough diagnostic information to investigate failed transactions, dependency outages, and slow requests. Actuator health information can be used by Kubernetes probes, while structured logs help engineers correlate events across application instances. Operational endpoints must be exposed and protected carefully.",
    architecture: "Application classes write log events through a logging facade. The configured logging implementation formats and sends them to console or files. Container platforms commonly collect standard output and forward it to a centralized logging system. Actuator exposes selected endpoints such as health and metrics through HTTP or another configured management interface.",
    workflow: [
      "Choose log levels for application and framework packages.",
      "Use a logger in controllers and services rather than printing to standard output.",
      "Include useful request or correlation identifiers.",
      "Add Spring Boot Actuator and configure the required endpoints.",
      "Configure health checks for the application and important dependencies.",
      "Connect container logs and metrics to the monitoring platform.",
      "Verify that operational endpoints are protected and only required endpoints are exposed."
    ],
    example: "When a payment gateway request times out, PaymentService records a warning or error with the payment reference and correlation ID, excluding card data and credentials. Kubernetes checks the application's health endpoint. Prometheus can scrape configured metrics, while the operations team searches centralized logs to investigate the incident.",
    commands: [
      "mvn spring-boot:run — start the application and observe console logs.",
      "curl http://localhost:8080/actuator/health — inspect the health endpoint when enabled.",
      "curl http://localhost:8080/actuator/metrics — inspect available metrics when exposed.",
      "kubectl logs <pod-name> -n <namespace> — inspect container logs.",
      "kubectl logs <pod-name> -n <namespace> --previous — inspect logs from the previous container instance."
    ],
    configuration: "Add the Spring Boot Actuator dependency. Configure management.endpoints.web.exposure.include with only the endpoints required by the environment. Set logging levels using logging.level properties. Use structured logging and include trace or correlation identifiers. Protect management endpoints through network restrictions and authentication. Never expose env, configprops, or other sensitive diagnostic endpoints publicly without a reviewed security design.",
    failures: [
      "The health endpoint returns 404 because Actuator is missing or the endpoint is not exposed.",
      "Kubernetes marks a healthy application unhealthy because the probe path or timing is incorrect.",
      "Logs contain too little context to identify the failing request.",
      "Sensitive data appears in application logs.",
      "Log volume grows excessively and consumes container storage.",
      "A management endpoint is publicly accessible without sufficient protection."
    ],
    recovery: [
      "Check that the Actuator dependency is included in the packaged application.",
      "Verify endpoint exposure settings and management port configuration.",
      "Compare Kubernetes probe paths and timing with the actual application endpoints.",
      "Inspect recent logs using the pod name and correlation ID.",
      "Remove sensitive fields from log statements and rotate exposed credentials if necessary.",
      "Configure log retention and centralized collection.",
      "Restrict management endpoint access and verify the final security configuration."
    ],
    bestPractices: [
      "Use appropriate log levels and structured logging.",
      "Include correlation IDs for request tracing.",
      "Never log passwords, tokens, or payment card data.",
      "Expose only required Actuator endpoints.",
      "Protect management endpoints from public access.",
      "Configure health probes based on real application readiness.",
      "Centralize logs and define retention and alerting policies."
    ],
    exercise: "Add Spring Boot Actuator to payment-service. Enable the health endpoint and one required metric endpoint. Add structured logging to the payment service using a correlation ID. Start the application, call the health endpoint, inspect the logs, and verify that sensitive request data is not logged."
  },

  "1|Production Hands-on Lab": {
    overview: "This hands-on lab combines the Stage 01 skills into a small production-style Java and Spring Boot payment service. The goal is to create a maintainable Maven project, implement REST endpoints, apply object-oriented design, validate requests, handle exceptions, configure runtime profiles, and expose health information. The output becomes the application source used by later CI/CD stages.",
    purpose: "A pipeline cannot build and deploy an application that has not been implemented and validated. This lab creates the source-code baseline for the next stages: Git review, Jenkins pipeline execution, Maven build, automated tests, quality analysis, security scanning, container creation, and Kubernetes deployment.",
    architecture: "The developer works in a Maven repository. The Spring Boot application contains a REST controller, payment service, repository boundary, DTOs, domain model, exception handler, and configuration. JUnit tests validate business behavior. Application settings are externalized. Actuator exposes the health endpoint. Git stores the reviewed source and build configuration.",
    workflow: [
      "Create a Maven Spring Boot project named payment-service.",
      "Create the application package and the controller, service, model, DTO, repository, and exception packages.",
      "Implement a Payment model and a service that validates payment requests.",
      "Create REST endpoints for payment creation and payment retrieval.",
      "Add centralized exception handling and input validation.",
      "Add unit tests for valid requests, invalid amounts, and missing payments.",
      "Create dev and prod configuration profiles without committing secrets.",
      "Enable a protected Actuator health endpoint.",
      "Run mvn clean verify and inspect the generated JAR.",
      "Commit the completed application source for the next pipeline stage."
    ],
    example: "A developer implements POST /api/payments and GET /api/payments/{id}. A valid request creates a payment and returns HTTP 201. An invalid amount returns HTTP 400 with a safe error code. The application starts using the selected profile and exposes its health endpoint. Maven verification passes before the source is submitted for review.",
    commands: [
      "mvn -version — verify the build toolchain.",
      "mvn clean verify — compile, test, and verify the application.",
      "mvn spring-boot:run — start the service locally.",
      "java -jar target/payment-service.jar — run the packaged artifact.",
      "curl -i http://localhost:8080/actuator/health — verify health when configured.",
      "curl -i -X POST http://localhost:8080/api/payments -H 'Content-Type: application/json' -d '{\"amount\":100,\"currency\":\"INR\"}' — test payment creation."
    ],
    configuration: "Use pom.xml to manage Java and Spring Boot dependencies. Keep application.yml for common settings and profile-specific files for non-secret differences. Use environment variables or a secret manager for credentials. Configure logging and Actuator deliberately. Add .gitignore entries for target, local IDE files, and local-only secrets. Document the JDK version and build command.",
    failures: [
      "The application does not compile because of Java syntax or dependency problems.",
      "Spring cannot start because a required bean or property is missing.",
      "REST endpoints return incorrect status codes or response bodies.",
      "Validation does not reject invalid payment input.",
      "Unit tests fail or are not discovered by Maven.",
      "The application starts locally but fails with a different profile.",
      "The health endpoint is missing or exposed insecurely.",
      "The packaged JAR is missing required classes or resources."
    ],
    recovery: [
      "Run mvn clean verify and fix the first meaningful compilation or test failure.",
      "Inspect Spring startup logs for bean creation and configuration errors.",
      "Test each API endpoint with valid and invalid requests.",
      "Check exception mappings and validation annotations.",
      "Confirm Maven discovers and executes the expected tests.",
      "Run the packaged JAR with the intended profile and environment values.",
      "Verify Actuator access controls and health response.",
      "Review the final Git diff and ensure no secrets or generated artifacts are committed."
    ],
    bestPractices: [
      "Keep business logic separate from controller and persistence concerns.",
      "Use constructor injection and validated DTOs.",
      "Write meaningful unit and integration tests.",
      "Use consistent JDK and Maven versions.",
      "Externalize environment configuration and protect secrets.",
      "Use safe error responses and structured logs.",
      "Expose only necessary operational endpoints.",
      "Run the complete build and review changes before submitting a pull request."
    ],
    exercise: "Complete the payment-service implementation from project creation through verification. Demonstrate a successful payment request, an invalid request, and a missing payment response. Show the Maven test results, the generated JAR, the active Spring profile, and the Actuator health response. Review the Git diff and confirm the repository contains no production secrets. The final deliverable is the source repository ready for Stage 02 pull-request review."
  }
};