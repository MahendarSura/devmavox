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
    overview,
    purpose,
    architecture,
    workflow,
    example,
    commands,
    configuration,
    failures,
    recovery,
    bestPractices,
    exercise
  };
}

export const stageFiveLessonOverrides: Record<string, CicdTopicLesson> = {

  "5|Testing Fundamentals": makeLesson(
    "Software testing checks whether an application behaves according to its requirements. In a Java Spring Boot application, tests can validate individual methods, interactions between components and complete application behavior. Automated tests run repeatedly without requiring a person to manually verify every operation.",
    "Testing catches defects before they reach production. In a CI/CD pipeline, automated tests provide evidence that a payment-service change is safe enough to continue to quality scanning, packaging and deployment.",
    "Developer change → test source code → test framework → application code execution → assertions → test result and report → CI pipeline decision.",
    [
      "Understand the business requirement and expected behavior.",
      "Identify the component or workflow that needs validation.",
      "Write a test with clear input data and expected output.",
      "Execute the test using Maven.",
      "Inspect assertions and failure messages.",
      "Publish test reports from the CI pipeline.",
      "Block promotion when required tests fail."
    ],
    "A payment-service must reject a payment with a negative amount. A unit test supplies -100 as input and verifies that the service returns a validation error rather than creating a payment record.",
    [
      "mvn test",
      "mvn clean test",
      "mvn verify",
      "mvn -Dtest=PaymentServiceTest test",
      "Get-ChildItem .\\target\\surefire-reports"
    ],
    "Store Java tests under src/test/java and test resources under src/test/resources. Use JUnit 5 for test execution and assertions. Configure Maven Surefire to discover unit tests and publish the generated reports in Jenkins.",
    [
      "A test does not cover an important business rule.",
      "An assertion checks the wrong expected value.",
      "Tests pass locally but fail in the CI environment.",
      "Tests depend on execution order or shared state.",
      "A pipeline ignores test failures and continues."
    ],
    [
      "Read the failing test name and assertion message.",
      "Reproduce the failure with the same Maven command.",
      "Compare test data, environment variables and Java versions.",
      "Remove hidden dependencies between tests.",
      "Verify that Maven returns a non-zero exit code for failures."
    ],
    [
      "Write tests for business behavior, not implementation details alone.",
      "Keep tests independent and repeatable.",
      "Use meaningful test names and assertions.",
      "Run tests automatically on every pull request.",
      "Treat unexplained test failures as release blockers."
    ],
    "Write tests for successful payment creation, negative payment amount and missing customer ID. Run mvn test and explain what each assertion proves."
  ),

  "5|JUnit 5 Architecture": makeLesson(
    "JUnit 5 is a Java testing platform with three main parts: JUnit Platform, JUnit Jupiter and JUnit Vintage. The Platform provides the test execution infrastructure, Jupiter provides the programming model for modern tests, and Vintage supports older JUnit 3 and JUnit 4 tests when configured.",
    "Understanding JUnit architecture helps engineers configure Maven test execution correctly and diagnose problems involving test engines, test discovery and incompatible test dependencies.",
    "Maven Surefire → JUnit Platform launcher → selected test engine → test class and lifecycle callbacks → assertions → execution results.",
    [
      "Add the appropriate JUnit Jupiter dependency.",
      "Confirm that Maven Surefire supports the configured JUnit Platform setup.",
      "Create a test class under src/test/java.",
      "Annotate test methods with @Test.",
      "Run the test through Maven.",
      "Inspect the test engine and execution report."
    ],
    "The payment-service uses JUnit Jupiter to test PaymentService. Surefire discovers the test class and delegates execution through the JUnit Platform so test results appear in the Maven report.",
    [
      "mvn dependency:tree -Dincludes=org.junit",
      "mvn test",
      "mvn -Dtest=PaymentServiceTest test",
      "mvn help:effective-pom",
      "mvn dependency:tree -Dincludes=org.junit.platform"
    ],
    "Use a consistent JUnit Jupiter version, preferably managed through a compatible Spring Boot dependency set. Include the test starter when using Spring Boot. Avoid mixing incompatible JUnit Platform, Jupiter and Vintage versions.",
    [
      "Maven reports that no tests were found.",
      "A required JUnit test engine is missing.",
      "JUnit dependency versions conflict.",
      "Old JUnit tests are not discovered by the configured engine."
    ],
    [
      "Inspect the resolved JUnit dependency tree.",
      "Check test class naming and source directory placement.",
      "Verify Surefire and JUnit Platform compatibility.",
      "Add Vintage only when legacy JUnit tests genuinely require it.",
      "Run one test class explicitly and inspect the report."
    ],
    [
      "Use JUnit Jupiter for new test development.",
      "Keep test engine versions compatible.",
      "Avoid unnecessary legacy test engines.",
      "Use Maven dependency management for consistent versions.",
      "Verify test discovery in CI after framework upgrades."
    ],
    "Create a JUnit 5 test class with two test methods. Run it through Maven and identify how Surefire, the JUnit Platform and the Jupiter engine participate in execution."
  ),

  "5|Test Annotations": makeLesson(
    "JUnit 5 annotations describe test methods, test lifecycle callbacks, disabled tests, parameterized tests and test grouping. Common annotations include @Test, @BeforeEach, @AfterEach, @BeforeAll, @AfterAll, @Disabled, @DisplayName and @Nested.",
    "Annotations make test behavior explicit and reduce repeated setup code. Correct lifecycle usage helps tests initialize required data and release resources without affecting other test cases.",
    "JUnit test class → lifecycle callbacks → annotated test method → assertions → cleanup callbacks → test result.",
    [
      "Create a test class using the JUnit Jupiter API.",
      "Use @Test for individual test cases.",
      "Use @BeforeEach for per-test setup.",
      "Use @AfterEach to release per-test resources.",
      "Use @BeforeAll and @AfterAll for class-level setup and cleanup.",
      "Use @DisplayName to make reports understandable.",
      "Run tests and inspect execution order."
    ],
    "A PaymentServiceTest creates a fresh service fixture before each test. A temporary test resource is cleaned up afterward so one payment test cannot influence another.",
    [
      "mvn -Dtest=PaymentServiceTest test",
      "mvn test",
      "mvn -Dtest=PaymentServiceTest#shouldRejectNegativeAmount test"
    ],
    "Import annotations from org.junit.jupiter.api. Use static lifecycle methods for @BeforeAll and @AfterAll unless the test instance lifecycle is configured differently. Avoid using @Disabled to hide unresolved production defects.",
    [
      "A lifecycle method is not executed because its signature is invalid.",
      "Shared setup causes one test to affect another.",
      "A disabled test is accidentally committed without explanation.",
      "A cleanup callback fails and hides the original test failure."
    ],
    [
      "Check annotation imports and lifecycle method signatures.",
      "Review whether setup should run once per class or before every test.",
      "Move mutable test state into per-test fixtures.",
      "Inspect cleanup exceptions separately from the original failure.",
      "Re-enable disabled tests after resolving the documented issue."
    ],
    [
      "Use lifecycle callbacks only for genuine shared setup.",
      "Keep each test independent.",
      "Give test methods descriptive names.",
      "Document temporarily disabled tests with a reason.",
      "Always clean up external resources created by tests."
    ],
    "Create a test class with @BeforeEach, @AfterEach, @Test and @DisplayName. Add two payment tests and verify that setup runs separately for each test."
  ),

  "5|Assertions": makeLesson(
    "Assertions compare actual application behavior with expected results. JUnit 5 provides assertions such as assertEquals, assertTrue, assertFalse, assertNull, assertNotNull, assertThrows and assertAll. A failed assertion marks the test as failed and provides diagnostic information.",
    "Assertions turn business requirements into executable checks. A payment test should not merely execute a method; it must verify the returned result, important state changes and expected exceptions.",
    "Test input → application method → actual result or exception → JUnit assertion → pass or failure report.",
    [
      "Choose a business behavior to validate.",
      "Prepare the required test input.",
      "Execute the application method.",
      "Capture the returned value or exception.",
      "Write assertions for expected behavior.",
      "Run the test and inspect failure messages."
    ],
    "A payment calculation test supplies an amount of 500 and a fee of 10. It asserts that the calculated total is 510. A separate test uses assertThrows to verify that a negative amount is rejected.",
    [
      "mvn -Dtest=PaymentCalculationTest test",
      "mvn test",
      "mvn -Dtest=PaymentValidationTest test"
    ],
    "Import assertions from org.junit.jupiter.api.Assertions. Prefer expected-versus-actual assertions with meaningful messages when they improve diagnosis. Use assertAll when several independent checks should be reported together.",
    [
      "An assertion checks an unrelated or incorrect value.",
      "A test passes because it contains no meaningful assertions.",
      "An exception is expected but the test does not verify its type.",
      "Floating-point calculations fail because of precision assumptions."
    ],
    [
      "Read the assertion's expected and actual values.",
      "Verify the test input and business requirement.",
      "Use BigDecimal for financial calculations where decimal precision matters.",
      "Use assertThrows to validate expected exceptions.",
      "Add assertions for important side effects and rerun the test."
    ],
    [
      "Assert business outcomes, not just method execution.",
      "Use precise assertions for financial values.",
      "Check exception types and important messages.",
      "Avoid assertions that depend on unstable timestamps or random IDs.",
      "Keep assertion failures easy to understand."
    ],
    "Write assertions for payment total calculation, invalid payment amount and missing customer data. Introduce one incorrect expected value and inspect the failure report."
  ),

  "5|Test Lifecycle": makeLesson(
    "The JUnit test lifecycle defines when a test instance is created and when setup, test execution and cleanup callbacks run. The default lifecycle creates a new test instance for each test method. JUnit also supports a per-class lifecycle when explicitly configured.",
    "Lifecycle management prevents shared data, open connections and temporary resources from leaking between tests. It is especially important when testing services that use databases, files or external resources.",
    "Test engine creates instance → BeforeAll → BeforeEach → test method → AfterEach → AfterAll → final result.",
    [
      "Choose the test instance lifecycle.",
      "Prepare class-level resources when required.",
      "Initialize test-specific state before each method.",
      "Execute the test and assertions.",
      "Release per-test resources.",
      "Release class-level resources after all tests.",
      "Verify repeated execution produces the same results."
    ],
    "A payment repository integration test starts a database container once for the test class and creates a fresh payment record before each test. Cleanup prevents records from affecting later test cases.",
    [
      "mvn -Dtest=PaymentRepositoryTest test",
      "mvn test",
      "mvn -Dtest=PaymentRepositoryTest -DtestInstanceLifecycle=per_class test"
    ],
    "Use @BeforeAll and @AfterAll for class-level resources and @BeforeEach and @AfterEach for per-test setup and cleanup. If using @TestInstance(TestInstance.Lifecycle.PER_CLASS), understand that mutable fields can be shared across methods.",
    [
      "One test passes alone but fails when the full suite runs.",
      "A shared mutable field retains data between tests.",
      "Database or file resources remain open after execution.",
      "A lifecycle callback uses an unsupported method signature."
    ],
    [
      "Run the failing test alone and then with the complete suite.",
      "Inspect mutable fields and shared static state.",
      "Move test-specific state into @BeforeEach.",
      "Close resources in cleanup callbacks or managed resource scopes.",
      "Repeat the suite to confirm deterministic behavior."
    ],
    [
      "Prefer independent test instances.",
      "Keep mutable state local to each test.",
      "Close database, file and network resources.",
      "Use class-level initialization only when it improves test performance safely.",
      "Avoid relying on test execution order."
    ],
    "Create two tests that use a shared test fixture. Demonstrate the difference between per-method and per-class lifecycle behavior and ensure cleanup runs after each test."
  ),

  "5|Parameterized Tests": makeLesson(
    "Parameterized tests execute the same test logic with multiple input values. JUnit 5 supports sources such as @ValueSource, @CsvSource, @MethodSource, @NullSource and @EnumSource. Each supplied argument set produces a separate test invocation.",
    "Parameterized tests reduce duplicated test code and make it easier to verify boundary values, validation rules and combinations of payment inputs consistently.",
    "Argument source → parameterized test invocation → application behavior → assertion for each input set → individual execution results.",
    [
      "Identify a behavior that must be tested with multiple inputs.",
      "Choose a suitable JUnit argument source.",
      "Define test parameters and expected results.",
      "Execute the parameterized test.",
      "Inspect each invocation in the test report.",
      "Add boundary and invalid input cases."
    ],
    "The payment amount validator accepts positive amounts and rejects zero or negative values. A @CsvSource test supplies several amounts and expected validation results using the same test method.",
    [
      "mvn -Dtest=PaymentValidationTest test",
      "mvn test"
    ],
    "Use @ParameterizedTest and the appropriate source annotation. Include the required JUnit parameterized-test support through the selected JUnit dependency setup. Use @MethodSource when test cases need richer Java objects.",
    [
      "The parameterized test is not discovered.",
      "The supplied arguments do not match method parameter types.",
      "A CSV value is parsed incorrectly.",
      "A test case has an invalid expected result."
    ],
    [
      "Check the parameterized-test dependency and imports.",
      "Compare source argument count and test method parameters.",
      "Inspect CSV quoting, delimiters and conversion behavior.",
      "Verify each expected result against the business requirement.",
      "Run the individual parameterized class and inspect every invocation."
    ],
    [
      "Use descriptive argument names when possible.",
      "Include boundary and invalid values.",
      "Keep test data readable.",
      "Use MethodSource for complex scenarios.",
      "Avoid creating one enormous parameterized test that mixes unrelated behavior."
    ],
    "Write a parameterized payment amount validation test with positive, zero and negative values. Include at least five inputs and verify each invocation separately."
  ),

  "5|Mockito Fundamentals": makeLesson(
    "Mockito is a Java mocking framework used to create test doubles for dependencies. It allows a test to control dependency responses and verify interactions without calling real databases, payment gateways or other external systems.",
    "Mockito helps unit tests focus on the behavior of the class under test. A PaymentService can be tested with a mocked PaymentRepository so the test does not require a running database.",
    "JUnit test → Mockito creates mock dependency → test injects mock into service → service executes → mock returns configured response → assertions and interaction verification.",
    [
      "Identify dependencies used by the class under test.",
      "Create mock objects for external collaborators.",
      "Configure expected dependency responses.",
      "Inject mocks into the service.",
      "Execute the service method.",
      "Assert returned behavior and verify required interactions."
    ],
    "The payment service calls PaymentRepository to save a transaction. A Mockito test returns a controlled saved-payment object from the repository mock and verifies that save was called once.",
    [
      "mvn -Dtest=PaymentServiceTest test",
      "mvn test",
      "mvn dependency:tree -Dincludes=org.mockito"
    ],
    "Use Mockito through a compatible Mockito dependency or Spring Boot test starter. JUnit 5 tests can use MockitoExtension with @ExtendWith(MockitoExtension.class), @Mock and @InjectMocks.",
    [
      "Mockito cannot create a mock because the dependency is missing.",
      "The service uses a real dependency instead of the intended mock.",
      "A test expects a method call that never occurred.",
      "A mock is configured with an argument that does not match the actual call."
    ],
    [
      "Check Mockito dependencies and JUnit extension configuration.",
      "Verify that the service receives the mocked collaborator.",
      "Inspect method arguments and configured stubbing.",
      "Use argument matchers consistently when matching multiple parameters.",
      "Verify only meaningful interactions required by the business behavior."
    ],
    [
      "Mock external collaborators, not every internal method.",
      "Keep unit tests independent from real infrastructure.",
      "Use clear stubbing and verification.",
      "Avoid excessive interaction verification.",
      "Do not confuse a mocked unit test with an integration test."
    ],
    "Create a PaymentService unit test using a mocked PaymentRepository. Configure a save response, execute the service and verify the repository interaction."
  ),

  "5|Mocking Dependencies": makeLesson(
    "Mocking dependencies means replacing a real collaborator with a controlled test double. Mockito can define returned values, exceptions and behavior for specific method calls. This allows tests to simulate success, validation failures, timeouts and unavailable downstream systems.",
    "Payment applications depend on databases, notification systems and external gateways. Mocking these dependencies makes unit tests fast and predictable while allowing engineers to test how the service responds to different dependency outcomes.",
    "Test fixture → mocked repository or gateway → configured response or exception → service method → error handling and result assertions.",
    [
      "Identify the dependency boundary being tested.",
      "Create a mock for that dependency.",
      "Configure normal and failure responses.",
      "Execute the service operation.",
      "Assert the service result and error handling.",
      "Verify that the expected dependency call occurred."
    ],
    "A payment gateway mock returns APPROVED for one test and throws a timeout exception for another. The PaymentService must return a successful result in the first case and a controlled failure in the second.",
    [
      "mvn -Dtest=PaymentGatewayServiceTest test",
      "mvn test"
    ],
    "Use Mockito when(...).thenReturn(...) for return values and when(...).thenThrow(...) for exceptions. Use doReturn or doThrow where appropriate for void methods or special spy scenarios. Keep test fixtures focused on the dependency contract.",
    [
      "A mock returns null because no behavior was configured.",
      "A timeout scenario is not tested.",
      "A mock is not injected into the service.",
      "Over-mocking hides defects in the class under test."
    ],
    [
      "Inspect the configured stubbing for the actual method arguments.",
      "Confirm constructor or field injection receives the mock.",
      "Add explicit success, exception and boundary scenarios.",
      "Keep real business logic in the service under test.",
      "Use integration tests to verify real dependency wiring separately."
    ],
    [
      "Mock external systems at clear boundaries.",
      "Test both success and failure responses.",
      "Avoid mocking simple value objects.",
      "Keep stubbing close to the test that needs it.",
      "Verify observable behavior rather than internal implementation details."
    ],
    "Mock a payment gateway with approved, declined and timeout responses. Write three tests and verify how PaymentService handles each outcome."
  ),

  "5|Service Unit Testing": makeLesson(
    "Service unit testing validates business logic in a service class without starting the complete Spring application or requiring real infrastructure. Dependencies such as repositories and gateways are replaced with controlled mocks, while the service's actual methods execute.",
    "Service tests provide fast feedback on business rules. Payment amount validation, fee calculation, transaction state changes and duplicate-payment handling should be tested before changes reach integration testing.",
    "JUnit test → real PaymentService instance → mocked repository and gateway → business logic execution → result and interaction assertions.",
    [
      "Identify the service method and its business rules.",
      "List the service's external dependencies.",
      "Create mocks for those dependencies.",
      "Construct or inject the real service.",
      "Execute success, invalid-input and dependency-failure scenarios.",
      "Assert return values, exceptions and required interactions."
    ],
    "PaymentService calculates a transaction fee and saves the payment. A unit test mocks the repository, supplies a payment amount and verifies the calculated total and saved status.",
    [
      "mvn -Dtest=PaymentServiceTest test",
      "mvn test",
      "mvn -Dtest=PaymentServiceTest#shouldCalculatePaymentFee test"
    ],
    "Use JUnit Jupiter with MockitoExtension. Prefer constructor injection in production service classes because it makes dependencies explicit and simplifies unit-test construction. Use BigDecimal for monetary calculations.",
    [
      "A service test accidentally connects to a real database.",
      "The test verifies only that a method returned without an exception.",
      "Mocked repository behavior does not match the service's actual call.",
      "Financial calculations fail due to floating-point precision."
    ],
    [
      "Check whether the test starts Spring or creates real infrastructure unnecessarily.",
      "Inspect service dependencies and replace external collaborators with mocks.",
      "Assert important business results and state transitions.",
      "Use BigDecimal and explicit rounding rules for money.",
      "Run the test independently and as part of the full suite."
    ],
    [
      "Test one business behavior per test where practical.",
      "Keep the service real and mock its external dependencies.",
      "Cover success, invalid input and dependency failures.",
      "Avoid database access in pure unit tests.",
      "Use meaningful test names and business-focused assertions."
    ],
    "Write PaymentService unit tests for successful payment, duplicate payment, invalid amount and gateway timeout. Verify the service result and repository interactions."
  ),

  "5|Controller Testing": makeLesson(
    "Controller testing validates HTTP endpoints, request mapping, input validation, response status codes and JSON payloads. Spring MVC tests can use MockMvc to exercise controller behavior without starting a real web server.",
    "Controller tests catch API contract defects before deployment. They verify that clients receive the expected HTTP response when payment requests are valid, malformed, unauthorized or refer to missing resources.",
    "Mock HTTP request → Spring MVC dispatcher → controller → service dependency → HTTP response → status, headers and JSON assertions.",
    [
      "Identify the controller endpoint and HTTP method.",
      "Prepare valid and invalid request payloads.",
      "Use MockMvc to submit the request.",
      "Mock service behavior where the test focuses on the controller.",
      "Assert HTTP status, response fields and validation errors.",
      "Run controller tests through Maven."
    ],
    "A POST /api/payments endpoint accepts a valid payment request and returns HTTP 201. A request with a negative amount returns HTTP 400 with a validation error response.",
    [
      "mvn -Dtest=PaymentControllerTest test",
      "mvn test"
    ],
    "Use @WebMvcTest for focused MVC slice tests and @AutoConfigureMockMvc where appropriate. Use MockMvc request builders and JSONPath assertions. Mock the service layer when testing controller behavior in isolation.",
    [
      "The endpoint returns an unexpected HTTP status.",
      "Request JSON cannot be deserialized.",
      "Validation annotations are not applied.",
      "The test loads unrelated application configuration and fails.",
      "The controller response contract changes unexpectedly."
    ],
    [
      "Inspect the MockMvc response status, body and headers.",
      "Verify request DTO field names and JSON types.",
      "Check validation annotations and controller advice.",
      "Use the correct Spring test slice for the intended test scope.",
      "Compare response JSON with the API contract."
    ],
    [
      "Test successful and invalid request paths.",
      "Verify HTTP status and response structure.",
      "Keep controller tests focused on HTTP behavior.",
      "Test exception-to-response mapping.",
      "Avoid relying on a real external payment gateway in controller slice tests."
    ],
    "Write MockMvc tests for payment creation, invalid amount and missing payment ID. Verify HTTP status codes and important JSON response fields."
  ),

  "5|Spring Boot Integration Testing": makeLesson(
    "Spring Boot integration testing verifies that multiple application components work together using Spring's application context. Unlike isolated unit tests, integration tests can validate dependency injection, repositories, transactions, configuration and application wiring.",
    "A service may pass unit tests while failing when Spring creates its real beans or connects to a database. Integration testing catches these wiring and infrastructure problems before deployment.",
    "JUnit test → Spring TestContext → application configuration and dependency injection → real or controlled infrastructure → component interaction → assertions.",
    [
      "Choose the application context required by the test.",
      "Use @SpringBootTest when full application wiring is necessary.",
      "Configure test properties and infrastructure.",
      "Execute the application workflow.",
      "Assert component behavior and persisted results.",
      "Clean up test data and inspect reports."
    ],
    "A payment integration test starts the Spring application context, submits a payment through the service and verifies that the transaction is stored correctly by the configured repository.",
    [
      "mvn -Dtest=PaymentIntegrationTest test",
      "mvn verify",
      "mvn -Dtest=PaymentIntegrationTest -Dspring.profiles.active=test test"
    ],
    "Use @SpringBootTest for full-context tests and @ActiveProfiles(\"test\") for test-specific configuration. Configure database connection properties through safe test configuration. Use transactional rollback when appropriate, but verify behavior that depends on actual commit semantics separately.",
    [
      "Spring application context fails to start.",
      "A required bean is missing or ambiguous.",
      "Database connection settings point to an unavailable service.",
      "Test data leaks between executions.",
      "A test passes with mocks but fails with actual component wiring."
    ],
    [
      "Inspect the first Spring context startup exception.",
      "Check bean definitions, profiles and conditional configuration.",
      "Verify database availability and test connection properties.",
      "Clean test data or use controlled transaction rollback.",
      "Rerun the integration test with the same environment used in CI."
    ],
    [
      "Use full application context only when required.",
      "Keep test configuration separate from production secrets.",
      "Make test infrastructure reproducible.",
      "Control test data and cleanup.",
      "Run integration tests in CI before artifact promotion."
    ],
    "Create a Spring Boot integration test for payment creation. Start the application context, save a payment using the real repository and verify the persisted record."
  ),

  "5|Testcontainers": makeLesson(
    "Testcontainers is a Java library that starts disposable containerized dependencies for automated tests. It can provide real databases, message brokers and other services during test execution. The container is started for the test and stopped afterward according to the configured lifecycle.",
    "Testcontainers reduces differences between local and CI integration tests. Instead of relying on a developer-installed database, a payment-service test can start a known database image and validate real repository behavior.",
    "JUnit test → Testcontainers lifecycle → Docker runtime → disposable database container → Spring application connection → integration assertions → container cleanup.",
    [
      "Confirm Docker is available on the test machine or CI agent.",
      "Add the required Testcontainers modules and JUnit integration.",
      "Declare a database container with an approved image.",
      "Start the container and expose its connection details to Spring.",
      "Run repository and integration tests.",
      "Verify cleanup and inspect container logs when failures occur."
    ],
    "The payment-service uses a PostgreSQL Testcontainer for repository integration tests. The test obtains the temporary database URL and credentials from the container instead of using a developer's permanent database.",
    [
      "docker version",
      "docker ps",
      "mvn -Dtest=PaymentRepositoryIT test",
      "mvn verify",
      "docker images"
    ],
    "Add Testcontainers JUnit Jupiter and the database module with compatible versions. Configure container lifecycle using supported JUnit integration or Spring Boot service connections. Pin container image versions and never use production credentials in tests.",
    [
      "Docker daemon is unavailable to the test process.",
      "The container image cannot be pulled.",
      "The database starts but the application connects before it is ready.",
      "CI agents lack permission to access the Docker socket.",
      "Tests leak containers or consume excessive resources."
    ],
    [
      "Check Docker daemon connectivity and agent permissions.",
      "Verify image registry access and the selected image tag.",
      "Use container readiness checks rather than fixed sleep delays.",
      "Inspect container logs and mapped ports.",
      "Review lifecycle cleanup and CI resource limits."
    ],
    [
      "Use pinned and trusted container images.",
      "Use readiness checks for dependent services.",
      "Keep test containers isolated from production systems.",
      "Ensure cleanup occurs after execution.",
      "Configure CI agents with controlled container runtime access."
    ],
    "Create a PostgreSQL Testcontainer for a payment repository test. Run the test locally and in a CI-like environment, verify database connectivity and confirm that the temporary container is cleaned up."
  ),

  "5|Code Coverage": makeLesson(
    "Code coverage measures which parts of application code are executed by tests. JaCoCo is commonly used with Maven to collect coverage data and generate reports. Coverage can include instruction, line, branch and method metrics.",
    "Coverage helps teams identify untested code paths, especially critical payment validation and error-handling logic. It is a diagnostic measurement, not proof that tests are correct or that every business requirement is validated.",
    "Test execution → JaCoCo instrumentation or agent → execution data → report generation → coverage metrics → quality gate evaluation.",
    [
      "Configure JaCoCo in the Maven build.",
      "Run unit and integration tests as intended.",
      "Generate the coverage report.",
      "Inspect line and branch coverage.",
      "Identify important uncovered business paths.",
      "Add meaningful tests and regenerate the report."
    ],
    "A payment-service has high line coverage but lacks a test for gateway timeout handling. The team reviews branch coverage and adds a test for the timeout path instead of focusing only on the overall percentage.",
    [
      "mvn clean test",
      "mvn verify",
      "mvn jacoco:report",
      "Get-ChildItem .\\target\\site\\jacoco",
      "Get-Content .\\target\\site\\jacoco\\index.html -TotalCount 5"
    ],
    "Configure JaCoCo prepare-agent and report goals with a compatible plugin version. Ensure test execution produces coverage data before report generation. Configure exclusions carefully and document why generated or non-business code is excluded.",
    [
      "Coverage report is missing because tests did not execute.",
      "JaCoCo execution data file is empty or unavailable.",
      "Coverage is unexpectedly low after a code change.",
      "Exclusions hide important application code.",
      "A coverage threshold fails in the CI quality gate."
    ],
    [
      "Check JaCoCo plugin execution and generated execution data.",
      "Confirm that tests ran in the same build that generates the report.",
      "Inspect source and class inclusion settings.",
      "Review exclusions and restore important business classes.",
      "Add tests for meaningful uncovered branches and regenerate the report."
    ],
    [
      "Use coverage to guide test improvement, not as the only quality measure.",
      "Prioritize critical business and error-handling paths.",
      "Review branch coverage for conditional logic.",
      "Keep exclusions narrow and documented.",
      "Publish coverage reports with CI build evidence."
    ],
    "Configure JaCoCo for the payment-service. Generate a report, identify an uncovered payment validation branch and write a test that exercises it."
  ),

  "5|Test Reports": makeLesson(
    "Test reports provide evidence about which tests executed, passed, failed or were skipped. Maven Surefire and Failsafe generate machine-readable and human-readable reports. CI systems can publish these reports so developers can inspect failures without searching through the entire build console.",
    "Reports make test quality visible to developers and release reviewers. They help identify recurring failures, flaky tests and missing test execution in a CI pipeline.",
    "Maven test plugins → test execution → XML and text reports → Jenkins report publisher → build result and developer investigation.",
    [
      "Run the required Maven test lifecycle.",
      "Locate Surefire and Failsafe report directories.",
      "Inspect XML and text report files.",
      "Configure Jenkins to publish JUnit-compatible XML reports.",
      "Review failed and skipped test counts.",
      "Retain reports for failed builds and release evidence."
    ],
    "Jenkins runs mvn clean verify for payment-service and publishes target/surefire-reports/*.xml and target/failsafe-reports/*.xml. Developers can open the failed test report directly from the build page.",
    [
      "mvn clean test",
      "mvn verify",
      "Get-ChildItem .\\target\\surefire-reports",
      "Get-ChildItem .\\target\\failsafe-reports",
      "Get-ChildItem .\\target -Recurse -Filter TEST-*.xml"
    ],
    "Configure Jenkins JUnit report publishing with the generated XML report paths. Ensure the pipeline preserves reports even when Maven fails. Use allowEmptyResults only when an empty report set is an intentional and separately validated condition.",
    [
      "Jenkins reports that no test result files were found.",
      "Maven fails before report generation.",
      "A report path does not match the workspace structure.",
      "Test reports are deleted before Jenkins archives them.",
      "Skipped tests are mistaken for successful tests."
    ],
    [
      "Check whether Maven reached the test execution phase.",
      "Locate the actual XML report directories.",
      "Correct the Jenkins report pattern to match the workspace.",
      "Publish reports in a post-build action that runs after failure.",
      "Review passed, failed and skipped counts separately."
    ],
    [
      "Publish both unit and integration test reports.",
      "Retain reports for failed builds.",
      "Do not hide missing reports with broad empty-result settings.",
      "Track repeated failures and flaky tests.",
      "Use report evidence during release approval."
    ],
    "Configure a Jenkins pipeline to run Maven tests and publish Surefire and Failsafe XML reports. Cause one test failure and verify that the failed report remains available."
  ),

  "5|Flaky Test Troubleshooting": makeLesson(
    "A flaky test produces different results without a relevant code change. It may pass in one execution and fail in another because of timing assumptions, shared state, concurrency, external services, random data or environment differences.",
    "Flaky tests reduce confidence in CI results and delay releases. Teams must identify the underlying source of nondeterminism instead of repeatedly rerunning tests until they pass.",
    "Test execution → nondeterministic condition → inconsistent assertion result → evidence collection → root cause isolation → deterministic correction.",
    [
      "Record the failing test name and complete stack trace.",
      "Check whether the failure is reproducible locally.",
      "Repeat the test in isolation and with the full suite.",
      "Inspect shared state, timing and external dependencies.",
      "Capture logs and test data around the failure.",
      "Correct the nondeterministic behavior and rerun repeatedly."
    ],
    "A payment integration test expects a notification within 100 milliseconds. On a busy Jenkins agent the notification arrives later, causing intermittent failures. The team replaces the fixed timing assumption with a bounded condition-based wait.",
    [
      "mvn -Dtest=PaymentNotificationTest test",
      "mvn -Dtest=PaymentNotificationTest -Dsurefire.rerunFailingTestsCount=3 test",
      "mvn clean verify",
      "mvn -Dtest=PaymentNotificationTest -DforkCount=1 test"
    ],
    "Configure deterministic test data, controlled time and reliable resource lifecycle. Use retries only as temporary diagnostic evidence, not as a permanent replacement for fixing the root cause. Configure timeouts that reflect realistic system behavior.",
    [
      "Tests fail only when the full suite runs.",
      "A test depends on another test's database record.",
      "Timing-based assertions fail on slower CI agents.",
      "Concurrent tests modify shared resources.",
      "Random test data makes failures difficult to reproduce."
    ],
    [
      "Run the failing test repeatedly and capture each result.",
      "Compare isolated execution with full-suite execution.",
      "Replace fixed sleeps with condition-based waits.",
      "Use unique test data and isolate shared resources.",
      "Control clocks, randomness and external service responses.",
      "Remove temporary retries after the underlying issue is fixed."
    ],
    [
      "Make tests independent and deterministic.",
      "Avoid fixed sleeps for synchronization.",
      "Use stable test data and controlled clocks.",
      "Isolate concurrent test resources.",
      "Track flaky tests and assign permanent fixes."
    ],
    "Create a controlled timing-related flaky test in a test branch. Reproduce its inconsistent behavior, replace the fixed wait with a condition-based approach and demonstrate stable repeated execution."
  ),

  "5|Production Hands-on Lab": makeLesson(
    "This lab builds a complete automated testing workflow for a Spring Boot payment-service. It combines JUnit 5, Mockito, service and controller tests, integration testing, Testcontainers, JaCoCo coverage and Maven test reporting.",
    "A production CI pipeline must prove that application behavior is validated before quality scanning and packaging. The lab demonstrates how different test layers provide evidence and how failures block unsafe changes.",
    "Git pull request → Jenkins checkout → Maven toolchain → JUnit unit tests → Mockito service tests → MockMvc controller tests → Spring integration tests → Testcontainers database → JaCoCo report → Surefire and Failsafe reports → pipeline decision.",
    [
      "Prepare the payment-service repository and test dependencies.",
      "Create JUnit tests for payment validation and fee calculation.",
      "Mock repository and gateway dependencies with Mockito.",
      "Test REST endpoints using MockMvc.",
      "Create Spring Boot integration tests for repository behavior.",
      "Start a disposable database with Testcontainers.",
      "Configure JaCoCo and inspect coverage.",
      "Configure Surefire and Failsafe report generation.",
      "Publish test reports in Jenkins.",
      "Introduce a controlled failing test and verify that the pipeline stops.",
      "Fix the defect and produce a successful test report."
    ],
    "A pull request changes payment fee calculation. Jenkins runs service unit tests, controller tests and database integration tests. A negative-amount regression test fails the pipeline. The developer fixes the validation logic, reruns the complete suite and attaches test and coverage reports to the build.",
    [
      "mvn -version",
      "docker version",
      "mvn dependency:tree",
      "mvn clean test",
      "mvn verify",
      "mvn jacoco:report",
      "Get-ChildItem .\\target\\surefire-reports",
      "Get-ChildItem .\\target\\failsafe-reports",
      "Get-ChildItem .\\target\\site\\jacoco"
    ],
    "Keep test dependencies version-compatible and use Maven profiles only for non-secret test configuration. Configure JUnit Jupiter, Mockito, Spring Boot Test, Testcontainers and JaCoCo as required. Jenkins should publish XML reports and preserve failure evidence. Never use production payment credentials or production databases in automated tests.",
    [
      "JUnit tests are not discovered because test dependencies or naming conventions are incorrect.",
      "Mockito tests accidentally call real external services.",
      "Spring application context fails due to invalid test configuration.",
      "Testcontainers cannot access Docker on the CI agent.",
      "Coverage data or test reports are missing.",
      "Flaky tests create inconsistent pipeline results."
    ],
    [
      "Verify Java and Maven versions on the Jenkins agent.",
      "Inspect dependency:tree and test plugin configuration.",
      "Run the failing test class independently.",
      "Check mock injection and Spring test context errors.",
      "Verify Docker access, image availability and container readiness.",
      "Inspect Surefire, Failsafe and JaCoCo output directories.",
      "Fix the root cause and rerun mvn clean verify."
    ],
    [
      "Keep unit, controller and integration tests at appropriate test boundaries.",
      "Use deterministic test data and isolated infrastructure.",
      "Use Testcontainers for reproducible integration dependencies.",
      "Publish reports and coverage evidence.",
      "Block pipeline progression when required tests fail.",
      "Do not hide failures through skipped tests or permanent retries.",
      "Keep production credentials and customer data out of test environments."
    ],
    "Complete the payment-service testing pipeline. Demonstrate JUnit assertions, Mockito dependency isolation, MockMvc endpoint validation, Spring integration testing, Testcontainers database execution, JaCoCo coverage and Jenkins report publishing. Introduce a controlled regression, prove the pipeline fails, fix it and produce a successful final test report."
  )
};
