export type CicdLearningSection = {
  heading: string;
  explanation: string;
  practicalExample: string;
  keyPoints: string[];
  commands?: string[];
  configuration?: string;
  exercise: string;
};

export type CicdTopicSections = {
  topic: string;
  sections: CicdLearningSection[];
};

export const stageOneJavaSections: Record<string, CicdTopicSections> = {

  "Java Fundamentals": {
    topic: "Java Fundamentals",
    sections: [
      {
        heading: "What Java Is and How It Executes",
        explanation: "Java is a strongly typed, object-oriented programming language used to build backend services, enterprise applications, APIs and cloud-native systems. Java source code is written in .java files and compiled by the Java compiler into bytecode stored in .class files. The Java Virtual Machine executes this bytecode, allowing the same compiled application to run on compatible operating systems and processor architectures.",
        practicalExample: "A payment application contains Java classes for accepting payments, validating amounts and communicating with a payment gateway. Developers compile these classes and package them into a JAR that can run on a developer laptop, Jenkins agent or production server with a compatible Java runtime.",
        keyPoints: [
          "JDK provides development tools, including the Java compiler.",
          "JRE represents the runtime components needed to execute Java applications.",
          "JVM loads and executes Java bytecode.",
          "Java source files normally use the .java extension.",
          "Compiled Java bytecode is stored in .class files.",
          "A JAR packages compiled classes and application resources."
        ],
        commands: [
          "java -version",
          "javac -version",
          "javac HelloWorld.java",
          "java HelloWorld",
          "jar --version"
        ],
        exercise: "Create a HelloWorld.java file, compile it with javac, execute it with java and inspect the generated class file. Record the JDK version because the same compatible Java version must be configured in the CI pipeline."
      },
      {
        heading: "Java Syntax, Variables and Data Types",
        explanation: "Java syntax defines how classes, statements, expressions and methods must be written. Variables store values and must have declared types. Primitive types include int, long, double, float, boolean, char, byte and short. Reference types represent objects such as String, arrays and user-defined classes. Choosing appropriate types helps prevent invalid calculations and unexpected data conversions.",
        practicalExample: "A payment service can store a transaction count in an int, a payment identifier in a String and an approval flag in a boolean. Monetary values should normally use BigDecimal rather than double because binary floating-point representation can introduce rounding errors in financial calculations.",
        keyPoints: [
          "Java is statically typed.",
          "Local variables must be initialized before use.",
          "String is an object reference type, not a primitive type.",
          "Use meaningful variable names that describe business meaning.",
          "Use BigDecimal for precise financial calculations.",
          "Use final when a variable should not be reassigned."
        ],
        commands: [
          "javac PaymentCalculator.java",
          "java PaymentCalculator"
        ],
        exercise: "Create a Payment record or class with paymentId, amount and approved fields. Use appropriate data types and validate that the amount is positive before accepting the payment."
      },
      {
        heading: "Methods, Parameters and Return Values",
        explanation: "A method is a named block of code that performs a specific operation. Methods can accept parameters, execute statements and return a result. A void method does not return a value. Method signatures include the method name and parameter types. Breaking application behavior into focused methods makes code easier to test, reuse and maintain.",
        practicalExample: "A PaymentService can expose validatePayment(BigDecimal amount), calculateFee(BigDecimal amount) and submitPayment(Payment payment). Each method has one clear responsibility. Unit tests can validate the fee calculation independently from external payment-gateway communication.",
        keyPoints: [
          "Parameters provide input to a method.",
          "Return types define the result produced by a method.",
          "void means that the method does not return a value.",
          "Method overloading uses the same method name with different parameter lists.",
          "Keep methods focused on one responsibility.",
          "Validate method inputs at application boundaries."
        ],
        exercise: "Write a calculateFee method that accepts a BigDecimal payment amount and returns a fee. Add tests for zero, negative and valid amounts."
      },
      {
        heading: "Compilation, Execution and the Classpath",
        explanation: "The Java compiler checks source code and generates bytecode. During execution, the JVM locates required classes through class-loading mechanisms. The classpath identifies directories and JAR files containing application classes and dependencies. A classpath problem can cause ClassNotFoundException or NoClassDefFoundError even when the source code compiled successfully.",
        practicalExample: "A payment service may compile successfully in a Maven build but fail at startup if a required runtime dependency is missing from the packaged artifact. The build must include the dependencies needed by the application and the runtime environment must use the correct artifact.",
        keyPoints: [
          "Compilation errors must be corrected before execution.",
          "The JVM executes compiled bytecode.",
          "Classpath entries can contain directories and JAR files.",
          "Runtime dependencies must be available when the application starts.",
          "Compilation success does not guarantee application startup success."
        ],
        commands: [
          "javac -d out src\\PaymentCalculator.java",
          "java -cp out PaymentCalculator",
          "java -cp \"out;lib\\*\" PaymentCalculator"
        ],
        exercise: "Compile a Java class into an output directory and run it using an explicit classpath. Add a dependency JAR and verify that the application can locate its required classes."
      },
      {
        heading: "Java in a CI/CD Pipeline",
        explanation: "Java applications move through source control, automated compilation, testing, packaging, artifact storage and deployment. A CI pipeline should use a known JDK version and repeatable build configuration. The generated artifact should be traceable to a source commit and should be tested before it is promoted to later environments.",
        practicalExample: "When a developer pushes a payment-service change to GitHub, Jenkins checks out the commit, configures the required JDK, runs Maven validation and tests, packages the application and archives the resulting JAR. A failed compilation or test must prevent the pipeline from publishing an unverified release.",
        keyPoints: [
          "Pin and document the Java version used by the project.",
          "Compile and test code automatically after changes.",
          "Keep build configuration in source control.",
          "Publish identifiable build artifacts.",
          "Do not store passwords or API tokens in source code.",
          "Use the same supported Java release across CI and runtime environments."
        ],
        exercise: "Create a small Java project, commit it to Git and configure a Jenkins build to compile and test it. Confirm that the build fails when a compilation error is deliberately introduced."
      }
    ]
  },

  "Java Project Structure": {
    topic: "Java Project Structure",
    sections: [
      {
        heading: "Standard Maven Directory Layout",
        explanation: "A standard Java Maven project separates production source code, test source code, resources and generated output. Application Java classes normally live under src/main/java. Runtime resources such as properties and YAML files live under src/main/resources. Test classes belong under src/test/java and test resources belong under src/test/resources. Maven writes generated build output under target.",
        practicalExample: "A payment-service repository can place PaymentController under src/main/java/com/devmavox/payment/controller and PaymentServiceTest under the matching test package. Maven automatically discovers conventional source and test directories without custom configuration.",
        keyPoints: [
          "src/main/java contains production Java source.",
          "src/main/resources contains runtime resources.",
          "src/test/java contains automated test classes.",
          "src/test/resources contains test data and fixtures.",
          "target contains generated build output.",
          "pom.xml is normally stored at the project root."
        ],
        commands: [
          "mvn validate",
          "mvn test",
          "mvn package",
          "mvn clean"
        ],
        exercise: "Create a Maven project with production and test directories. Add one Java class and one corresponding test, run mvn test and inspect the target directory."
      },
      {
        heading: "Packages and Namespace Organization",
        explanation: "Java packages group related classes and create namespaces that help prevent class-name conflicts. A package declaration normally corresponds to a directory path beneath the source root. A layered backend application can separate controllers, services, repositories, domain models, DTOs and configuration classes into focused packages.",
        practicalExample: "A payment service can use com.devmavox.payment as its root package. HTTP request handling belongs in controller, business rules in service, persistence logic in repository and payment domain objects in model. This separation makes ownership and dependencies easier to understand.",
        keyPoints: [
          "Package names are commonly written in lowercase.",
          "The package declaration must match the intended namespace.",
          "Avoid placing every class in one large package.",
          "Keep HTTP concerns separate from business logic.",
          "Use clear package boundaries that reflect application responsibilities."
        ],
        exercise: "Create controller, service, repository and model packages for a payment application. Place one class in each package and verify imports and compilation."
      },
      {
        heading: "Application Layers and Responsibilities",
        explanation: "A layered application separates request handling, business rules, persistence and external integrations. Controllers translate HTTP requests into application calls. Services implement business operations. Repositories access stored data. Domain classes represent business concepts. DTOs define data transferred across API boundaries.",
        practicalExample: "PaymentController receives a payment request and calls PaymentService. PaymentService validates the amount and invokes PaymentRepository to store the transaction. The controller returns an appropriate response DTO rather than exposing internal database entities directly.",
        keyPoints: [
          "Controllers should not contain complex business rules.",
          "Services coordinate business operations.",
          "Repositories isolate persistence details.",
          "DTOs define external request and response contracts.",
          "Domain models represent application concepts.",
          "Avoid circular dependencies between layers."
        ],
        exercise: "Build a small layered payment application with a controller, service, repository interface, domain model and request DTO. Keep validation and business rules in the service layer."
      },
      {
        heading: "Build Files, Resources and Generated Artifacts",
        explanation: "The project root contains build configuration and supporting files. Maven uses pom.xml to describe project identity, dependencies, plugins and build settings. Resources are copied into the application output according to Maven conventions. Generated classes, reports and packaged artifacts are placed under target and can be recreated by running the build.",
        practicalExample: "A Jenkins agent checks out the payment-service repository and runs mvn clean package. Maven reads pom.xml, compiles source code, copies resources, executes configured tests and creates a JAR in target. Jenkins can archive that JAR as a build artifact.",
        keyPoints: [
          "Keep pom.xml in the project root.",
          "Store application configuration under src/main/resources.",
          "Do not manually edit generated class files.",
          "Normally exclude target from Git.",
          "Archive build artifacts from the CI workspace.",
          "Keep build scripts and configuration reviewable."
        ],
        commands: [
          "mvn help:effective-pom",
          "mvn clean",
          "mvn package",
          "tree /F"
        ],
        exercise: "Inspect a Maven project tree, identify source and resource folders, package the application and locate the generated JAR under target."
      },
      {
        heading: "Repository Hygiene and Project Readiness",
        explanation: "A maintainable Java repository contains source code, tests, build configuration, documentation and carefully selected supporting files. Generated output, local IDE state, temporary logs and secrets should not be committed. A .gitignore file prevents common generated and local files from entering version control.",
        practicalExample: "Before a payment-service change is merged, the developer checks that target, local environment files and private credentials are excluded. Jenkins then builds from the committed source rather than depending on files left on a developer's workstation.",
        keyPoints: [
          "Commit source code and build configuration.",
          "Exclude generated output such as target.",
          "Never commit private keys or production passwords.",
          "Document how to build and test the project.",
          "Use code review before merging changes.",
          "Ensure a clean checkout can reproduce the build."
        ],
        exercise: "Create a .gitignore for a Maven Java project. Commit the source and pom.xml, exclude target and verify that a fresh checkout can still run mvn clean verify."
      }
    ]
  },

  "Object-Oriented Programming": {
    topic: "Object-Oriented Programming",
    sections: [
      {
        heading: "Classes, Objects and Constructors",
        explanation: "A class defines the fields and methods that describe a type of object. An object is a runtime instance of a class. Constructors initialize new objects and can enforce required values when an object is created. Java applications use classes to represent business entities and application components.",
        practicalExample: "A Payment class can represent one transaction using paymentId, amount and status fields. Its constructor can require a valid payment identifier and amount so that invalid objects are not created accidentally.",
        keyPoints: [
          "A class defines structure and behavior.",
          "An object is an instance of a class.",
          "Constructors initialize object state.",
          "Constructors do not declare a return type.",
          "Use constructors to enforce required object data."
        ],
        exercise: "Create a Payment class with fields, a constructor and methods to approve or reject a payment. Create multiple objects and verify that each object maintains independent state."
      },
      {
        heading: "Encapsulation and Access Modifiers",
        explanation: "Encapsulation protects an object's internal state and exposes controlled operations through methods. Java access modifiers include private, protected, public and package-private access. Keeping fields private prevents unrelated classes from changing important values without validation.",
        practicalExample: "A payment amount should not be changed directly after a transaction is approved. A Payment class can keep amount private and expose a controlled operation that validates whether an update is allowed.",
        keyPoints: [
          "Use private fields for internal state.",
          "Expose only necessary public methods.",
          "Validate values before changing object state.",
          "Avoid generating setters for every field automatically.",
          "Keep invariants valid throughout the object's lifecycle."
        ],
        exercise: "Make Payment fields private. Add methods that reject negative amounts and prevent changing the amount after approval."
      },
      {
        heading: "Inheritance and Composition",
        explanation: "Inheritance allows a class to extend another class and reuse or specialize its behavior. Composition builds a class using other objects as collaborators. Composition is often preferred when a component needs another capability without creating a rigid parent-child relationship.",
        practicalExample: "A CardPayment and BankTransferPayment might share a PaymentMethod interface. A PaymentService can depend on that interface rather than inheriting from a large base class containing unrelated gateway behavior.",
        keyPoints: [
          "Java classes support single class inheritance.",
          "Interfaces allow multiple capability contracts.",
          "Composition delegates work to collaborating objects.",
          "Use inheritance only when a genuine subtype relationship exists.",
          "Prefer small interfaces over deep inheritance trees."
        ],
        exercise: "Create a PaymentMethod interface and implement CardPaymentMethod and BankTransferPaymentMethod. Use a PaymentService that accepts the interface."
      },
      {
        heading: "Polymorphism and Abstraction",
        explanation: "Polymorphism allows code to use a common parent type or interface while executing behavior from the actual implementation. Abstraction exposes essential operations while hiding implementation details. Interfaces and abstract classes help define stable contracts between application components.",
        practicalExample: "A payment processor can call paymentMethod.process(payment) without knowing whether the selected implementation uses a card gateway or bank transfer provider. Each implementation supplies its own processing behavior.",
        keyPoints: [
          "An interface defines a contract.",
          "Implementations provide concrete behavior.",
          "Runtime polymorphism selects the actual overridden method.",
          "Abstraction reduces dependency on implementation details.",
          "Program to interfaces where it improves flexibility."
        ],
        exercise: "Implement two payment providers behind a common interface. Write a service that processes both without checking concrete class names."
      },
      {
        heading: "SOLID Principles in Application Design",
        explanation: "SOLID describes five object-oriented design principles: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation and Dependency Inversion. These principles help keep classes focused, make implementations replaceable and reduce tight coupling. They are design guidelines rather than rules that require every small class to be split into many files.",
        practicalExample: "A PaymentService should coordinate payment processing rather than also formatting logs, sending email and directly managing database connections. Separate components can handle notifications, persistence and gateway communication.",
        keyPoints: [
          "Single Responsibility keeps a class focused.",
          "Open/Closed favors extension without unsafe modification.",
          "Liskov Substitution preserves expected subtype behavior.",
          "Interface Segregation avoids oversized interfaces.",
          "Dependency Inversion favors abstractions over concrete dependencies."
        ],
        exercise: "Review a payment class that validates requests, writes database records and sends notifications. Refactor it into focused collaborators and write unit tests for each responsibility."
      }
    ]
  },

  "Collections and Generics": {
    topic: "Collections and Generics",
    sections: [
      {
        heading: "List, Set and Map Interfaces",
        explanation: "The Java Collections Framework provides common interfaces for storing and processing groups of objects. List maintains an ordered sequence and permits duplicates. Set represents unique elements according to equality rules. Map stores key-value associations and is not a subtype of Collection.",
        practicalExample: "A payment batch can use a List to preserve processing order, a Set to track unique transaction identifiers and a Map to find a payment quickly by its paymentId.",
        keyPoints: [
          "List supports ordered elements and duplicates.",
          "Set prevents duplicate elements according to equals and hashCode.",
          "Map associates keys with values.",
          "Choose the collection based on access and ordering needs.",
          "Understand null-handling and ordering behavior of each implementation."
        ],
        exercise: "Create a list of payment records, a set of unique payment IDs and a map from payment ID to payment details. Verify duplicate handling and lookup behavior."
      },
      {
        heading: "ArrayList, LinkedList, HashSet and HashMap",
        explanation: "ArrayList is a resizable array suitable for frequent indexed access. LinkedList is a linked structure with different insertion and traversal characteristics. HashSet stores unique values using hashing. HashMap provides key-value lookup using hash-based buckets. Actual performance depends on workload, data size and correct equals and hashCode implementations.",
        practicalExample: "A payment service can use HashMap to locate a transaction by ID and ArrayList to preserve a batch of payments for sequential processing. A HashSet can prevent duplicate IDs while validating an incoming batch.",
        keyPoints: [
          "ArrayList is commonly suitable for general-purpose lists.",
          "HashMap supports efficient average-case key lookup.",
          "HashSet is useful for uniqueness checks.",
          "LinkedList is not automatically faster for every insertion.",
          "Do not rely on HashMap iteration order."
        ],
        exercise: "Benchmark or compare lookup and iteration behavior for a small payment dataset using ArrayList, HashSet and HashMap."
      },
      {
        heading: "Generics and Compile-Time Type Safety",
        explanation: "Generics allow classes, interfaces and methods to work with parameterized types. A List<Payment> can store Payment objects while preventing unrelated types from being added at compile time. Generics reduce unsafe casts and make APIs clearer.",
        practicalExample: "A payment repository can return Optional<Payment> instead of an untyped Object. A collection declared as List<Payment> tells the compiler and other developers exactly what values it contains.",
        keyPoints: [
          "Use parameterized types such as List<Payment>.",
          "Avoid raw collection types.",
          "Generics provide compile-time type checks.",
          "Generic methods can accept type parameters.",
          "Java generics use type erasure at runtime."
        ],
        exercise: "Create a generic Repository<T, ID> interface and implement a small in-memory PaymentRepository with typed methods."
      },
      {
        heading: "Equality, Hashing and Duplicate Detection",
        explanation: "Collections that rely on hashing use hashCode to locate candidate buckets and equals to determine logical equality. If two objects are equal according to equals, they must return the same hashCode. Incorrect implementations can cause duplicate detection and map lookup to behave unexpectedly.",
        practicalExample: "If two PaymentReference objects represent the same transaction ID, a HashSet should treat them as equal. Implementing equality using the stable transaction identifier allows reliable duplicate detection.",
        keyPoints: [
          "Override equals and hashCode consistently.",
          "Use stable fields for equality.",
          "Avoid mutating hash-based keys after insertion.",
          "Test duplicate behavior explicitly.",
          "Do not assume object identity means business equality."
        ],
        exercise: "Create a PaymentReference class whose equality is based on paymentId. Insert duplicate references into a HashSet and verify only one logical entry remains."
      },
      {
        heading: "Collection Processing and Stream Basics",
        explanation: "Java streams provide a declarative way to process collections through operations such as filter, map, sorted, distinct and collect. Intermediate operations are generally lazy, while terminal operations trigger processing. Streams should make data transformations clearer rather than hide complex side effects.",
        practicalExample: "A payment batch can filter approved transactions, convert them into reporting DTOs and collect the results. The processing logic should avoid modifying shared mutable state from stream operations.",
        keyPoints: [
          "filter selects matching elements.",
          "map transforms elements.",
          "sorted orders stream elements.",
          "collect gathers results into a collection.",
          "Avoid side effects inside stream pipelines.",
          "Use parallel streams only after measuring workload and thread-safety."
        ],
        exercise: "Given a list of payments, filter approved payments, calculate a report total and collect payment IDs. Add tests for empty lists and mixed statuses."
      }
    ]
  },

  "Exception Handling": {
    topic: "Exception Handling",
    sections: [
      {
        heading: "Errors, Exceptions and the Throwable Hierarchy",
        explanation: "Java represents exceptional conditions through the Throwable hierarchy. Error generally represents serious conditions that applications are not expected to handle routinely. Exception represents conditions that application code may need to handle. RuntimeException is an unchecked exception category commonly associated with programming errors or invalid runtime state.",
        practicalExample: "A payment request with an invalid amount should produce a controlled validation failure. A database connection outage should be reported as an operational failure and should not be silently treated as a successful payment.",
        keyPoints: [
          "Throwable is the root of Java's throwable hierarchy.",
          "Error and Exception are different categories.",
          "RuntimeException is unchecked.",
          "Do not catch Throwable for ordinary business logic.",
          "Preserve the original cause when wrapping exceptions."
        ],
        exercise: "Create a payment validation exception and distinguish it from a simulated infrastructure exception. Verify how each is reported to the caller."
      },
      {
        heading: "try, catch and finally",
        explanation: "A try block contains code that may throw an exception. Catch blocks handle selected exception types. A finally block executes during normal completion and exception propagation, subject to JVM termination conditions. Specific exceptions should be caught before broader exception types.",
        practicalExample: "A service calling an external payment provider can catch a documented timeout exception and translate it into a retryable application error. It should not catch every exception and return a misleading approved status.",
        keyPoints: [
          "Use try for operations that may fail.",
          "Catch the most specific useful exception type.",
          "Avoid empty catch blocks.",
          "Use finally for cleanup that must occur.",
          "Prefer try-with-resources for AutoCloseable resources."
        ],
        exercise: "Write a method that reads a file using try-with-resources. Handle a missing file separately and ensure the original failure is visible in logs."
      },
      {
        heading: "Checked and Unchecked Exceptions",
        explanation: "Checked exceptions must be caught or declared by the method signature. Unchecked exceptions extend RuntimeException and do not require declaration. Checked exceptions can represent recoverable external conditions, while unchecked exceptions are often used for invalid arguments or illegal application state. The choice should reflect the API contract.",
        practicalExample: "A file import operation may declare an IOException because callers can choose how to respond. A method receiving a negative payment amount may throw IllegalArgumentException because the input violates its contract.",
        keyPoints: [
          "Checked exceptions are enforced by the compiler.",
          "Unchecked exceptions do not require catch or throws declarations.",
          "Do not use exceptions as ordinary branching logic.",
          "Document exceptions that callers can reasonably handle.",
          "Translate low-level exceptions at appropriate application boundaries."
        ],
        exercise: "Implement one method that declares IOException and another that rejects invalid payment input with IllegalArgumentException. Write tests for both."
      },
      {
        heading: "Custom Exceptions and Business Error Contracts",
        explanation: "Custom exceptions express application-specific failure conditions. A business exception can identify a rejected payment, duplicate transaction or unavailable payment method. Exception names and messages should be meaningful, but sensitive information must not be exposed to external clients.",
        practicalExample: "A DuplicatePaymentException can represent an idempotency conflict. The REST layer can translate it into HTTP 409 Conflict while logging a correlation ID for investigation.",
        keyPoints: [
          "Create custom exceptions for meaningful domain failures.",
          "Use clear exception names.",
          "Keep internal stack traces out of public API responses.",
          "Preserve causes when translating lower-level failures.",
          "Define consistent error response structures."
        ],
        exercise: "Create DuplicatePaymentException and InvalidPaymentException. Map them to appropriate API error responses and test the returned status codes."
      },
      {
        heading: "Exception Handling in Production Services",
        explanation: "Production exception handling must distinguish validation failures, business rejections, dependency failures and unexpected application defects. Logs should preserve diagnostic context without leaking credentials or personal data. Retries should be limited to operations that are safe to retry and should use timeouts and backoff.",
        practicalExample: "If a payment gateway times out after receiving a request, the service may not know whether the payment succeeded. It should use an idempotency key and reconcile the transaction rather than blindly submitting a duplicate charge.",
        keyPoints: [
          "Classify failures before deciding recovery behavior.",
          "Use correlation IDs to connect logs across services.",
          "Do not expose stack traces to API consumers.",
          "Retry only when the operation is safe and retryable.",
          "Use idempotency for operations that may be repeated.",
          "Alert on unexpected error rates and dependency failures."
        ],
        exercise: "Simulate a payment gateway timeout. Record a correlation ID, preserve the exception cause, apply an idempotency key and verify that retrying does not create a duplicate payment."
      }
    ]
  },

  "JVM Architecture": {
    topic: "JVM Architecture",
    sections: [
      {
        heading: "JVM Role in Java Application Execution",
        explanation: "The JVM is the runtime engine that loads and executes Java bytecode. It provides class loading, bytecode verification, memory management, execution and runtime services. The JVM specification defines behavior while different JVM implementations provide platform-specific implementations.",
        practicalExample: "A Spring Boot payment-service JAR can run on a supported OpenJDK-based runtime. The application code does not directly manage operating-system process creation for every Java method; the JVM manages class execution and runtime services.",
        keyPoints: [
          "JVM executes bytecode.",
          "JVM is distinct from the Java language specification.",
          "Different JVM implementations can run compatible bytecode.",
          "Runtime options influence memory, diagnostics and execution.",
          "The JVM process must be monitored like any production process."
        ],
        exercise: "Run a Java application and inspect its process, Java version and JVM startup options."
      },
      {
        heading: "Class Loading and Bytecode Verification",
        explanation: "Class loaders locate and load class definitions when an application needs them. The JVM performs linking and initialization as part of class lifecycle processing. Bytecode verification checks important structural and safety properties before execution. Class-loading problems can appear when dependencies are missing or incompatible.",
        practicalExample: "A payment service may fail during startup if a required library is absent or two incompatible versions of a dependency are present. Inspecting the classpath and dependency tree helps identify the cause.",
        keyPoints: [
          "Class loading makes class definitions available to the JVM.",
          "Linking includes verification and preparation steps.",
          "Class initialization executes static initialization logic.",
          "ClassNotFoundException and NoClassDefFoundError have different causes.",
          "Dependency conflicts can cause linkage errors."
        ],
        commands: [
          "java -verbose:class -jar payment-service.jar",
          "mvn dependency:tree"
        ],
        exercise: "Inspect class-loading output for a small Java application and identify where one application dependency is loaded from."
      },
      {
        heading: "JVM Runtime Memory Areas",
        explanation: "The JVM defines runtime memory areas with different responsibilities. Each thread has its own JVM stack for frames and method execution. The heap stores objects and arrays. The method area holds class-level runtime structures, with implementation-specific details such as Metaspace in HotSpot. The program counter and native method stacks support execution.",
        practicalExample: "A payment service that creates many request objects uses heap memory for those objects. Each request-processing thread uses stack frames while invoking controller, service and repository methods.",
        keyPoints: [
          "Heap stores objects and arrays.",
          "Each thread has its own JVM stack.",
          "Stack frames contain method execution state.",
          "Metaspace stores class metadata in HotSpot JVMs.",
          "Memory-area failures require evidence before tuning."
        ],
        exercise: "Run a small application with a configured heap size and inspect JVM memory information using supported diagnostic tools."
      },
      {
        heading: "Execution Engine, Interpreter and JIT",
        explanation: "The JVM execution engine executes bytecode. An interpreter can execute bytecode instructions, while a Just-In-Time compiler compiles frequently executed code into native machine code. Runtime profiling and optimization help the JVM improve performance for hot code paths.",
        practicalExample: "A payment API may execute the same validation and calculation methods repeatedly. The JVM can optimize frequently executed methods after observing runtime behavior, so cold-start and warmed-up performance may differ.",
        keyPoints: [
          "The interpreter executes bytecode.",
          "JIT compiles selected code into native instructions.",
          "Runtime profiling informs optimization decisions.",
          "Warm-up behavior can affect benchmarks.",
          "Measure application performance under realistic load."
        ],
        exercise: "Run a repeatable Java workload, compare initial and warmed-up execution and explain why a single short benchmark may be misleading."
      },
      {
        heading: "JVM Diagnostics and Production Troubleshooting",
        explanation: "JVM diagnostics help investigate memory pressure, thread contention, CPU usage and unexpected termination. Thread dumps show thread states and stack traces. Heap dumps support memory-retention analysis. Garbage-collection logs show collection activity and pause behavior. Diagnostic evidence should be collected before changing JVM settings.",
        practicalExample: "If payment API latency increases, an engineer can inspect CPU utilization, thread dumps and garbage-collection logs to determine whether the issue is thread contention, excessive allocation or another dependency.",
        keyPoints: [
          "Collect thread dumps during the incident.",
          "Use heap dumps for memory-retention investigations.",
          "Enable appropriate garbage-collection logging.",
          "Correlate JVM metrics with application latency.",
          "Protect diagnostic files because they may contain sensitive data."
        ],
        commands: [
          "jcmd -l",
          "jcmd <PID> Thread.print",
          "jcmd <PID> GC.heap_info",
          "jstack <PID>"
        ],
        exercise: "Start a Java process, identify its PID, collect a thread dump and document how you would use the dump during a production incident."
      }
    ]
  },

  "Memory Management and Garbage Collection": {
    topic: "Memory Management and Garbage Collection",
    sections: [
      {
        heading: "Heap, Stack and Object Allocation",
        explanation: "Java objects and arrays are generally allocated on the heap, while each thread maintains a stack containing method frames and local execution state. The JVM manages allocation and object lifetime. A stack overflow is different from a heap exhaustion problem and requires a different investigation.",
        practicalExample: "A payment API creates request and response objects while processing transactions. If the service retains every request in a static collection, heap usage can continue growing even after requests finish.",
        keyPoints: [
          "Heap is shared by application threads.",
          "Each thread has its own stack.",
          "Local variables may hold references to heap objects.",
          "StackOverflowError often relates to excessive stack depth.",
          "OutOfMemoryError can have different underlying causes."
        ],
        exercise: "Create a small program that allocates objects and another that performs deep recursion. Observe the difference between heap and stack failures in a controlled environment."
      },
      {
        heading: "Object Reachability and Garbage Collection",
        explanation: "Garbage collection reclaims heap memory occupied by objects that are no longer reachable from garbage-collection roots. An object is not eligible for collection merely because one local variable stops referring to it; another live reference may still keep it reachable. Collection timing is controlled by the JVM and should not be assumed to be immediate.",
        practicalExample: "A payment report cache that retains old report objects indefinitely can prevent those objects from becoming unreachable. Removing expired entries or using a bounded cache can allow the JVM to reclaim memory.",
        keyPoints: [
          "GC reclaims unreachable objects.",
          "Live references keep objects reachable.",
          "Calling System.gc does not guarantee immediate collection.",
          "Object finalization should not be used for resource management.",
          "Use explicit resource closing for files and network connections."
        ],
        exercise: "Create and release references to objects in a test program. Observe heap behavior using JVM monitoring tools without assuming exact collection timing."
      },
      {
        heading: "Generational Garbage Collection Concepts",
        explanation: "Many JVM garbage collectors use generational ideas based on object lifetime. Objects that survive collections may be promoted into older memory regions. Collector implementations differ in region layout, pause behavior and tuning controls. Engineers should understand the selected collector rather than assume every JVM uses the same algorithm.",
        practicalExample: "A payment service may allocate many short-lived request objects and retain a smaller set of cache entries. GC behavior depends on allocation rate, object survival and the selected collector.",
        keyPoints: [
          "Young and old generation concepts describe object-lifetime patterns.",
          "Surviving objects may be promoted.",
          "Collector algorithms differ between JVM implementations.",
          "Allocation rate affects GC workload.",
          "Choose a collector based on measured service requirements."
        ],
        exercise: "Enable garbage-collection logging for a test service and identify collection events and pause durations."
      },
      {
        heading: "Memory Leaks and Retained Objects",
        explanation: "A Java memory leak occurs when an application unintentionally retains references to objects that are no longer useful. Garbage collection cannot reclaim objects that remain reachable. Common causes include unbounded caches, static collections, listeners that are never removed and thread-local values retained by long-lived threads.",
        practicalExample: "A payment service stores every processed transaction in an in-memory static list for debugging. As traffic grows, the list retains transaction objects and heap usage increases until the application experiences memory pressure.",
        keyPoints: [
          "A memory leak can occur in garbage-collected languages.",
          "Unbounded collections are a common retention risk.",
          "ThreadLocal values require careful lifecycle management.",
          "Heap dumps help identify dominant retained objects.",
          "Fix the retention path rather than only increasing heap size."
        ],
        exercise: "Build a controlled example that retains objects in a static collection. Inspect a heap dump and identify the collection retaining the objects."
      },
      {
        heading: "Heap Sizing, GC Logs and Incident Response",
        explanation: "JVM heap sizing controls the memory available for Java objects but must be considered alongside container limits and non-heap memory. GC logs provide evidence about collection frequency, pause duration and allocation pressure. In containers, the JVM must be configured with awareness of the memory limit to avoid the operating system terminating the process.",
        practicalExample: "An EKS payment-service pod has a memory limit of 1 GiB. Setting the Java heap to the full 1 GiB leaves no room for metaspace, thread stacks, direct buffers and native memory. The process can be terminated even when the configured heap has not reached its maximum.",
        keyPoints: [
          "Heap is only one part of process memory.",
          "Container memory limits include non-heap memory.",
          "Use measured evidence before changing heap settings.",
          "Monitor GC pause time and allocation behavior.",
          "Correlate JVM metrics with container memory and OOM events."
        ],
        commands: [
          "java -Xms256m -Xmx512m -jar payment-service.jar",
          "jcmd <PID> GC.heap_info",
          "jcmd <PID> VM.flags"
        ],
        exercise: "Run a Java service with a constrained heap in a test environment. Observe memory metrics and GC logs, then document a safe sizing approach for a container deployment."
      }
    ]
  },

  "Maven Project Integration": {
    topic: "Maven Project Integration",
    sections: [
      {
        heading: "Why Java Projects Use Maven",
        explanation: "Apache Maven is a build automation and dependency-management tool. It uses a declarative project model in pom.xml to describe project identity, dependencies, plugins and build behavior. Maven standardizes common build tasks so developers and CI agents can build projects consistently.",
        practicalExample: "A payment-service repository uses Maven to download Spring Boot dependencies, compile Java source, execute tests and package an executable JAR. Jenkins can run the same Maven goals used by developers.",
        keyPoints: [
          "Maven reads project configuration from pom.xml.",
          "Maven resolves dependencies from configured repositories.",
          "Plugins implement compilation, testing and packaging.",
          "Lifecycle phases provide a predictable build sequence.",
          "A repeatable build reduces workstation-specific behavior."
        ],
        commands: [
          "mvn -version",
          "mvn validate",
          "mvn test",
          "mvn package"
        ],
        exercise: "Create a Maven project and run validate, test and package. Identify which files Maven reads and which outputs it generates."
      },
      {
        heading: "Project Coordinates and Dependency Declaration",
        explanation: "Maven identifies an artifact using groupId, artifactId and version. Packaging identifies the artifact format, commonly jar or war. Dependencies declare external libraries needed by the project. Maven resolves transitive dependencies unless exclusions or dependency-management rules change the resolution.",
        practicalExample: "A payment service can use groupId com.devmavox, artifactId payment-service and version 1.0.0. It can declare Spring Boot web and validation dependencies so the required libraries are resolved during the build.",
        keyPoints: [
          "groupId identifies the organization or project namespace.",
          "artifactId identifies the module.",
          "version identifies the artifact release.",
          "packaging controls the primary artifact format.",
          "Dependency versions should be managed consistently."
        ],
        configuration: "A minimal Maven project declares modelVersion, groupId, artifactId and version. Dependencies are declared inside the dependencies element. For Spring Boot projects, use the supported parent or dependency-management approach for consistent dependency versions.",
        exercise: "Define Maven coordinates for a payment-service module and add a required application dependency. Run mvn dependency:tree to inspect resolved libraries."
      },
      {
        heading: "Maven Build Lifecycle and Common Goals",
        explanation: "Maven lifecycles define ordered build phases. The default lifecycle includes validate, compile, test, package, verify, install and deploy. Invoking a later phase runs preceding phases in order. Goals are plugin operations bound to phases or invoked directly.",
        practicalExample: "A Jenkins pipeline can run mvn clean verify to remove previous output, compile the application, execute tests and run verification checks before the artifact is promoted.",
        keyPoints: [
          "clean removes generated output from previous builds.",
          "compile compiles production source code.",
          "test executes unit tests.",
          "package creates the configured artifact.",
          "verify runs additional verification checks.",
          "install places the artifact in the local Maven repository."
        ],
        commands: [
          "mvn clean",
          "mvn compile",
          "mvn test",
          "mvn package",
          "mvn clean verify"
        ],
        exercise: "Run Maven lifecycle phases one at a time and inspect target after each phase. Record which outputs are generated."
      },
      {
        heading: "Maven Dependency Resolution and Repositories",
        explanation: "Maven resolves artifacts from the local repository and configured remote repositories. The local repository commonly caches downloaded dependencies under the user's home directory. Remote repositories may include Maven Central and organization-managed artifact repositories. Repository connectivity, credentials and version availability affect build reliability.",
        practicalExample: "A payment-service build downloads public Spring libraries from Maven Central and internal libraries from a company Nexus repository. Jenkins must have network access and authorized repository credentials.",
        keyPoints: [
          "The local repository caches resolved artifacts.",
          "Remote repositories provide shared dependencies.",
          "Nexus or Artifactory can host internal artifacts.",
          "Credentials must not be committed to source control.",
          "Dependency versions should be reproducible."
        ],
        commands: [
          "mvn dependency:tree",
          "mvn dependency:resolve",
          "mvn -U clean verify"
        ],
        exercise: "Inspect a project's dependency tree and identify direct and transitive dependencies. Configure a test repository mirror without exposing credentials."
      },
      {
        heading: "Maven Integration in Jenkins",
        explanation: "A CI agent needs a compatible JDK and Maven installation or a project Maven Wrapper. The pipeline should execute a repeatable Maven command, capture test reports and archive the generated artifact. Build failures must stop downstream publishing and deployment steps.",
        practicalExample: "A Jenkinsfile checks out the payment-service repository, runs ./mvnw clean verify and archives target/payment-service.jar only when verification succeeds.",
        keyPoints: [
          "Use Maven Wrapper to standardize Maven versions when appropriate.",
          "Configure the expected JDK on the build agent.",
          "Publish test reports for failure diagnosis.",
          "Archive artifacts only after successful verification.",
          "Avoid relying on untracked local files."
        ],
        commands: [
          "./mvnw -version",
          "./mvnw clean verify",
          "mvn -B clean verify"
        ],
        exercise: "Create a Jenkins stage that executes Maven verification, publishes test results and archives the generated JAR. Confirm that a failing test blocks artifact publication."
      }
    ]
  },

  "Spring Boot Fundamentals": {
    topic: "Spring Boot Fundamentals",
    sections: [
      {
        heading: "Spring Framework and Spring Boot",
        explanation: "The Spring Framework provides infrastructure for dependency injection, application configuration, web development and data access. Spring Boot builds on Spring by providing opinionated defaults, auto-configuration and starter dependencies. It reduces setup work while allowing teams to override configuration when necessary.",
        practicalExample: "A payment service can use Spring Boot to expose REST endpoints, validate requests, connect to a database and run as a standalone application without manually configuring every framework component.",
        keyPoints: [
          "Spring provides the underlying application framework.",
          "Spring Boot simplifies application setup.",
          "Starters group commonly used dependencies.",
          "Auto-configuration responds to classpath and configuration.",
          "Defaults can be overridden when required."
        ],
        exercise: "Create a Spring Boot project with the web starter and start the application. Verify that the application context starts successfully."
      },
      {
        heading: "Spring Boot Application Startup",
        explanation: "A Spring Boot application commonly starts through a main method that calls SpringApplication.run. During startup, Spring creates an application context, loads configuration, discovers components and initializes required beans. Startup failures often occur because of invalid configuration, missing dependencies or bean creation errors.",
        practicalExample: "When Jenkins launches the payment-service JAR in a test environment, Spring Boot initializes the application context and embedded server. If the configured database is unavailable and the application requires it during startup, the service may fail to become ready.",
        keyPoints: [
          "The main method starts the application.",
          "SpringApplication.run creates and refreshes the application context.",
          "Component scanning discovers eligible components.",
          "Bean creation errors can prevent startup.",
          "Read the first meaningful startup exception."
        ],
        commands: [
          "mvn spring-boot:run",
          "java -jar target/payment-service.jar"
        ],
        exercise: "Start a Spring Boot application and deliberately introduce a configuration error. Read the startup log and identify the failing component."
      },
      {
        heading: "Auto-Configuration and Starter Dependencies",
        explanation: "Spring Boot auto-configuration registers common infrastructure based on the libraries available on the classpath and application settings. Starter dependencies simplify dependency selection by bringing compatible groups of libraries. Auto-configuration should be understood and inspected when unexpected beans or behavior appear.",
        practicalExample: "Adding the Spring Boot web starter provides the libraries needed for common web application behavior. Spring Boot can configure an embedded server and request-processing infrastructure based on the classpath.",
        keyPoints: [
          "Starters simplify dependency selection.",
          "Auto-configuration is conditional.",
          "Classpath contents influence configuration.",
          "Application properties can customize defaults.",
          "Inspect condition evaluation when configuration is unexpected."
        ],
        commands: [
          "mvn dependency:tree",
          "java -jar target/payment-service.jar --debug"
        ],
        exercise: "Add a Spring Boot starter, inspect the resolved dependency tree and review auto-configuration condition output in a development environment."
      },
      {
        heading: "Embedded Server and Executable JAR",
        explanation: "Spring Boot applications can package an embedded web server with application code and dependencies. An executable JAR can be launched using the Java runtime. This packaging model simplifies deployment because the application does not require a separately installed application server for common web workloads.",
        practicalExample: "The payment-service is packaged as an executable JAR and deployed into a container image. The container starts the JAR using java -jar and exposes the configured HTTP port.",
        keyPoints: [
          "An executable JAR includes application runtime packaging.",
          "The embedded server handles HTTP requests.",
          "The Java runtime version must be compatible.",
          "Container configuration controls runtime settings.",
          "The application should expose health information."
        ],
        commands: [
          "mvn clean package",
          "java -jar target/payment-service.jar",
          "java -jar target/payment-service.jar --server.port=8081"
        ],
        exercise: "Package a Spring Boot application and run the JAR on a non-default port. Verify that the application responds on that port."
      },
      {
        heading: "Spring Boot Configuration and Operational Readiness",
        explanation: "Spring Boot supports externalized configuration and operational integrations. Environment variables, command-line arguments and configuration files can supply settings. Actuator can expose health and metrics endpoints when correctly configured. Production deployments should restrict sensitive endpoints and avoid exposing internal details publicly.",
        practicalExample: "The same payment-service JAR can run in test and production environments with different database URLs supplied externally. Kubernetes readiness and liveness probes can use appropriately configured health endpoints.",
        keyPoints: [
          "Keep environment-specific settings outside the artifact.",
          "Use environment variables or managed configuration.",
          "Never commit production secrets.",
          "Secure operational endpoints.",
          "Configure health checks for deployment platforms."
        ],
        exercise: "Run the same JAR with two different application ports using external configuration. Enable a restricted health endpoint and verify its response."
      }
    ]
  },

  "Spring Boot Application Structure": {
    topic: "Spring Boot Application Structure",
    sections: [
      {
        heading: "Main Application Class and Component Scanning",
        explanation: "The main Spring Boot application class commonly uses @SpringBootApplication. This annotation combines configuration, auto-configuration and component-scanning behavior. Component scanning discovers eligible components in the configured package hierarchy, so the root application package should be chosen carefully.",
        practicalExample: "Placing PaymentApplication under com.devmavox.payment allows Spring to discover controller, service and repository components in child packages such as com.devmavox.payment.service.",
        keyPoints: [
          "@SpringBootApplication is commonly placed on the main class.",
          "Component scanning discovers annotated components.",
          "Package placement affects component discovery.",
          "Avoid unnecessarily broad component scanning.",
          "Keep application packages under a clear root namespace."
        ],
        exercise: "Create a main application class and place one service in a child package. Verify that Spring discovers and injects the service."
      },
      {
        heading: "Controller, Service and Repository Packages",
        explanation: "Controllers handle transport concerns, services implement business use cases and repositories isolate persistence operations. This organization separates responsibilities and makes components easier to test. Small applications may use a simpler structure, but business logic should not become tightly coupled to HTTP or database details.",
        practicalExample: "PaymentController accepts a REST request, PaymentService validates and processes the transaction, and PaymentRepository stores the transaction record. The controller should not contain SQL statements or payment rules.",
        keyPoints: [
          "Controllers handle HTTP mapping and response translation.",
          "Services coordinate business operations.",
          "Repositories isolate data access.",
          "Keep business logic out of controllers.",
          "Use interfaces where they provide a meaningful boundary."
        ],
        exercise: "Build a payment endpoint using separate controller, service and repository components. Write a unit test for the service without starting the web server."
      },
      {
        heading: "Domain Models, DTOs and Validation",
        explanation: "Domain models represent application concepts and business state. Data Transfer Objects define the fields accepted or returned across API boundaries. Validation annotations can enforce request constraints before business processing. Separating DTOs from persistence entities avoids exposing internal storage structure as a public API contract.",
        practicalExample: "CreatePaymentRequest can contain amount and currency fields, while PaymentEntity contains database-specific identifiers and persistence fields. The service maps validated request data into the domain model.",
        keyPoints: [
          "DTOs define external data contracts.",
          "Domain models represent business concepts.",
          "Persistence entities represent storage mapping.",
          "Validate external input at system boundaries.",
          "Do not expose sensitive entity fields in API responses."
        ],
        exercise: "Create a request DTO with amount validation and a response DTO that excludes internal database fields. Test valid and invalid requests."
      },
      {
        heading: "Configuration and Exception Packages",
        explanation: "Configuration classes define application infrastructure and framework customization. Exception-handling components translate application failures into consistent responses. Keeping these responsibilities separate prevents configuration and error mapping from being scattered throughout the codebase.",
        practicalExample: "A PaymentConfiguration class can define a payment provider bean, while GlobalExceptionHandler uses @RestControllerAdvice to map validation and business exceptions into consistent API responses.",
        keyPoints: [
          "Use configuration classes for infrastructure setup.",
          "Keep configuration separate from business operations.",
          "Centralize REST exception translation where appropriate.",
          "Avoid returning internal exception details to clients.",
          "Test configuration and error mappings."
        ],
        exercise: "Create a configuration class and a global exception handler. Verify that a known business exception produces a consistent JSON error response."
      },
      {
        heading: "Testing and Maintainable Package Boundaries",
        explanation: "A maintainable Spring Boot project tests business logic independently and verifies integration boundaries separately. Unit tests can test service behavior with mocked collaborators. Web-layer tests can verify request mapping and response contracts. Integration tests can verify persistence or external infrastructure behavior.",
        practicalExample: "PaymentServiceTest verifies payment validation without a database. PaymentControllerTest verifies HTTP status and response fields. A separate integration test verifies repository behavior against a test database.",
        keyPoints: [
          "Test business rules independently.",
          "Use focused unit tests for service logic.",
          "Use web tests for HTTP contracts.",
          "Use integration tests for infrastructure boundaries.",
          "Keep test package structure aligned with production packages."
        ],
        exercise: "Create one service unit test and one controller test. Run them with Maven and inspect the generated test reports."
      }
    ]
  },

  "Dependency Injection": {
    topic: "Dependency Injection",
    sections: [
      {
        heading: "Dependency Injection and Inversion of Control",
        explanation: "Dependency Injection means an object receives the collaborators it needs instead of constructing them directly. Inversion of Control describes a broader design approach where a framework manages object creation and lifecycle. Spring's application context manages beans and supplies dependencies according to configuration.",
        practicalExample: "PaymentService receives PaymentRepository through its constructor. It does not create a database repository using new inside every business method. This allows tests to supply a fake or mock repository.",
        keyPoints: [
          "DI reduces direct object construction coupling.",
          "Spring manages registered beans.",
          "The application context coordinates dependencies.",
          "Dependencies should be explicit.",
          "DI improves testability when boundaries are well designed."
        ],
        exercise: "Create a PaymentService that receives a PaymentRepository dependency through its constructor. Test it using a fake repository implementation."
      },
      {
        heading: "Spring Beans and Application Context",
        explanation: "A Spring bean is an object managed by the Spring container. Beans can be registered through component scanning, configuration methods or framework auto-configuration. The application context manages bean creation, dependency resolution and lifecycle callbacks.",
        practicalExample: "PaymentService can be annotated with @Service and PaymentRepository with @Repository. Spring discovers eligible components and creates the object graph required by the application.",
        keyPoints: [
          "@Component marks a general Spring-managed component.",
          "@Service identifies a service-layer component.",
          "@Repository identifies a persistence component.",
          "@Configuration declares bean configuration.",
          "@Bean registers an object returned from a configuration method."
        ],
        exercise: "Register a service using @Service and another component using @Component. Start the application and verify successful dependency resolution."
      },
      {
        heading: "Constructor Injection and Dependency Design",
        explanation: "Constructor injection supplies required dependencies when an object is created. It makes required collaborators explicit and allows fields to remain final. It is generally preferred over field injection because it supports straightforward unit testing and avoids hidden dependencies.",
        practicalExample: "A PaymentService constructor accepts PaymentRepository and PaymentGateway. A unit test can instantiate the service with test doubles without starting the entire Spring container.",
        keyPoints: [
          "Prefer constructor injection for required dependencies.",
          "Use final fields for constructor-provided collaborators.",
          "Avoid unnecessary field injection.",
          "Keep constructor dependency counts manageable.",
          "Split responsibilities when a class has too many dependencies."
        ],
        configuration: "A Spring-managed service can declare a constructor with its required repository and gateway dependencies. When a class has one constructor, Spring can use it for injection without requiring @Autowired on that constructor.",
        exercise: "Refactor a service that uses field injection into constructor injection. Write a plain unit test that constructs the service directly."
      },
      {
        heading: "Bean Scope and Lifecycle",
        explanation: "Spring supports bean scopes that control how bean instances are created and shared. Singleton is the default scope in many application contexts and means one bean instance per container. Prototype creates a new instance when requested. Web applications also support request and session scopes. Singleton beans should not store mutable request-specific state in shared fields.",
        practicalExample: "PaymentService is commonly a stateless singleton bean. It should process each request using method-local data rather than storing the current payment in a shared field that concurrent requests can overwrite.",
        keyPoints: [
          "Singleton is the common default scope.",
          "Prototype creates instances on request.",
          "Web scopes have request or session lifetimes.",
          "Singleton services should generally be stateless.",
          "Understand lifecycle differences when injecting scoped beans."
        ],
        exercise: "Create a singleton service and demonstrate why storing request-specific mutable state in its fields is unsafe under concurrent requests."
      },
      {
        heading: "Resolving Injection Failures",
        explanation: "Dependency injection failures occur when Spring cannot find a required bean, finds multiple candidates or encounters a circular dependency. Component scanning boundaries, missing annotations and configuration errors are common causes. The application startup log usually identifies the unresolved dependency chain.",
        practicalExample: "If two PaymentGateway implementations are registered and PaymentService requests only PaymentGateway, Spring may report an ambiguity. Use a clear qualifier or primary selection when the design genuinely requires multiple implementations.",
        keyPoints: [
          "NoSuchBeanDefinitionException indicates a missing bean definition.",
          "NoUniqueBeanDefinitionException can indicate multiple candidates.",
          "Circular dependencies indicate tightly coupled components.",
          "Check component scanning and configuration first.",
          "Use @Qualifier or @Primary intentionally."
        ],
        commands: [
          "mvn spring-boot:run",
          "mvn test"
        ],
        exercise: "Register two PaymentGateway implementations and reproduce an ambiguous injection failure. Resolve it with an explicit qualifier and test the selected implementation."
      }
    ]
  },

  "REST API Development": {
    topic: "REST API Development",
    sections: [
      {
        heading: "REST Resources, URLs and HTTP Methods",
        explanation: "REST-style APIs expose resources through URLs and use HTTP methods to express operations. GET retrieves representations, POST commonly creates or initiates processing, PUT replaces a resource representation, PATCH partially updates a resource and DELETE removes a resource where supported. API design should use stable resource names and clear contracts.",
        practicalExample: "A payment service can expose POST /api/payments to submit a payment and GET /api/payments/{paymentId} to retrieve its current status. The API should not expose internal database table names as its public resource model.",
        keyPoints: [
          "Model URLs around resources.",
          "Use HTTP methods according to their semantics.",
          "Use path variables for resource identifiers.",
          "Use query parameters for filtering and pagination.",
          "Document request and response contracts."
        ],
        exercise: "Design REST endpoints for creating a payment, retrieving payment status and listing payments. Document methods, paths and expected responses."
      },
      {
        heading: "Spring REST Controllers and Request Mapping",
        explanation: "Spring MVC maps HTTP requests to controller methods using annotations such as @RestController, @RequestMapping, @GetMapping and @PostMapping. @RequestBody binds JSON input to a Java object. @PathVariable reads path values and @RequestParam reads query parameters.",
        practicalExample: "A PaymentController can map POST /api/payments to createPayment and GET /api/payments/{id} to getPayment. The controller delegates business operations to PaymentService.",
        keyPoints: [
          "@RestController creates REST response handling behavior.",
          "@RequestMapping defines common mapping configuration.",
          "@GetMapping maps GET requests.",
          "@PostMapping maps POST requests.",
          "@RequestBody binds request payloads.",
          "@PathVariable extracts path segments."
        ],
        exercise: "Implement POST and GET endpoints for a payment resource. Use a service layer and verify both endpoints with an HTTP client."
      },
      {
        heading: "Request Validation and Error Responses",
        explanation: "External API input must be validated before business processing. Bean Validation annotations can enforce constraints such as non-null values and positive amounts. Controller methods can use @Valid to trigger validation. A centralized exception handler can translate validation failures into consistent client responses.",
        practicalExample: "CreatePaymentRequest can require a non-null amount greater than zero and a supported currency. Invalid input should return a client error instead of reaching payment processing.",
        keyPoints: [
          "Validate external input at the API boundary.",
          "Use @Valid with supported validation constraints.",
          "Return meaningful client-safe error details.",
          "Do not expose stack traces or secrets.",
          "Test invalid and boundary input values."
        ],
        exercise: "Add validation to a payment request DTO. Submit missing, zero and negative amounts and verify the returned HTTP responses."
      },
      {
        heading: "HTTP Status Codes and API Semantics",
        explanation: "HTTP status codes communicate the result of a request. Common examples include 200 OK, 201 Created, 202 Accepted, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict and 500 Internal Server Error. Select status codes based on the actual operation and outcome.",
        practicalExample: "Creating a payment resource may return 201 Created. A duplicate idempotency key may return 409 Conflict. A request that is accepted for asynchronous processing may return 202 Accepted with a way to retrieve the operation status.",
        keyPoints: [
          "Use 2xx for successful outcomes.",
          "Use 4xx for client-side request or authorization problems.",
          "Use 5xx for server-side failures.",
          "Do not return 200 for every outcome.",
          "Document status codes in the API contract."
        ],
        exercise: "Create an API response matrix for successful creation, invalid input, missing payment, duplicate request and unexpected server failure."
      },
      {
        heading: "API Testing, Idempotency and Production Safety",
        explanation: "API tests should verify methods, status codes, response bodies, validation and failure behavior. Idempotency is important when clients retry operations after network timeouts. Authentication, authorization, rate limits, input validation and secure logging protect production APIs.",
        practicalExample: "A mobile client submits a payment and times out before receiving a response. It retries using the same idempotency key. The service must recognize the original request and avoid charging the customer twice.",
        keyPoints: [
          "Test success and failure paths.",
          "Use idempotency for retryable financial operations.",
          "Authenticate callers and authorize resource access.",
          "Apply rate limits where appropriate.",
          "Do not log secrets or sensitive payment data.",
          "Use request correlation IDs for tracing."
        ],
        exercise: "Implement an idempotency-key check for payment creation. Simulate a repeated request and verify that it does not create a second payment."
      }
    ]
  },

  "Application Properties": {
    topic: "Application Properties",
    sections: [
      {
        heading: "Externalized Configuration Fundamentals",
        explanation: "Spring Boot externalized configuration allows application settings to be supplied separately from application code. Settings can come from application.properties, application.yml, environment variables, command-line arguments and other supported property sources. This allows the same packaged artifact to run in multiple environments with different settings.",
        practicalExample: "The payment-service JAR remains identical across development, staging and production. Each environment supplies its own database URL, port and feature settings without rebuilding the application.",
        keyPoints: [
          "Configuration should be external to environment-independent code.",
          "application.properties and application.yml are common formats.",
          "Environment variables can override many settings.",
          "Command-line arguments can supply runtime values.",
          "Do not commit production credentials."
        ],
        exercise: "Configure an application port in application.properties and override it through a command-line argument. Verify which value the running application uses."
      },
      {
        heading: "application.properties and application.yml",
        explanation: "Spring Boot supports properties and YAML configuration formats. Properties files use key-value pairs. YAML represents nested configuration using indentation. Both formats can describe server settings, logging, database connections and custom application properties. YAML indentation must be valid.",
        practicalExample: "A payment-service can define server.port and application name in properties format or use nested server and spring sections in YAML. Teams should use a consistent style and avoid maintaining conflicting duplicate values.",
        keyPoints: [
          "Properties use key=value syntax.",
          "YAML represents nested structures.",
          "YAML indentation is significant.",
          "Avoid duplicate conflicting configuration.",
          "Keep configuration readable and documented."
        ],
        configuration: "Example properties: server.port=8080 and spring.application.name=payment-service. Equivalent YAML can represent these values under server and spring.application sections.",
        exercise: "Configure the application name and port using YAML. Start the application and verify the configured port."
      },
      {
        heading: "Environment Variables and Runtime Overrides",
        explanation: "Environment variables allow deployment platforms to inject configuration at runtime. Spring Boot maps environment variables to supported property names. Command-line arguments and system properties can also override configuration according to property-source precedence. Verify the effective value rather than assuming an override was applied.",
        practicalExample: "A Kubernetes Deployment can provide SERVER_PORT and database connection settings to a payment-service container. The same image can be promoted between environments while deployment configuration supplies environment-specific values.",
        keyPoints: [
          "Environment variables support runtime configuration.",
          "Command-line arguments can override configuration.",
          "Understand property-source precedence.",
          "Avoid embedding secrets in Docker image layers.",
          "Use deployment secrets or a secret manager for sensitive values."
        ],
        commands: [
          "java -jar payment-service.jar --server.port=8081",
          "java -Dserver.port=8082 -jar payment-service.jar"
        ],
        exercise: "Run the same application with different port values supplied externally. Verify the active port without modifying the packaged JAR."
      },
      {
        heading: "Database and Service Connection Settings",
        explanation: "Applications commonly configure database URLs, usernames, connection-pool settings and external service endpoints. These values differ by environment and should be injected securely. Connection timeouts, pool limits and TLS settings should be selected according to the target infrastructure and workload.",
        practicalExample: "A payment service connects to a staging database in the test environment and a production database in production. Credentials are supplied through protected deployment configuration rather than committed application files.",
        keyPoints: [
          "Keep environment-specific endpoints outside the artifact.",
          "Protect database credentials.",
          "Set appropriate connection and read timeouts.",
          "Use TLS where required by the service.",
          "Monitor connection pool usage and failures."
        ],
        exercise: "Configure a test database connection using environment variables. Verify that an incorrect URL produces a clear startup or connection failure."
      },
      {
        heading: "Configuration Validation and Secret Safety",
        explanation: "Configuration errors can cause startup failures, insecure defaults or unexpected runtime behavior. Validate required properties and document safe defaults. Secrets should be supplied through protected runtime mechanisms and must not appear in source control, logs, build output or container image layers.",
        practicalExample: "A payment-service should fail clearly when a required gateway endpoint is missing, but it should never print the gateway password in the startup log. Kubernetes Secrets or an external secret manager can provide protected values to the workload.",
        keyPoints: [
          "Validate required configuration at startup.",
          "Use typed configuration properties for grouped settings.",
          "Do not log passwords, tokens or private keys.",
          "Rotate credentials using a controlled process.",
          "Review configuration changes before production rollout."
        ],
        exercise: "Create a typed configuration class for payment gateway settings. Validate required values and verify that secret values are not printed in application logs."
      }
    ]
  },

  "Profiles and Environment Configuration": {
    topic: "Profiles and Environment Configuration",
    sections: [
      {
        heading: "Spring Profiles and Environment Separation",
        explanation: "Spring profiles group configuration and bean definitions for different runtime environments. Common profile names include local, dev, test, staging and prod. Activating a profile allows the application to load matching configuration without changing application source code.",
        practicalExample: "The payment-service can use an embedded or local database during development and a managed database in production. The application code and packaged JAR remain the same while the active profile selects environment-specific settings.",
        keyPoints: [
          "Profiles identify environment-specific behavior.",
          "Use clear profile names.",
          "Keep common settings in the default configuration.",
          "Keep sensitive values outside committed profile files.",
          "Avoid embedding environment assumptions in application code."
        ],
        exercise: "Create dev and test profiles with different application names or ports. Run the application with each profile and verify the active configuration."
      },
      {
        heading: "Profile-Specific Configuration Files",
        explanation: "Spring Boot supports profile-specific files such as application-dev.yml and application-prod.yml. Common settings can remain in application.yml while profile files override selected values. Configuration precedence should be understood when values are also supplied by environment variables or command-line arguments.",
        practicalExample: "application.yml can define the service name and common logging settings. application-dev.yml can define a local database endpoint, while production-specific database credentials are injected through protected runtime configuration.",
        keyPoints: [
          "Use application-{profile}.properties or YAML files.",
          "Keep shared defaults in the base configuration.",
          "Avoid duplicating all configuration in every profile.",
          "Do not commit production passwords.",
          "Review profile activation and property precedence."
        ],
        configuration: "Example profile files: application.yml, application-dev.yml and application-test.yml. Use external configuration or secret injection for sensitive production values.",
        exercise: "Create application-dev.yml and application-test.yml. Configure different non-secret settings and verify that activating each profile changes the effective configuration."
      },
      {
        heading: "Activating Profiles at Runtime",
        explanation: "A profile can be activated through supported Spring configuration properties, environment variables or command-line arguments. The deployment platform should explicitly define the intended profile. Do not assume that a production environment automatically activates a production profile unless the deployment configuration says so.",
        practicalExample: "A Kubernetes Deployment can set SPRING_PROFILES_ACTIVE=prod for the payment-service container. A local developer can use the dev profile without changing the image.",
        keyPoints: [
          "SPRING_PROFILES_ACTIVE is a common activation mechanism.",
          "Command-line arguments can select profiles.",
          "Make profile selection explicit in deployments.",
          "Verify the active profile from startup diagnostics.",
          "Do not activate production-only settings in local development."
        ],
        commands: [
          "java -jar payment-service.jar --spring.profiles.active=dev",
          "java -jar payment-service.jar --spring.profiles.active=test"
        ],
        exercise: "Start the application using two different profiles and verify the selected configuration in startup output."
      },
      {
        heading: "Profile-Specific Beans and Conditional Behavior",
        explanation: "The @Profile annotation can restrict bean registration to selected profiles. This is useful when a development implementation differs from a production integration. Profile-specific implementations should preserve expected contracts so application behavior remains predictable.",
        practicalExample: "A local payment gateway simulator can be registered under the dev profile, while a real provider integration is registered for production. The service depends on a shared PaymentGateway interface.",
        keyPoints: [
          "@Profile controls where a bean is active.",
          "Keep common contracts consistent across implementations.",
          "Do not accidentally register test doubles in production.",
          "Verify bean selection in each environment.",
          "Use profiles for environment concerns, not every business feature."
        ],
        exercise: "Create a simulated gateway bean for dev and a separate production gateway configuration. Verify which implementation is selected under each profile."
      },
      {
        heading: "Production Profile Safety and Deployment Verification",
        explanation: "Production configuration must use secure endpoints, protected credentials, suitable timeouts and operational logging. Deployment pipelines should verify the intended profile and required configuration before releasing traffic. Profile mistakes can connect a production service to test infrastructure or enable unsafe diagnostic behavior.",
        practicalExample: "Before promoting the payment-service to production, the deployment pipeline verifies SPRING_PROFILES_ACTIVE, database connectivity, gateway endpoint configuration and health checks. It must not expose development endpoints or debug settings.",
        keyPoints: [
          "Verify the active profile during deployment.",
          "Protect credentials through secret management.",
          "Disable unsafe development diagnostics.",
          "Validate external endpoints and connectivity.",
          "Include health checks in deployment verification."
        ],
        exercise: "Create a production-readiness checklist for profile activation, secrets, database endpoint, payment gateway endpoint, logging and health checks."
      }
    ]
  },

  "Logging and Actuator": {
    topic: "Logging and Actuator",
    sections: [
      {
        heading: "Application Logging Fundamentals",
        explanation: "Application logs record events that help engineers understand runtime behavior. Spring Boot commonly uses SLF4J as a logging API with Logback as the default implementation. Log levels such as TRACE, DEBUG, INFO, WARN and ERROR communicate event importance. Logs should provide useful context without exposing sensitive data.",
        practicalExample: "A payment service can log that a payment request was accepted using a correlation ID and payment reference. It should not log card numbers, passwords, authentication tokens or other sensitive payment details.",
        keyPoints: [
          "Use a logging framework instead of System.out for production services.",
          "Use appropriate log levels.",
          "Include useful context and correlation identifiers.",
          "Do not log secrets or sensitive personal data.",
          "Avoid excessive debug logging in production."
        ],
        commands: [
          "java -jar payment-service.jar",
          "journalctl -u payment-service -n 100 --no-pager"
        ],
        exercise: "Add structured log statements to a payment service. Verify that success and failure events are distinguishable and that sensitive values are excluded."
      },
      {
        heading: "Log Levels and Configuration",
        explanation: "Log levels control which events are emitted. DEBUG is useful for development diagnostics, INFO records normal significant events, WARN highlights unexpected but recoverable conditions and ERROR records failures requiring attention. Package-specific logging configuration can increase detail for one component without making the entire application excessively verbose.",
        practicalExample: "During a payment gateway incident, an engineer may temporarily increase logging for the gateway integration package while keeping unrelated application packages at INFO. Any temporary change should have an owner and rollback plan.",
        keyPoints: [
          "Use INFO for important normal lifecycle events.",
          "Use WARN for unusual conditions that may recover.",
          "Use ERROR for failed operations.",
          "Use DEBUG selectively during investigations.",
          "Control log volume and retention."
        ],
        configuration: "Spring Boot supports logging.level.root and package-specific logging.level settings in application properties or YAML. Set production defaults deliberately and avoid enabling verbose logs globally without assessing volume and sensitive-data exposure.",
        exercise: "Configure root logging at INFO and one application package at DEBUG in a local environment. Verify the difference in emitted messages."
      },
      {
        heading: "Spring Boot Actuator and Health Endpoints",
        explanation: "Spring Boot Actuator provides operational endpoints for application health, metrics and information. The health endpoint reports application health indicators. Additional endpoints can expose metrics and diagnostic details when dependencies and configuration are present. Endpoint exposure and access must be controlled.",
        practicalExample: "Kubernetes can use a configured health endpoint to determine whether the payment-service is ready to receive traffic. The health response should reflect important dependencies without exposing internal credentials or infrastructure details publicly.",
        keyPoints: [
          "Actuator adds operational capabilities.",
          "Health endpoints support operational checks.",
          "Metrics endpoints expose measurements.",
          "Endpoint exposure must be restricted.",
          "Readiness and liveness should represent different conditions."
        ],
        commands: [
          "curl http://localhost:8080/actuator/health",
          "curl http://localhost:8080/actuator/metrics"
        ],
        exercise: "Add the Spring Boot Actuator dependency, enable the health endpoint and verify its response from a local environment."
      },
      {
        heading: "Metrics and Observability Integration",
        explanation: "Metrics represent measurements such as request count, latency, errors, memory usage and JVM activity. Spring Boot Actuator integrates with Micrometer to expose application metrics to supported monitoring systems. Metrics complement logs and traces; they do not replace detailed event investigation.",
        practicalExample: "A payment service can expose request latency and error metrics. Prometheus can scrape supported metrics, while Grafana dashboards display latency trends and error rates for the service.",
        keyPoints: [
          "Metrics help identify trends and abnormal behavior.",
          "Use latency, traffic, errors and saturation indicators.",
          "Avoid unbounded metric labels.",
          "Protect metrics endpoints.",
          "Correlate metrics with logs and traces."
        ],
        exercise: "Expose application metrics in a test environment and identify request or JVM measurements suitable for a Prometheus dashboard."
      },
      {
        heading: "Production Incident Investigation",
        explanation: "Production investigations combine logs, metrics, health checks and deployment evidence. Start by identifying the affected service, time window and user impact. Correlate application events with infrastructure metrics and recent releases. Avoid restarting services or changing logging settings before collecting useful evidence unless immediate mitigation is necessary.",
        practicalExample: "If payment requests begin returning errors after a deployment, compare the error rate and latency with deployment timestamps. Use correlation IDs to locate failed requests and inspect whether the root cause is application configuration, database connectivity or an external gateway.",
        keyPoints: [
          "Establish incident time and impact.",
          "Check service health and recent deployments.",
          "Compare latency and error metrics.",
          "Use correlation IDs to trace individual requests.",
          "Protect sensitive diagnostic data.",
          "Record the root cause and preventive action."
        ],
        exercise: "Simulate a payment gateway failure. Use application logs, health information and metrics to identify the failure and write a short incident report."
      }
    ]
  },

  "Production Hands-on Lab": {
    topic: "Production Hands-on Lab",
    sections: [
      {
        heading: "Lab Architecture and Application Requirements",
        explanation: "This lab combines Java, Maven and Spring Boot into a small payment-service application. The service should expose REST endpoints, validate requests, separate business logic from transport concerns and provide operational health information. The application should be structured so later CI/CD stages can build, test, scan and package it.",
        practicalExample: "The target architecture is a client calling a Spring Boot REST API. The controller delegates to a service, the service applies payment rules and a repository abstraction stores transaction data. The service is packaged as a JAR for later containerization.",
        keyPoints: [
          "Use a supported JDK version.",
          "Use Maven for repeatable builds.",
          "Separate controller, service and repository responsibilities.",
          "Validate incoming payment data.",
          "Provide consistent API responses.",
          "Expose a protected health endpoint."
        ],
        exercise: "Create a Maven Spring Boot project named payment-service. Add a main application class and packages for controller, service, repository, model, DTO and exception handling."
      },
      {
        heading: "Implement the Payment Domain and Business Rules",
        explanation: "The domain layer represents payment state and business rules. A payment should have a stable identifier, amount, currency and status. The service must reject invalid amounts and prevent invalid state transitions. Financial calculations should use appropriate decimal types.",
        practicalExample: "PaymentService accepts a CreatePaymentRequest, validates that the amount is positive and currency is supported, then creates a payment with an initial status. It should not mark a payment successful before the gateway operation has actually succeeded.",
        keyPoints: [
          "Use BigDecimal for monetary amounts.",
          "Validate identifiers and required fields.",
          "Represent payment states explicitly.",
          "Keep business rules inside the service or domain layer.",
          "Do not trust client-provided approval status."
        ],
        exercise: "Implement Payment and PaymentService. Add validation for positive amounts and supported currencies. Write unit tests for accepted and rejected values."
      },
      {
        heading: "Build REST Endpoints and Error Handling",
        explanation: "The API layer exposes operations using clear resource paths and appropriate HTTP methods. Request DTOs define the external contract. Validation failures and business exceptions should be translated into predictable status codes and error response bodies.",
        practicalExample: "POST /api/payments creates a payment request and returns an appropriate success response. GET /api/payments/{id} retrieves its status. Invalid amounts return a client error and unknown payment identifiers return a not-found response.",
        keyPoints: [
          "Use @RestController for REST endpoints.",
          "Use request and response DTOs.",
          "Apply Bean Validation.",
          "Use centralized exception mapping.",
          "Choose status codes according to API semantics."
        ],
        exercise: "Implement payment creation and retrieval endpoints. Test successful creation, invalid input and unknown payment identifiers using an HTTP client."
      },
      {
        heading: "Configuration, Profiles and Secrets",
        explanation: "The application must support environment-specific settings without rebuilding the JAR. Use externalized configuration for ports and service endpoints. Activate profiles explicitly and inject secrets through protected runtime mechanisms. Never store production credentials in committed configuration files.",
        practicalExample: "The development environment can use local test settings while the production deployment receives database and gateway configuration through deployment-managed environment variables or a secret manager.",
        keyPoints: [
          "Use externalized configuration.",
          "Keep common and environment-specific settings organized.",
          "Activate the intended profile explicitly.",
          "Protect credentials and tokens.",
          "Validate required configuration at startup."
        ],
        exercise: "Create dev and test configuration profiles. Add a non-secret environment-specific setting and verify that the same JAR runs under both profiles."
      },
      {
        heading: "Testing, Packaging and Operational Verification",
        explanation: "Before an application is handed to the next CI/CD stage, compile it, execute tests and package the artifact. Verify startup, REST behavior and health information. A successful package command alone does not prove that the application behaves correctly at runtime.",
        practicalExample: "Run Maven verification, launch the executable JAR, call the payment endpoint and check the health endpoint. Archive the exact JAR produced by the verified build so Docker can package that artifact later.",
        keyPoints: [
          "Run mvn clean verify.",
          "Review test reports and failures.",
          "Launch the packaged JAR.",
          "Verify API and health responses.",
          "Record the artifact version and source commit.",
          "Do not promote an artifact from a failed build."
        ],
        commands: [
          "mvn clean verify",
          "mvn package",
          "java -jar target/payment-service.jar",
          "curl http://localhost:8080/actuator/health"
        ],
        exercise: "Complete the payment-service build, run tests, package the JAR, start it locally and verify the API and health endpoint. Record the JAR name, application version and Git commit for the next pipeline stage."
      }
    ]
  }
};

export const stageOneJavaTopicCount = Object.keys(stageOneJavaSections).length;

export function getStageOneJavaSections(topic: string): CicdTopicSections | undefined {
  return stageOneJavaSections[topic];
}
