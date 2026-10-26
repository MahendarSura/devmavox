
export interface TomcatQuestion {
  id: string;
  question: string;
  options: string[];
  answer: number;
}

export const tomcatQuestions: TomcatQuestion[] = [
  {
    id: "tomcat-1",
    question: "What is Apache Tomcat?",
    options: [
      "A database server",
      "A Java web server and servlet container",
      "A source code repository",
      "A container orchestration tool"
    ],
    answer: 1
  },
  {
    id: "tomcat-2",
    question: "Which applications commonly run on Tomcat?",
    options: [
      "Java web applications",
      "Only Python scripts",
      "Only database queries",
      "Only operating system kernels"
    ],
    answer: 0
  },
  {
    id: "tomcat-3",
    question: "What is a WAR file?",
    options: [
      "A Windows service file",
      "A database backup",
      "A packaged Java web application",
      "A Linux kernel module"
    ],
    answer: 2
  },
  {
    id: "tomcat-4",
    question: "Which directory usually contains Tomcat configuration files?",
    options: [
      "webapps",
      "logs",
      "temp",
      "conf"
    ],
    answer: 3
  },
  {
    id: "tomcat-5",
    question: "Which directory is the default deployment location for web applications?",
    options: [
      "conf",
      "webapps",
      "lib",
      "work"
    ],
    answer: 1
  },
  {
    id: "tomcat-6",
    question: "Which file configures Tomcat server components and connectors?",
    options: [
      "server.xml",
      "pom.xml",
      "Dockerfile",
      "package.json"
    ],
    answer: 0
  },
  {
    id: "tomcat-7",
    question: "Which file commonly contains Tomcat user and role definitions in a standalone installation?",
    options: [
      "context.xml",
      "web.xml",
      "tomcat-users.xml",
      "logging.properties"
    ],
    answer: 2
  },
  {
    id: "tomcat-8",
    question: "What is the default HTTP port for a standard Tomcat installation?",
    options: [
      "22",
      "3306",
      "443",
      "8080"
    ],
    answer: 3
  },
  {
    id: "tomcat-9",
    question: "Which port is traditionally used by Tomcat for its shutdown command?",
    options: [
      "8080",
      "8005",
      "8443",
      "5432"
    ],
    answer: 1
  },
  {
    id: "tomcat-10",
    question: "Which port is commonly used for HTTPS in a Tomcat configuration?",
    options: [
      "8443",
      "21",
      "25",
      "6379"
    ],
    answer: 0
  },
  {
    id: "tomcat-11",
    question: "What does CATALINA_HOME usually represent?",
    options: [
      "The application's database",
      "The current Git branch",
      "The Tomcat installation directory",
      "The Jenkins workspace"
    ],
    answer: 2
  },
  {
    id: "tomcat-12",
    question: "What does CATALINA_BASE usually represent?",
    options: [
      "The Java compiler version",
      "The remote Git repository",
      "The operating system root",
      "A Tomcat instance's configuration, deployed apps, and runtime data directory"
    ],
    answer: 3
  },
  {
    id: "tomcat-13",
    question: "Which environment variable identifies the Java Development Kit installation?",
    options: [
      "CATALINA_BASE",
      "JAVA_HOME",
      "MAVEN_HOME",
      "NODE_HOME"
    ],
    answer: 1
  },
  {
    id: "tomcat-14",
    question: "Which command is commonly used to check the installed Java version?",
    options: [
      "java -version",
      "tomcat --database",
      "git version-java",
      "systemctl java-version"
    ],
    answer: 0
  },
  {
    id: "tomcat-15",
    question: "On Linux, which script commonly starts Tomcat?",
    options: [
      "npm start",
      "terraform apply",
      "bin/startup.sh",
      "kubectl start tomcat"
    ],
    answer: 2
  },
  {
    id: "tomcat-16",
    question: "Which script commonly stops Tomcat when it was installed from the binary distribution?",
    options: [
      "bin/install.sh",
      "bin/deploy.sh",
      "bin/restart-war.sh",
      "bin/shutdown.sh"
    ],
    answer: 3
  },
  {
    id: "tomcat-17",
    question: "Tomcat does not start. What should you check first?",
    options: [
      "The website's CSS only",
      "Startup logs, Java configuration, and port conflicts",
      "The GitHub profile picture",
      "The database table names only"
    ],
    answer: 1
  },
  {
    id: "tomcat-18",
    question: "Which directory commonly contains Tomcat log files?",
    options: [
      "logs",
      "webapps",
      "bin",
      "lib"
    ],
    answer: 0
  },
  {
    id: "tomcat-19",
    question: "What is the purpose of the bin directory in Tomcat?",
    options: [
      "To store uploaded user documents only",
      "To store database tables",
      "To store startup, shutdown, and other executable scripts",
      "To store only application source code"
    ],
    answer: 2
  },
  {
    id: "tomcat-20",
    question: "What is the purpose of the lib directory?",
    options: [
      "To store server access logs only",
      "To store Git commits",
      "To store Linux device files",
      "To store libraries used by Tomcat"
    ],
    answer: 3
  },
  {
    id: "tomcat-21",
    question: "What happens when a valid application WAR is deployed to the default webapps directory?",
    options: [
      "Tomcat automatically deletes its configuration",
      "Tomcat can deploy and expand the WAR, depending on configuration",
      "Tomcat converts it into a database",
      "Tomcat installs Kubernetes"
    ],
    answer: 1
  },
  {
    id: "tomcat-22",
    question: "If a WAR file is named shop.war, what is its usual context path in a default deployment?",
    options: [
      "/shop",
      "/tomcat-users",
      "/conf",
      "/logs"
    ],
    answer: 0
  },
  {
    id: "tomcat-23",
    question: "What is the usual context path for the ROOT web application?",
    options: [
      "/root",
      "/ROOT",
      "/",
      "/webapps"
    ],
    answer: 2
  },
  {
    id: "tomcat-24",
    question: "A newly deployed application returns HTTP 404. What should you investigate?",
    options: [
      "Only the monitor brightness",
      "Only the keyboard layout",
      "Only the Git author name",
      "Context path, deployment status, application mappings, and logs"
    ],
    answer: 3
  },
  {
    id: "tomcat-25",
    question: "What does HTTP 500 generally indicate in a Tomcat-hosted application?",
    options: [
      "The application always deployed successfully",
      "An internal server-side error",
      "A successful request",
      "A DNS record was definitely deleted"
    ],
    answer: 1
  },
  {
    id: "tomcat-26",
    question: "What does HTTP 503 commonly indicate?",
    options: [
      "The service is unavailable",
      "The request was permanently redirected",
      "The resource was created successfully",
      "The client sent no request"
    ],
    answer: 0
  },
  {
    id: "tomcat-27",
    question: "Tomcat reports that port 8080 is already in use. What is the appropriate action?",
    options: [
      "Delete all WAR files immediately",
      "Disable Java permanently",
      "Identify the process using the port and stop it safely or configure another port",
      "Change the application password"
    ],
    answer: 2
  },
  {
    id: "tomcat-28",
    question: "Which Linux command can show listening TCP ports and associated processes on many distributions?",
    options: [
      "pwd",
      "whoami",
      "mkdir",
      "ss -ltnp"
    ],
    answer: 3
  },
  {
    id: "tomcat-29",
    question: "What is the purpose of the Connector element in server.xml?",
    options: [
      "To create Git branches",
      "To accept and process network connections for a configured protocol",
      "To compile Java source automatically in every case",
      "To back up the entire server"
    ],
    answer: 1
  },
  {
    id: "tomcat-30",
    question: "What is the role of the Engine element in Tomcat's server configuration?",
    options: [
      "To process requests and route them to the appropriate Host",
      "To manage Linux package repositories",
      "To create cloud accounts",
      "To store WAR files only"
    ],
    answer: 0
  },
  {
    id: "tomcat-31",
    question: "What does a Host represent in Tomcat?",
    options: [
      "A Java variable",
      "A database transaction",
      "A virtual host that can contain web applications",
      "A Docker image layer"
    ],
    answer: 2
  },
  {
    id: "tomcat-32",
    question: "What is the purpose of a Context in Tomcat?",
    options: [
      "To define a Linux user",
      "To configure DNS globally",
      "To compile the operating system",
      "To configure an individual web application"
    ],
    answer: 3
  },
  {
    id: "tomcat-33",
    question: "What is the purpose of web.xml in a Java web application?",
    options: [
      "To define AWS billing rules",
      "To configure deployment descriptors such as servlet mappings and filters",
      "To store the Tomcat process ID only",
      "To define Docker networks"
    ],
    answer: 1
  },
  {
    id: "tomcat-34",
    question: "What is a servlet?",
    options: [
      "A Java server-side component that handles requests and responses",
      "A type of physical network cable",
      "A Git hosting platform",
      "A database backup format"
    ],
    answer: 0
  },
  {
    id: "tomcat-35",
    question: "What is the purpose of a servlet filter?",
    options: [
      "To change the Linux kernel",
      "To replace the Java runtime",
      "To intercept requests or responses for tasks such as authentication and logging",
      "To provision EC2 instances automatically"
    ],
    answer: 2
  },
  {
    id: "tomcat-36",
    question: "What is the purpose of a Java web application's deployment descriptor?",
    options: [
      "To store the operating system password",
      "To monitor physical CPU temperature only",
      "To build container images",
      "To describe application deployment configuration"
    ],
    answer: 3
  },
  {
    id: "tomcat-37",
    question: "What is the purpose of Tomcat's Manager application?",
    options: [
      "To replace the Java compiler",
      "To manage deployed web applications through a web interface or supported API",
      "To manage GitHub issues only",
      "To create database schemas automatically"
    ],
    answer: 1
  },
  {
    id: "tomcat-38",
    question: "Why should the Tomcat Manager application be restricted in production?",
    options: [
      "It provides administrative capabilities that could be abused if exposed",
      "It prevents all Java applications from running",
      "It always consumes every CPU core",
      "It disables HTTPS automatically"
    ],
    answer: 0
  },
  {
    id: "tomcat-39",
    question: "What is a good way to secure Tomcat administrative access?",
    options: [
      "Use the same default password everywhere",
      "Expose management ports publicly without controls",
      "Use least-privilege accounts, strong authentication, and network restrictions",
      "Disable all security updates"
    ],
    answer: 2
  },
  {
    id: "tomcat-40",
    question: "What is the safest approach to Tomcat security updates?",
    options: [
      "Never upgrade Tomcat",
      "Download binaries from unknown sources",
      "Apply every update directly to production without testing",
      "Use trusted sources, review advisories, test upgrades, and deploy through a controlled process"
    ],
    answer: 3
  },
  {
    id: "tomcat-41",
    question: "What is the purpose of a reverse proxy in front of Tomcat?",
    options: [
      "To replace all application code",
      "To route requests and potentially handle TLS termination, headers, and load balancing",
      "To convert Java into Python",
      "To store only application source files"
    ],
    answer: 1
  },
  {
    id: "tomcat-42",
    question: "Which server is commonly used as a reverse proxy in front of Tomcat?",
    options: [
      "Nginx",
      "MySQL",
      "Maven",
      "Terraform"
    ],
    answer: 0
  },
  {
    id: "tomcat-43",
    question: "What is load balancing in a Tomcat deployment?",
    options: [
      "Renaming application classes",
      "Deleting application logs",
      "Distributing requests across multiple application instances",
      "Increasing a single user's password length"
    ],
    answer: 2
  },
  {
    id: "tomcat-44",
    question: "Why might a production system run multiple Tomcat instances?",
    options: [
      "To make every request slower",
      "To remove the need for monitoring",
      "To guarantee no software defects",
      "To improve availability, capacity, or deployment flexibility"
    ],
    answer: 3
  },
  {
    id: "tomcat-45",
    question: "What is session persistence in a web application?",
    options: [
      "Saving all source code into server.xml",
      "Preserving user session data across requests, and potentially across restarts or nodes",
      "Keeping TCP ports permanently closed",
      "Automatically compiling every database"
    ],
    answer: 1
  },
  {
    id: "tomcat-46",
    question: "Why can user sessions be lost when requests move between independent Tomcat instances?",
    options: [
      "The instances may not share or replicate session state",
      "HTTP has no response status codes",
      "Tomcat cannot run more than one application",
      "WAR files cannot contain Java classes"
    ],
    answer: 0
  },
  {
    id: "tomcat-47",
    question: "What is a common approach to maintaining sessions across multiple application instances?",
    options: [
      "Store sessions only in temporary local files without backup",
      "Disable every load balancer",
      "Use a suitable shared session store or supported session replication strategy",
      "Use different application URLs for every request"
    ],
    answer: 2
  },
  {
    id: "tomcat-48",
    question: "What does a health check help verify in a Tomcat deployment?",
    options: [
      "That every source-code comment is correct",
      "That the server has no network interface",
      "That the database has no tables",
      "That the instance or application is responding according to the check's criteria"
    ],
    answer: 3
  },
  {
    id: "tomcat-49",
    question: "Tomcat is running, but the application is not responding. What should you check?",
    options: [
      "Only the desktop wallpaper",
      "Application logs, health endpoints, resource usage, dependencies, and network connectivity",
      "Only the GitHub repository description",
      "Only the monitor refresh rate"
    ],
    answer: 1
  },
  {
    id: "tomcat-50",
    question: "Which command can follow a Tomcat log file in real time on Linux?",
    options: [
      "tail -f logs/catalina.out",
      "mkdir logs/catalina.out",
      "git push logs/catalina.out",
      "chmod -R 777 /"
    ],
    answer: 0
  },
  {
    id: "tomcat-51",
    question: "What is catalina.out commonly used for on Unix-like Tomcat installations?",
    options: [
      "A permanent database storage file",
      "The WAR package itself",
      "Capturing console output and errors when the startup method redirects output there",
      "The Java installation directory"
    ],
    answer: 2
  },
  {
    id: "tomcat-52",
    question: "What is the purpose of access logging?",
    options: [
      "To encrypt every source file",
      "To replace application authentication",
      "To install Tomcat plugins",
      "To record details of HTTP requests handled by the server"
    ],
    answer: 3
  },
  {
    id: "tomcat-53",
    question: "What can repeated HTTP 404 responses in access logs indicate?",
    options: [
      "Every application dependency is healthy",
      "Clients are requesting missing resources or incorrect paths",
      "The server always has sufficient memory",
      "The Java version is always correct"
    ],
    answer: 1
  },
  {
    id: "tomcat-54",
    question: "What does a Java OutOfMemoryError usually indicate?",
    options: [
      "The JVM could not satisfy a memory allocation request",
      "The DNS server always returned the wrong address",
      "The application has no Java classes",
      "The network cable was removed in every case"
    ],
    answer: 0
  },
  {
    id: "tomcat-55",
    question: "What should you do if Tomcat repeatedly experiences Java heap exhaustion?",
    options: [
      "Immediately disable all monitoring",
      "Delete server.xml without a backup",
      "Analyze heap usage and dumps, investigate leaks, and tune memory based on evidence",
      "Increase the HTTP status code"
    ],
    answer: 2
  },
  {
    id: "tomcat-56",
    question: "Which JVM option sets the maximum Java heap size?",
    options: [
      "-Dhttp.port=8080",
      "-Xms",
      "-XX:Port=8080",
      "-Xmx"
    ],
    answer: 3
  },
  {
    id: "tomcat-57",
    question: "What does the JVM option -Xms commonly configure?",
    options: [
      "The HTTP response timeout only",
      "The initial or minimum heap size",
      "The WAR file name",
      "The Tomcat shutdown port"
    ],
    answer: 1
  },
  {
    id: "tomcat-58",
    question: "Why should heap size not be increased blindly?",
    options: [
      "An oversized heap can increase memory pressure and may worsen host-level resource problems",
      "Heap size changes the application's URL automatically",
      "Java does not use memory",
      "It removes the need to inspect logs"
    ],
    answer: 0
  },
  {
    id: "tomcat-59",
    question: "What is a thread pool used for in Tomcat?",
    options: [
      "Storing WAR files permanently",
      "Creating DNS records",
      "Managing reusable threads that process work such as incoming requests",
      "Compiling Terraform modules"
    ],
    answer: 2
  },
  {
    id: "tomcat-60",
    question: "Tomcat becomes slow during a traffic spike. Which investigation is most useful?",
    options: [
      "Rename every deployed WAR file",
      "Disable all error logs",
      "Restart the server repeatedly without collecting evidence",
      "Check request latency, thread utilization, CPU, memory, garbage collection, and downstream services"
    ],
    answer: 3
  },
  {
    id: "tomcat-61",
    question: "What is a connection timeout?",
    options: [
      "The maximum number of WAR files",
      "A limit on how long a connection attempt or configured connection operation may wait",
      "The number of Java packages installed",
      "The size of a Git commit"
    ],
    answer: 1
  },
  {
    id: "tomcat-62",
    question: "Why must Tomcat timeout settings be configured carefully?",
    options: [
      "To balance resource usage, responsiveness, and legitimate long-running requests",
      "To make every request wait indefinitely",
      "To disable application monitoring",
      "To guarantee database availability"
    ],
    answer: 0
  },
  {
    id: "tomcat-63",
    question: "What is the purpose of TLS in a Tomcat HTTPS setup?",
    options: [
      "To compile Java faster",
      "To manage application database schemas",
      "To protect data in transit using encryption and server authentication",
      "To remove the need for access control"
    ],
    answer: 2
  },
  {
    id: "tomcat-64",
    question: "What must be configured correctly for Tomcat to serve HTTPS directly?",
    options: [
      "A Jenkinsfile only",
      "A Kubernetes Service only",
      "A Maven mirror only",
      "An HTTPS connector with appropriate TLS certificate and key configuration"
    ],
    answer: 3
  },
  {
    id: "tomcat-65",
    question: "What is the benefit of terminating TLS at a trusted reverse proxy?",
    options: [
      "It guarantees that internal traffic is encrypted automatically",
      "It can centralize certificate handling and HTTPS processing at the proxy",
      "It removes the need for network security",
      "It prevents all application errors"
    ],
    answer: 1
  },
  {
    id: "tomcat-66",
    question: "What is the purpose of a keystore in a Java TLS configuration?",
    options: [
      "To hold cryptographic keys and certificates as required by the configuration",
      "To store only HTTP access logs",
      "To save Docker container IDs",
      "To store Maven test reports only"
    ],
    answer: 0
  },
  {
    id: "tomcat-67",
    question: "Why should secrets not be hard-coded in Tomcat configuration committed to Git?",
    options: [
      "Git cannot store text files",
      "Tomcat cannot read XML",
      "Repository users may gain access to exposed credentials",
      "It prevents Java from starting in all cases"
    ],
    answer: 2
  },
  {
    id: "tomcat-68",
    question: "What is a safer way to provide database credentials to a Tomcat-hosted application?",
    options: [
      "Publish them in a public repository",
      "Add them to an application's public error page",
      "Use the same password for all environments",
      "Use controlled secret management and restricted runtime configuration"
    ],
    answer: 3
  },
  {
    id: "tomcat-69",
    question: "What is a JNDI DataSource commonly used for in a Tomcat application?",
    options: [
      "Creating Kubernetes nodes",
      "Providing configured database connections to the application",
      "Building Git tags",
      "Changing the Linux kernel version"
    ],
    answer: 1
  },
  {
    id: "tomcat-70",
    question: "What is database connection pooling?",
    options: [
      "Reusing database connections instead of opening a new connection for every operation",
      "Keeping all database connections open forever without limits",
      "Copying every database row into a WAR file",
      "Replacing SQL with HTTP"
    ],
    answer: 0
  },
  {
    id: "tomcat-71",
    question: "A Tomcat application cannot connect to its database. What should you check?",
    options: [
      "Only the web page font",
      "Only the Tomcat logo",
      "Credentials, network access, JDBC driver, database availability, and DataSource configuration",
      "Only the Git branch name"
    ],
    answer: 2
  },
  {
    id: "tomcat-72",
    question: "What is a JDBC driver?",
    options: [
      "A Tomcat startup script",
      "A TLS certificate",
      "A Kubernetes ingress rule",
      "A Java library that enables communication with a database"
    ],
    answer: 3
  },
  {
    id: "tomcat-73",
    question: "What is a common purpose of a Maven build before deploying a Java application to Tomcat?",
    options: [
      "To assign a public IP to the server",
      "To compile, test, package, and produce a deployable artifact",
      "To replace the production database",
      "To configure a physical router"
    ],
    answer: 1
  },
  {
    id: "tomcat-74",
    question: "Which Maven command commonly builds and tests a project and packages its artifact?",
    options: [
      "mvn clean package",
      "mvn delete-server",
      "mvn open-port",
      "mvn disable-java"
    ],
    answer: 0
  },
  {
    id: "tomcat-75",
    question: "What artifact is commonly deployed to Tomcat from a traditional Java web application build?",
    options: [
      "A Linux kernel",
      "A Terraform state file",
      "A WAR file",
      "A Git credential"
    ],
    answer: 2
  },
  {
    id: "tomcat-76",
    question: "What is the role of Jenkins in a Tomcat deployment pipeline?",
    options: [
      "It replaces Tomcat's servlet container",
      "It guarantees the application contains no bugs",
      "It automatically fixes every database failure",
      "It can automate building, testing, packaging, and controlled deployment"
    ],
    answer: 3
  },
  {
    id: "tomcat-77",
    question: "In a CI/CD pipeline, why should an artifact be tested before production deployment?",
    options: [
      "To increase the number of manual steps",
      "To catch defects and validate the release before exposing it to users",
      "To remove the need for version control",
      "To prevent all future incidents"
    ],
    answer: 1
  },
  {
    id: "tomcat-78",
    question: "What is a rollback in a Tomcat deployment?",
    options: [
      "Returning to a previously known-good application version",
      "Deleting all historical artifacts",
      "Disabling every health check",
      "Changing the server's physical location"
    ],
    answer: 0
  },
  {
    id: "tomcat-79",
    question: "What is a blue-green deployment?",
    options: [
      "Running all releases in one directory without testing",
      "Deploying without an existing rollback option",
      "Maintaining two environments and switching traffic between them",
      "Updating only the application's logo"
    ],
    answer: 2
  },
  {
    id: "tomcat-80",
    question: "What is a canary deployment?",
    options: [
      "Replacing every production instance at once",
      "Deploying without monitoring",
      "Testing only on a developer laptop",
      "Releasing to a small subset of traffic or instances before wider rollout"
    ],
    answer: 3
  },
  {
    id: "tomcat-81",
    question: "Why is deploying a WAR directly over a live application risky?",
    options: [
      "WAR files cannot contain Java classes",
      "It can cause inconsistent files, failed deployments, or temporary downtime",
      "Tomcat cannot write log files",
      "It automatically creates a backup"
    ],
    answer: 1
  },
  {
    id: "tomcat-82",
    question: "What is a safer approach for deploying a critical Tomcat application?",
    options: [
      "Use a tested deployment process with health checks, backups or versioned artifacts, and rollback",
      "Delete the previous release before checking the new one",
      "Disable alerts throughout the release",
      "Copy random files into the running application"
    ],
    answer: 0
  },
  {
    id: "tomcat-83",
    question: "What is the purpose of Docker when running Tomcat?",
    options: [
      "To replace Java application code with SQL",
      "To eliminate all security responsibilities",
      "To package the runtime and application into a deployable container image",
      "To act as a source-code review tool"
    ],
    answer: 2
  },
  {
    id: "tomcat-84",
    question: "In a Dockerfile, what does EXPOSE 8080 mean?",
    options: [
      "It publishes the port to the internet automatically",
      "It opens every host firewall",
      "It changes Tomcat's configured connector port automatically",
      "It documents the container port the application is expected to use"
    ],
    answer: 3
  },
  {
    id: "tomcat-85",
    question: "Which Docker command maps host port 8080 to container port 8080?",
    options: [
      "docker run --name 8080 tomcat",
      "docker run -p 8080:8080 tomcat",
      "docker run --delete-port 8080 tomcat",
      "docker run -v 8080 tomcat"
    ],
    answer: 1
  },
  {
    id: "tomcat-86",
    question: "A Tomcat container exits immediately after starting. What should you inspect?",
    options: [
      "Container logs, exit code, entrypoint, configuration, and process startup",
      "Only the Docker image's display name",
      "Only the host desktop background",
      "Only the GitHub star count"
    ],
    answer: 0
  },
  {
    id: "tomcat-87",
    question: "Why should a Tomcat container generally run its main server process in the foreground?",
    options: [
      "To prevent the container from writing logs",
      "To disable container networking",
      "So the container runtime can track the main process and its lifecycle",
      "To make the image larger"
    ],
    answer: 2
  },
  {
    id: "tomcat-88",
    question: "What is a Kubernetes Deployment used for when running Tomcat containers?",
    options: [
      "To compile Java source code inside every HTTP request",
      "To replace DNS in the entire cluster",
      "To store database credentials in source control",
      "To manage replicated Pods and declarative application updates"
    ],
    answer: 3
  },
  {
    id: "tomcat-89",
    question: "What is a Kubernetes Service used for with Tomcat Pods?",
    options: [
      "To build WAR files",
      "To provide a stable network endpoint for accessing selected Pods",
      "To replace the Java runtime",
      "To edit source code in Git"
    ],
    answer: 1
  },
  {
    id: "tomcat-90",
    question: "What is the purpose of a readiness probe for a Tomcat application?",
    options: [
      "To indicate whether a Pod should receive traffic",
      "To rebuild the Docker image every second",
      "To delete all application logs",
      "To change the application's source-code language"
    ],
    answer: 0
  },
  {
    id: "tomcat-91",
    question: "What is the purpose of a liveness probe?",
    options: [
      "To verify that the Git repository is public",
      "To measure only database disk capacity",
      "To help determine whether a container should be restarted",
      "To create a new TLS certificate every request"
    ],
    answer: 2
  },
  {
    id: "tomcat-92",
    question: "A Kubernetes Tomcat Pod is in CrashLoopBackOff. What is the best first investigation?",
    options: [
      "Delete the whole cluster immediately",
      "Increase replica count without investigation",
      "Disable all probes permanently",
      "Inspect Pod events, previous container logs, exit codes, and configuration"
    ],
    answer: 3
  },
  {
    id: "tomcat-93",
    question: "Why should Tomcat application logs be sent to a centralized logging platform?",
    options: [
      "To eliminate the need for application testing",
      "To search and correlate logs across instances and deployments",
      "To make logs inaccessible during incidents",
      "To prevent every HTTP 500 error"
    ],
    answer: 1
  },
  {
    id: "tomcat-94",
    question: "What is the purpose of monitoring Tomcat JVM metrics?",
    options: [
      "To identify trends in heap usage, garbage collection, threads, and runtime health",
      "To change source code automatically",
      "To replace network monitoring entirely",
      "To prevent every software defect"
    ],
    answer: 0
  },
  {
    id: "tomcat-95",
    question: "Tomcat's CPU usage stays unusually high. What should you do?",
    options: [
      "Delete all configuration files",
      "Disable every alert",
      "Inspect CPU profiles, request patterns, thread activity, garbage collection, and application code",
      "Increase the HTTP port number"
    ],
    answer: 2
  },
  {
    id: "tomcat-96",
    question: "What is configuration drift in a Tomcat environment?",
    options: [
      "A WAR file with a valid checksum",
      "A successful health check",
      "A correctly documented release",
      "Unintended differences between the actual server configuration and the approved configuration"
    ],
    answer: 3
  },
  {
    id: "tomcat-97",
    question: "Why should Tomcat configuration be managed consistently across environments?",
    options: [
      "To ensure every environment uses identical production secrets",
      "To reduce configuration drift and make deployments more reproducible",
      "To eliminate the need for testing",
      "To make every instance use a different port without planning"
    ],
    answer: 1
  },
  {
    id: "tomcat-98",
    question: "What should be checked before upgrading a production Tomcat version?",
    options: [
      "Java compatibility, application compatibility, release notes, security advisories, and rollback plans",
      "Only the desktop wallpaper",
      "Only the number of files in the Downloads folder",
      "Only the server's hostname"
    ],
    answer: 0
  },
  {
    id: "tomcat-99",
    question: "After a Tomcat deployment, the health check fails. What should the release process do?",
    options: [
      "Ignore the failure and send all traffic to the release",
      "Delete monitoring history",
      "Stop promotion, investigate the failure, and roll back when required by the release strategy",
      "Disable the health check permanently"
    ],
    answer: 2
  },
  {
    id: "tomcat-100",
    question: "In a production Tomcat incident, what is the best overall troubleshooting approach?",
    options: [
      "Restart servers repeatedly without collecting evidence",
      "Delete the deployed application immediately",
      "Change several settings at once without tracking them",
      "Assess impact, inspect metrics and logs, isolate the cause, apply a controlled fix, and verify recovery"
    ],
    answer: 3
  }
];
