import type { CicdTopicLesson } from "./cicd-topic-lessons";

function makeLesson(
  overview: string,
  purpose: string,
  architecture: string,
  workflow: string[],
  example: string,
  commands: string[],
  configuration: string,
  failures: string[],
  recovery: string[],
  bestPractices: string[],
  exercise: string
): CicdTopicLesson {
  return {
    overview, purpose, architecture, workflow, example,
    commands, configuration, failures, recovery,
    bestPractices, exercise
  };
}

export const stageFiveLessonOverrides: Record<string, CicdTopicLesson> = {
  "5|Testing Fundamentals": makeLesson(
    "Software testing verifies that application behavior matches business requirements. In a DevOps pipeline, automated tests provide fast feedback before code reaches production. A payment application should test calculations, service interactions, database behavior, API contracts, and complete user journeys.",
    "Testing reduces production defects, protects business transactions, and gives developers confidence to change code. Unit tests detect logic defects quickly, integration tests validate component communication, and end-to-end tests verify important user workflows.",
    "A typical Java Spring Boot testing architecture contains JUnit 5 as the test framework, Mockito for dependency isolation, Spring Test for application integration, Testcontainers for real infrastructure dependencies, JaCoCo for coverage, Maven Surefire and Failsafe for execution, and Jenkins for pipeline reporting.",
    ["Developer writes code and tests", "Maven compiles application and test sources", "Unit tests execute using Surefire", "Integration tests execute using Failsafe", "Coverage is collected using JaCoCo", "Jenkins publishes reports and evaluates quality gates", "Only validated artifacts continue toward deployment"],
    "For a payment service, test that a payment of 500 rupees with a 2 percent fee produces the expected total. Also test invalid amounts, insufficient balance, duplicate payment requests, and gateway failures.",
    ["mvn clean test", "mvn clean verify", "mvn -Dtest=PaymentServiceTest test", "mvn -DskipTests package"],
    "Use separate test source directories: src/main/java for application code and src/test/java for tests. Keep test dependencies in Maven test scope. Configure Surefire for unit tests and Failsafe for integration tests.",
    ["Tests are not discovered because naming conventions are incorrect", "Tests pass locally but fail in CI due to environment differences", "Tests depend on execution order", "External services make test execution unreliable"],
    ["Use standard test class naming such as PaymentServiceTest", "Run mvn clean test locally", "Remove shared mutable test state", "Use controlled test configuration and deterministic test data"],
    ["Prefer a balanced test pyramid", "Keep unit tests fast and isolated", "Test business-critical payment paths", "Avoid depending on production services", "Run automated tests on every pull request", "Publish test reports and preserve failure evidence"],
    "Create a test strategy for a payment application. Identify at least five unit tests, three integration tests, and two end-to-end scenarios. Explain which pipeline stage should execute each test."
  ),

  "5|JUnit 5 Architecture": makeLesson(
    "JUnit 5 is a Java testing ecosystem built around the JUnit Platform. It separates test discovery and execution from the programming model used to write tests. JUnit Jupiter provides the modern annotations and APIs used in most new Java projects.",
    "Understanding its architecture helps troubleshoot missing tests, configure Maven correctly, and select compatible test engines. It also helps teams migrate older JUnit 4 tests without confusing the different APIs.",
    "JUnit Platform is the foundation. The Platform Launcher starts test execution, Test Engines discover and run tests, Jupiter is the modern programming model, and Vintage supports legacy JUnit 3 and 4 tests when configured.",
    ["Add JUnit Jupiter dependency", "Maven resolves the testing libraries", "Surefire starts the JUnit Platform provider", "The Platform discovers available engines", "Jupiter discovers annotated test methods", "The engine executes tests and returns results"],
    "A PaymentServiceTest class uses org.junit.jupiter.api.Test. Maven Surefire discovers the class and Jupiter executes its test methods.",
    ["mvn dependency:tree", "mvn -Dtest=PaymentServiceTest test", "mvn test", "mvn help:effective-pom"],
    "Use junit-jupiter for modern tests and a compatible Maven Surefire version. Add junit-vintage-engine only when legacy JUnit 4 tests must run on the JUnit Platform.",
    ["No tests found because the JUnit engine is missing", "JUnit 4 annotations are mixed with Jupiter imports", "Dependency versions conflict", "Old Surefire configuration does not discover tests"],
    ["Inspect test dependencies with mvn dependency:tree", "Confirm imports use org.junit.jupiter.api", "Align JUnit and Surefire versions", "Run a single test class to isolate discovery problems"],
    ["Prefer JUnit Jupiter for new tests", "Avoid mixing JUnit generations without a migration plan", "Use dependency management to align versions", "Keep test framework versions consistent in CI"],
    "Create a Maven project with JUnit Jupiter. Write one passing test and one intentionally failing test. Inspect the Surefire report and identify which JUnit engine executed the tests."
  ),

  "5|Test Annotations": makeLesson(
    "JUnit annotations tell the testing framework which methods are tests and how test setup, cleanup, grouping, and execution should work. Correct annotation usage makes test intent clear and reduces duplicated setup code.",
    "Annotations allow teams to organize tests, prepare fixtures, reuse lifecycle methods, and selectively run test groups in local development and CI pipelines.",
    "JUnit Jupiter uses @Test for test methods, @BeforeEach and @AfterEach for per-test setup and cleanup, @BeforeAll and @AfterAll for class-level lifecycle, @Nested for grouped tests, @Tag for classification, and @Disabled to temporarily disable a test.",
    ["Create a test class", "Annotate executable test methods with @Test", "Prepare independent test data with @BeforeEach", "Release resources with @AfterEach", "Group related scenarios using @Nested", "Classify tests using @Tag", "Execute selected tests through Maven"],
    "A PaymentServiceTest uses @BeforeEach to create a service and test fixture. Separate @Test methods verify successful payments and rejected invalid amounts.",
    ["mvn test", "mvn -Dtest=PaymentServiceTest test", "mvn -Dgroups=unit test"],
    "Import annotations from org.junit.jupiter.api. Use @BeforeAll and @AfterAll as static methods by default, unless the class uses the per-class test instance lifecycle.",
    ["Tests do not run because @Test comes from the wrong package", "Shared setup creates state that leaks between tests", "Disabled tests are forgotten", "Incorrect lifecycle configuration causes static method errors"],
    ["Correct the annotation imports", "Move per-test setup into @BeforeEach", "Review cleanup methods", "Track disabled tests and define an owner and removal date"],
    ["Use lifecycle annotations only for genuine shared setup", "Keep test methods independent", "Use descriptive @DisplayName values", "Use tags consistently for unit and integration tests", "Do not disable failing tests permanently to make CI green"],
    "Write a test class with @BeforeEach, @AfterEach, @Test, @Nested, and @DisplayName. Demonstrate how the lifecycle methods execute around two payment test cases."
  ),

  "5|Assertions": makeLesson(
    "Assertions compare actual application behavior with expected results. A test fails when an assertion detects a mismatch. Good assertions explain exactly which business rule or response contract is incorrect.",
    "Assertions turn test execution into meaningful validation. They protect payment amounts, customer balances, API status codes, validation rules, and exception behavior from accidental changes.",
    "JUnit Jupiter provides equality, boolean, null, identity, exception, timeout, and grouped assertions. assertAll evaluates multiple assertions together, while assertThrows verifies expected exceptions.",
    ["Arrange the input and expected result", "Execute the application method", "Capture the actual result", "Assert the expected value", "Use exception assertions for invalid operations", "Review assertion messages in the test report"],
    "When a payment of 500 rupees has a 10 rupee processing fee, assert that the calculated total is 510. For a negative amount, assert that the service throws IllegalArgumentException.",
    ["mvn -Dtest=PaymentCalculationTest test", "mvn test"],
    "Use org.junit.jupiter.api.Assertions static imports where appropriate. Prefer assertEquals(expected, actual) and provide a useful message for complicated business validations.",
    ["Expected and actual values are supplied in the wrong order", "Assertions check only that a result is non-null", "Floating-point calculations cause precision mismatches", "Exception assertions accept the wrong exception type"],
    ["Correct expected and actual argument order", "Assert important business values rather than only object existence", "Use BigDecimal for monetary calculations", "Assert the exact exception type and relevant message when required"],
    ["Use precise assertions", "Avoid meaningless assertTrue(true)", "Use assertAll for related independent checks", "Compare monetary values using appropriate precision", "Make failure messages understandable to developers"],
    "Write assertions for payment total, transaction status, generated transaction ID, invalid amount, and insufficient balance. Include one assertAll block and one assertThrows assertion."
  ),

  "5|Test Lifecycle": makeLesson(
    "The JUnit test lifecycle defines when test objects are created, when setup runs, when test methods execute, and when resources are released. Lifecycle management is important when tests use databases, temporary files, containers, or shared fixtures.",
    "Correct lifecycle handling prevents test contamination, resource leaks, order dependency, and inconsistent results between local execution and Jenkins.",
    "JUnit Jupiter normally creates a new test instance for each test method. @BeforeEach and @AfterEach execute around every test, while @BeforeAll and @AfterAll execute once per test class. Extensions provide reusable lifecycle integrations.",
    ["JUnit discovers the test class", "The test instance is created", "BeforeAll runs once", "BeforeEach prepares the individual test", "The test method executes", "AfterEach cleans up", "AfterAll performs class-level cleanup"],
    "A database integration test starts required resources before execution and closes connections or temporary resources after the test. Each test receives isolated test data.",
    ["mvn -Dtest=PaymentServiceTest test", "mvn test"],
    "Use @TestInstance(TestInstance.Lifecycle.PER_METHOD) for the default isolated instance behavior. Choose PER_CLASS only when shared instance state is intentional and safely managed.",
    ["Mutable state is shared between tests", "Cleanup does not execute after resource creation fails", "Static setup methods use incorrect signatures", "Tests depend on a particular execution order"],
    ["Reset mutable state before each test", "Use try-with-resources for closeable resources", "Use extension-managed resources where suitable", "Remove order dependencies and verify isolated execution"],
    ["Prefer independent test instances", "Always clean up external resources", "Avoid storing test results in static mutable fields", "Do not depend on test execution order", "Use extensions for reusable resource management"],
    "Create two tests that use the same service class. Add lifecycle logging to @BeforeAll, @BeforeEach, @AfterEach, and @AfterAll. Run the class and document the observed order."
  ),

  "5|Parameterized Tests": makeLesson(
    "Parameterized tests execute the same test logic with multiple input values. They reduce duplicated test methods and make it easier to verify boundary values, invalid inputs, and different business scenarios.",
    "A payment system must handle many amounts, currencies, fee rates, and validation conditions. Parameterized tests verify these cases consistently while keeping the test suite maintainable.",
    "JUnit Jupiter parameterized tests use @ParameterizedTest with sources such as @ValueSource, @CsvSource, @MethodSource, and @EnumSource. Arguments are supplied to the test method for each invocation.",
    ["Add the JUnit parameterized-test dependency", "Mark a method with @ParameterizedTest", "Select an argument source", "Define parameters in the test method", "Execute each input case", "Inspect individual invocation results"],
    "A payment validator is tested with amounts 1, 100, and 500 using @ValueSource. A @CsvSource test checks amount and expected fee combinations.",
    ["mvn -Dtest=PaymentValidationTest test", "mvn test"],
    "Use org.junit.jupiter.params.ParameterizedTest and org.junit.jupiter.params.provider imports. Add junit-jupiter-params when it is not already included through the selected JUnit dependency.",
    ["Parameterized tests are not discovered because the params library is missing", "Input types do not match method parameters", "CSV values are incorrectly quoted", "Method source has an invalid signature"],
    ["Inspect Maven dependencies", "Correct argument types and source definitions", "Use valid CSV syntax", "Ensure method sources are accessible and return supported argument streams"],
    ["Use parameterized tests for repeated input-driven behavior", "Include boundary and invalid values", "Keep test names descriptive", "Avoid putting unrelated business scenarios into one parameterized method"],
    "Create a parameterized payment validation test with valid amounts, zero, negative amounts, and a maximum allowed amount. Use @CsvSource to verify expected processing fees."
  ),

  "5|Mockito Fundamentals": makeLesson(
    "Mockito is a Java mocking framework that creates test doubles for dependencies. It allows a service to be tested without calling real databases, payment gateways, email services, or other external systems.",
    "Mockito makes unit tests fast and predictable. It helps isolate business logic and verify how a service communicates with its collaborators.",
    "A test creates mocks for dependencies, configures behavior using when and thenReturn, invokes the class under test, and verifies interactions using verify. MockitoExtension integrates Mockito with JUnit Jupiter.",
    ["Add Mockito test dependencies", "Create mock dependencies", "Inject mocks into the service", "Stub dependency responses", "Invoke the service method", "Assert the returned result", "Verify required interactions"],
    "Mock PaymentGateway to return APPROVED. Invoke PaymentService.processPayment and verify that the gateway received the expected amount and transaction request.",
    ["mvn -Dtest=PaymentServiceTest test", "mvn test"],
    "Use mockito-junit-jupiter with @ExtendWith(MockitoExtension.class), @Mock, and @InjectMocks. Keep Mockito dependencies in test scope.",
    ["A mock is not injected into the service", "Stubbing uses incorrect argument matchers", "Tests verify implementation details instead of behavior", "A spy invokes an unexpected real method"],
    ["Enable MockitoExtension or initialize mocks correctly", "Use consistent matchers for all arguments in a call", "Verify business-relevant interactions", "Use a mock instead of a spy unless real behavior is required"],
    ["Mock external boundaries, not every internal object", "Keep stubbing minimal", "Avoid excessive interaction verification", "Use descriptive test names", "Do not use mocks as a substitute for integration testing"],
    "Create a PaymentService unit test with a mocked gateway. Test an approved payment, a declined payment, and a gateway exception. Verify the expected interactions."
  ),

  "5|Mocking Dependencies": makeLesson(
    "Dependency mocking replaces collaborators with controlled test objects. This lets a test focus on one class while controlling repository results, gateway responses, notification failures, and other dependency behavior.",
    "Controlled dependencies make failure scenarios reproducible without relying on external infrastructure. They are especially useful for testing payment services and error-handling branches.",
    "The service under test receives mocked repositories, gateways, or clients. Mockito stubbing defines return values or exceptions, ArgumentCaptor captures calls, and verification confirms required interactions.",
    ["Identify the dependency boundary", "Create the required mock", "Configure expected dependency behavior", "Invoke the target service", "Assert business outcomes", "Capture arguments if needed", "Verify relevant interactions"],
    "Mock PaymentRepository to return an existing transaction and verify that a duplicate payment is rejected without invoking PaymentGateway again.",
    ["mvn -Dtest=PaymentServiceDependencyTest test", "mvn test"],
    "Use when(...).thenReturn(...), when(...).thenThrow(...), doReturn(...) for suitable spy cases, and ArgumentCaptor for inspecting complex requests.",
    ["Unnecessary stubbing makes tests difficult to understand", "Mocks return null unexpectedly", "Argument matchers are mixed with raw arguments", "The test verifies calls that are not part of the contract"],
    ["Stub only the behavior needed by the scenario", "Provide explicit default behavior where appropriate", "Use eq or other matchers consistently", "Capture and inspect request objects when values matter"],
    ["Mock external boundaries rather than internal implementation details", "Keep each test scenario focused", "Test both success and failure responses", "Avoid brittle verification of call order unless order is a business requirement"],
    "Mock a payment repository and payment gateway. Test a successful payment, duplicate transaction, gateway timeout, and repository failure. Use ArgumentCaptor to inspect the gateway request."
  ),

  "5|Service Unit Testing": makeLesson(
    "Service unit testing validates business rules implemented in the application service layer. It checks calculations, decisions, validation, and dependency coordination without starting the full Spring application.",
    "Service tests protect the core business behavior independently of HTTP, database, and infrastructure layers. They provide fast feedback when developers modify payment or transaction logic.",
    "A service receives repositories, gateways, and other collaborators through dependency injection. JUnit executes the service method while Mockito controls dependency responses. Assertions validate the service result and side effects.",
    ["Identify a service method and its business rules", "List success and failure scenarios", "Mock external collaborators", "Arrange test data", "Execute the service method", "Assert results and exceptions", "Verify required collaborator calls"],
    "PaymentService.processPayment validates the amount, checks the customer balance, calls the payment gateway, stores the transaction, and returns a transaction response. Unit tests cover each decision branch.",
    ["mvn -Dtest=PaymentServiceTest test", "mvn -Dtest=*ServiceTest test", "mvn test"],
    "Keep service tests in src/test/java. Use constructor injection in production services so dependencies can be supplied explicitly in tests. Use BigDecimal for monetary values.",
    ["Business validation branches are not tested", "Mocks hide incorrect service assumptions", "Tests use shared mutable fixtures", "Money comparisons use unsafe floating-point values"],
    ["Add tests for each meaningful business decision", "Use realistic but isolated test data", "Use BigDecimal assertions", "Test duplicate requests and dependency failures", "Keep tests independent of Spring when testing pure service logic"],
    ["Cover success, validation, and failure paths", "Test idempotency where required", "Avoid starting the application context for simple unit tests", "Assert business outcomes rather than private method calls"],
    "Implement service unit tests for payment approval, insufficient balance, invalid amount, duplicate transaction, and gateway timeout. Ensure each test controls its dependencies."
  ),

  "5|Controller Testing": makeLesson(
    "Controller testing verifies the HTTP contract exposed by Spring MVC controllers. It checks routes, request binding, validation, response status, JSON fields, security behavior, and exception mapping.",
    "Controller tests protect API compatibility for frontend applications, mobile clients, and other services. They catch regressions in request validation and response formats before deployment.",
    "MockMvc sends simulated HTTP requests through Spring MVC. Controller tests can use standalone setup or Spring test slices such as @WebMvcTest. Service dependencies are mocked when the test focuses on the web layer.",
    ["Create a controller test", "Configure MockMvc or @WebMvcTest", "Mock service dependencies", "Send an HTTP request", "Assert status and response content", "Verify validation and error behavior"],
    "POST /api/payments receives a JSON payment request. The controller test verifies HTTP 201 for an approved payment and HTTP 400 for an invalid amount.",
    ["mvn -Dtest=PaymentControllerTest test", "mvn test"],
    "Use @WebMvcTest(PaymentController.class), @AutoConfigureMockMvc where appropriate, and MockMvc request builders. Use JSONPath or response content matchers for response assertions.",
    ["Controller dependencies are not mocked", "JSON request fields do not match DTO properties", "Validation is not activated", "Security filters reject test requests", "Exception handlers return unexpected status codes"],
    ["Load the appropriate MVC test slice", "Check DTO field names and serialization", "Include validation configuration", "Configure test authentication or CSRF where needed", "Verify controller advice behavior"],
    ["Test successful and rejected requests", "Assert status, headers, and response body", "Test validation and authorization", "Keep controller tests focused on HTTP behavior", "Avoid testing service business rules again in every controller test"],
    "Create MockMvc tests for payment creation, payment lookup, invalid request body, unauthorized access, and a service exception. Assert status codes and JSON response fields."
  ),

  "5|Spring Boot Integration Testing": makeLesson(
    "Spring Boot integration testing validates how multiple application components work together using Spring configuration and dependency injection. It can include repositories, services, controllers, serialization, transactions, and application properties.",
    "Integration tests find defects that isolated unit tests cannot detect, such as incorrect bean wiring, repository query problems, transaction configuration, and serialization mismatches.",
    "SpringBootTest loads an application context. Test slices such as @DataJpaTest and @WebMvcTest load focused parts of the application. Test profiles and configured test databases keep test execution isolated from production.",
    ["Choose the integration boundary", "Select SpringBootTest or a focused test slice", "Configure test properties and profile", "Start the required Spring context", "Execute component interactions", "Assert persisted or returned behavior", "Clean up test data"],
    "A payment integration test starts the Spring context, saves a payment through PaymentService, reads it through PaymentRepository, and verifies the persisted transaction state.",
    ["mvn -Dtest=PaymentIntegrationTest test", "mvn -Dtest=PaymentRepositoryTest test", "mvn verify"],
    "Use @SpringBootTest for full-context scenarios and @DataJpaTest for repository tests. Configure application-test.yml and activate the test profile with @ActiveProfiles(\"test\").",
    ["Application context fails because a bean is missing", "Tests accidentally connect to a development database", "Context startup makes the suite slow", "Database state leaks between tests"],
    ["Inspect the first Spring context exception", "Use an isolated test database", "Select the narrowest useful test slice", "Reset or roll back test data safely", "Review active profiles and connection properties"],
    ["Do not point automated tests at production databases", "Use full-context tests only where integration value justifies the cost", "Keep test profiles separate", "Make data setup deterministic", "Use transaction boundaries intentionally"],
    "Create a Spring Boot integration test that saves and retrieves a payment using the real repository and test database. Verify persistence, transaction status, and rollback behavior."
  ),

  "5|Testcontainers": makeLesson(
    "Testcontainers is a testing library that starts disposable infrastructure containers for automated tests. It allows developers to test against real database engines, message brokers, and other services without maintaining shared test servers.",
    "Using real dependencies improves confidence in SQL behavior, database compatibility, and infrastructure integration. It reduces differences between developer machines and CI environments.",
    "A JUnit test declares a container, Testcontainers starts the Docker image, Spring receives its connection details, the test executes against the containerized service, and the container is stopped or reused according to configuration.",
    ["Install Docker or a compatible container runtime", "Add the Testcontainers dependencies", "Declare the required container image", "Wait for the service to become ready", "Supply dynamic connection properties", "Run integration tests", "Clean up container resources"],
    "A PaymentRepository integration test starts a PostgreSQL container, configures Spring datasource properties from the container, and verifies payment persistence against PostgreSQL.",
    ["docker version", "docker ps", "mvn -Dtest=PaymentRepositoryContainerTest test", "mvn verify"],
    "Use testcontainers-junit-jupiter and the database-specific Testcontainers module. Configure @Container and @Testcontainers, or use Spring-managed container lifecycle patterns.",
    ["Docker daemon is unavailable in Jenkins", "Container startup exceeds wait timeout", "Spring connects before the database is ready", "Image pull fails because of registry access", "Tests leave resources running"],
    ["Verify Docker availability on the agent", "Inspect container logs and wait strategy", "Use dynamic properties for mapped ports", "Check registry credentials and image availability", "Use managed lifecycle and cleanup"],
    ["Pin container image versions", "Never use production data in test containers", "Use realistic database engines for important repository tests", "Configure CI agents with container support", "Keep container startup time visible in pipeline reports"],
    "Create a PostgreSQL Testcontainer and run a Spring repository test against it. Configure dynamic datasource properties and verify that Jenkins can execute the test on a Docker-enabled agent."
  ),

  "5|Code Coverage": makeLesson(
    "Code coverage measures which parts of application code are executed by automated tests. JaCoCo collects coverage data and generates reports that help teams identify untested lines and branches.",
    "Coverage analysis highlights areas that may need additional tests. It supports quality gates, but a high percentage alone does not prove that business behavior is tested correctly.",
    "JaCoCo instruments Java execution, records covered instructions and branches, and generates reports. Maven can enforce minimum thresholds, while Jenkins publishes coverage information for review.",
    ["Add the JaCoCo Maven plugin", "Run tests with coverage instrumentation", "Generate the coverage report", "Review line and branch metrics", "Identify important uncovered behavior", "Configure a quality threshold", "Publish results in CI"],
    "PaymentService has a conditional branch for approved and declined payments. Coverage analysis identifies whether both outcomes execute during automated tests.",
    ["mvn clean test", "mvn jacoco:report", "mvn verify", "mvn jacoco:check"],
    "Configure jacoco:prepare-agent and jacoco:report in Maven. Configure jacoco:check with suitable minimums for the project and bind verification to the appropriate build phase.",
    ["Coverage report is missing because tests did not execute", "JaCoCo plugin configuration is incorrect", "Generated classes are excluded unexpectedly", "Coverage threshold fails unexpectedly"],
    ["Inspect target/jacoco.exec and Maven logs", "Verify plugin execution phases", "Review include and exclude patterns", "Open the HTML report and inspect uncovered branches", "Add meaningful tests rather than weakening the threshold immediately"],
    ["Measure branch coverage for important decision logic", "Set realistic thresholds and improve them gradually", "Exclude only justified generated code", "Do not write meaningless tests solely to increase percentages", "Review critical business paths separately"],
    "Configure JaCoCo for a Spring Boot payment service. Generate the HTML report, identify an uncovered branch, add a test for it, and configure a minimum coverage check."
  ),

  "5|Test Reports": makeLesson(
    "Test reports record automated test execution results, including passed tests, failed tests, skipped tests, execution time, and failure details. Maven and Jenkins use these reports to make pipeline results understandable.",
    "Reports help developers diagnose regressions, identify flaky tests, compare test outcomes between builds, and provide evidence for release decisions.",
    "Maven Surefire normally executes unit tests and creates XML reports under target/surefire-reports. Failsafe executes integration tests and creates reports under target/failsafe-reports. Jenkins can publish JUnit-compatible XML files.",
    ["Execute Maven unit tests", "Generate Surefire XML reports", "Execute integration tests through Failsafe", "Generate Failsafe reports", "Collect XML files in Jenkins", "Publish test results", "Review failures and trends"],
    "A Jenkins pipeline runs mvn clean verify and publishes target/surefire-reports/*.xml and target/failsafe-reports/*.xml so the team can inspect payment test failures.",
    ["mvn clean test", "mvn clean verify", "Get-ChildItem target -Recurse -Filter '*.xml'"],
    "Configure Maven Surefire and Failsafe plugins. In Jenkins use the JUnit publisher with the appropriate XML file patterns and preserve reports as build artifacts where required.",
    ["Jenkins reports no test results because the glob is incorrect", "Maven fails before generating reports", "Old reports are accidentally reused", "A test failure is hidden by an incorrect pipeline condition"],
    ["Run mvn clean verify to remove stale output", "Check the actual XML report directories", "Correct the Jenkins report pattern", "Ensure report publishing runs even when tests fail"],
    ["Publish test reports on every relevant build", "Keep failure output available to developers", "Separate unit and integration test reports", "Avoid publishing stale reports", "Track recurring failures and flaky tests"],
    "Configure Surefire and Failsafe in a Maven project. Run unit and integration tests, then create a Jenkins pipeline step that publishes both XML report directories."
  ),

  "5|Flaky Test Troubleshooting": makeLesson(
    "A flaky test produces different results when the code has not changed. It may pass on one run and fail on another because of timing, concurrency, shared state, external services, or nondeterministic test data.",
    "Flaky tests reduce trust in CI pipelines and can hide genuine defects. Teams must identify root causes instead of repeatedly rerunning failures without investigation.",
    "A flaky test investigation collects build logs, test history, execution timing, thread behavior, external dependency status, and environment details. Repeated isolated runs help reproduce the failure and narrow the cause.",
    ["Identify the intermittent test failure", "Capture the exact CI build and environment", "Rerun the individual test to measure reproducibility", "Inspect shared state and timing assumptions", "Check concurrency and external dependencies", "Implement a deterministic fix", "Run the test repeatedly and in the full suite"],
    "A payment test fails randomly because it uses the current system time and expects an exact timestamp. Inject a fixed Clock into the service and use a deterministic test time.",
    ["mvn -Dtest=FlakyPaymentTest test", "mvn -Dtest=FlakyPaymentTest -Dsurefire.rerunFailingTestsCount=3 test", "mvn clean verify"],
    "Use deterministic fixtures, injected clocks, controlled executors, isolated databases, and explicit timeouts. Use rerun support only as diagnostic evidence, not as the permanent fix.",
    ["Tests depend on the current time", "Parallel tests share mutable data", "Thread scheduling changes the result", "External APIs or databases are unstable", "Tests rely on execution order"],
    ["Repeat the failing test in isolation", "Remove shared mutable state", "Inject Clock instead of calling system time directly", "Use unique test data and controlled cleanup", "Inspect thread dumps and external service logs when necessary"],
    ["Do not accept repeated retries as a permanent solution", "Keep tests deterministic", "Avoid arbitrary sleeps", "Isolate parallel test data", "Track flaky tests with ownership and resolution deadlines", "Quarantine only with a documented plan"],
    "Create a deliberately flaky test that depends on timing. Diagnose why it fails intermittently, replace the timing dependency with deterministic control, and demonstrate repeated stable execution."
  ),

  "5|Production Hands-on Lab": makeLesson(
    "This lab combines the testing practices used in a production-oriented Java payment application. You will build unit tests, mock external dependencies, run Spring integration tests, validate database behavior, measure coverage, and publish reports through Jenkins.",
    "The lab demonstrates how automated testing protects a business-critical application before deployment. It connects developer testing practices with CI quality gates and release confidence.",
    "The sample application contains PaymentController, PaymentService, PaymentRepository, and PaymentGateway. JUnit and Mockito validate service logic, MockMvc validates HTTP behavior, Spring Boot tests validate wiring, Testcontainers provides PostgreSQL, JaCoCo measures coverage, and Jenkins orchestrates execution.",
    ["Create a Spring Boot payment application", "Implement payment validation and service logic", "Write JUnit unit tests", "Mock the payment gateway with Mockito", "Test the controller with MockMvc", "Run repository tests using Testcontainers", "Generate JaCoCo coverage reports", "Publish Surefire and Failsafe results in Jenkins", "Fail the pipeline when mandatory quality checks fail"],
    "A pull request changes payment fee calculation. Jenkins compiles the application, executes unit tests, runs integration tests against PostgreSQL, generates coverage, publishes reports, and blocks the pipeline if required checks fail.",
    ["mvn clean compile", "mvn clean test", "mvn -Dtest=PaymentServiceTest test", "mvn verify", "mvn jacoco:report", "docker ps"],
    "Create a Jenkinsfile with checkout, compile, unit-test, integration-test, coverage, and report-publication stages. Keep secrets outside source control and configure Docker access for Testcontainers.",
    ["Unit tests pass but integration tests fail due to database configuration", "Testcontainers cannot access Docker on the Jenkins agent", "Coverage gate fails because important branches are uncovered", "Jenkins cannot locate XML reports", "Payment gateway mock is configured incorrectly"],
    ["Inspect the first failing test and its report", "Verify test profile and datasource configuration", "Check Docker availability and container logs", "Review JaCoCo HTML report and add meaningful tests", "Correct Jenkins report paths", "Validate mock stubbing and captured request data"],
    ["Run the same verification command locally and in CI", "Keep unit and integration tests separate", "Use isolated test databases", "Publish reports even after test failure", "Protect credentials", "Use meaningful quality gates", "Do not deploy when mandatory tests fail"],
    "Build the complete payment testing pipeline. Demonstrate successful payment, rejected payment, duplicate request, gateway timeout, controller validation, PostgreSQL persistence, coverage reporting, and Jenkins test publication. Record the evidence for every pipeline stage."
  )
};
