export type Problem = {
  issue: string;
  solution: string;
};

export type NoteSection = {
  heading: string;
  explanation: string;
  steps: string[];
  commands?: string;
  config?: string;
  problems: Problem[];
};

export type NoteData = {
  title: string;
  description: string;
  sections: NoteSection[];
};

const configurationExamplesData: NoteData = {
  title: "Configuration Examples",
  description:
    "Detailed practical learning notes for writing, understanding, debugging and managing real-world configuration files used in DevOps. Learn Kubernetes YAML, Docker Compose, Jenkins pipelines, GitHub Actions workflows and Terraform HCL through complete examples, field-by-field explanations, commands, production workflows and troubleshooting.",

  sections: [
    {
      heading: "1. What Are Configuration Files and Why Do We Need Them?",
      explanation:
        "A configuration file is a file that tells an application, server, container, pipeline or cloud platform how it should work. Instead of manually giving instructions every time, we write the required settings in a file and allow the tool to read and execute those settings. For example, when we run an application inside Docker, Docker needs to know which image to use, which port to expose, which environment variables to pass and which storage volumes to attach. These details can be written in a Docker Compose YAML file. Similarly, Kubernetes reads YAML manifests to understand how many application replicas should run, which container image should be used and how users should access the application. Jenkins reads a Jenkinsfile to understand the build, test and deployment stages. GitHub Actions reads workflow YAML files to execute CI/CD jobs. Terraform reads HCL files to create and manage cloud infrastructure. Configuration files make infrastructure and application setup repeatable, understandable and easier to maintain. A good configuration file should explain the required state clearly instead of depending on manual instructions.",
      steps: [
        "First identify which tool needs configuration. Kubernetes uses YAML manifests, Docker Compose uses YAML, Jenkins commonly uses a Jenkinsfile, GitHub Actions uses YAML workflows and Terraform uses HCL.",
        "Understand the purpose of every configuration field before writing it. Do not copy a large configuration from the internet without understanding what each field does.",
        "Keep application configuration separate from application source code where appropriate. This allows the same application code to run in development, testing and production with different settings.",
        "Use version control such as Git to track configuration changes. This helps identify who changed a setting, when it changed and why it changed.",
        "Validate configuration files before deploying them. A syntactically correct file can still contain incorrect values, so validation and practical testing are important.",
        "Avoid storing passwords, API keys, access tokens and private certificates directly in configuration files committed to Git.",
        "Document important configuration decisions so that another engineer can understand and maintain the setup."
      ],
      commands:
        "# Check the files in a typical DevOps project\nls -la\n\n# Find YAML configuration files\nfind . -type f \\( -name '*.yaml' -o -name '*.yml' \\)\n\n# Find Terraform configuration files\nfind . -type f -name '*.tf'\n\n# Check the current Git changes\ngit status\n\n# Review configuration changes before committing\ngit diff",
      problems: [
        {
          issue:
            "The configuration file contains many fields, but the engineer does not understand what they do.",
          solution:
            "Learn the purpose of each field, refer to the official documentation and test the configuration in a development environment before using it in production."
        },
        {
          issue:
            "The same configuration works in development but fails in production.",
          solution:
            "Compare environment-specific settings such as ports, URLs, credentials, resource limits, network settings and permissions. Keep environment-specific values separate from common application configuration."
        },
        {
          issue:
            "Sensitive information is visible in a Git repository.",
          solution:
            "Remove the secret from the configuration, rotate the exposed credential immediately and use an appropriate secret-management system. Removing a secret from the latest commit alone does not make an already exposed credential safe."
        }
      ]
    },

    {
      heading: "2. Kubernetes Deployment YAML – Complete Application Example",
      explanation:
        "Kubernetes is a container orchestration platform. It manages containers across a group of machines called nodes. Instead of manually starting containers on individual servers, we describe the required application state in Kubernetes YAML files. A Deployment is one of the most commonly used Kubernetes objects. It tells Kubernetes which container image to run, how many replicas are required, which labels identify the application and what update strategy should be used. Kubernetes continuously compares the actual state with the desired state. If we request three replicas but one Pod stops unexpectedly, the Deployment controller works through its ReplicaSet to create another Pod and move the application towards the requested state. This is called the reconciliation process. The YAML file is not simply a command that starts containers once. It describes the desired state that Kubernetes should continuously maintain.",
      steps: [
        "Create a project directory for the Kubernetes manifests.",
        "Create a file named deployment.yaml.",
        "Choose the correct apiVersion and kind. A Deployment uses apps/v1 as its API version and Deployment as its kind.",
        "Add metadata such as the resource name and namespace.",
        "Inside spec, define the desired replica count. Three replicas mean Kubernetes should maintain three matching Pods.",
        "Add a selector. The selector identifies the Pods managed by this Deployment.",
        "Under template.metadata.labels, provide the labels that match the selector. If the selector and Pod labels do not match, Kubernetes rejects the Deployment.",
        "Inside template.spec.containers, define the container name, image and container port.",
        "Apply the manifest using kubectl apply -f deployment.yaml.",
        "Check the Deployment, ReplicaSet and Pods to confirm whether Kubernetes created the requested resources.",
        "For production, use a reliable image registry, immutable image tags, health probes, resource requests and limits, security settings and an appropriate rollout strategy."
      ],
      commands:
        "# Create a directory for Kubernetes configuration\nmkdir -p kubernetes\ncd kubernetes\n\n# Apply the Deployment configuration\nkubectl apply -f deployment.yaml\n\n# Check the Deployment\nkubectl get deployments\n\n# Check ReplicaSets created by the Deployment\nkubectl get replicasets\n\n# Check application Pods\nkubectl get pods -o wide\n\n# Inspect the Deployment configuration and events\nkubectl describe deployment devmavox-app\n\n# Check container logs\nkubectl logs deployment/devmavox-app\n\n# Follow logs continuously\nkubectl logs -f deployment/devmavox-app\n\n# Check rollout status\nkubectl rollout status deployment/devmavox-app\n\n# View rollout history\nkubectl rollout history deployment/devmavox-app\n\n# Scale the application to five replicas\nkubectl scale deployment devmavox-app --replicas=5",
      config:
        "# deployment.yaml\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: devmavox-app\n  namespace: default\n  labels:\n    app: devmavox\n    environment: production\nspec:\n  replicas: 3\n  revisionHistoryLimit: 5\n  selector:\n    matchLabels:\n      app: devmavox\n  strategy:\n    type: RollingUpdate\n    rollingUpdate:\n      maxSurge: 1\n      maxUnavailable: 0\n  template:\n    metadata:\n      labels:\n        app: devmavox\n        environment: production\n    spec:\n      containers:\n        - name: devmavox-container\n          image: nginx:1.27\n          imagePullPolicy: IfNotPresent\n          ports:\n            - name: http\n              containerPort: 80\n              protocol: TCP\n          resources:\n            requests:\n              cpu: \"100m\"\n              memory: \"128Mi\"\n            limits:\n              cpu: \"500m\"\n              memory: \"512Mi\"\n          readinessProbe:\n            httpGet:\n              path: /\n              port: http\n            initialDelaySeconds: 5\n            periodSeconds: 10\n          livenessProbe:\n            httpGet:\n              path: /\n              port: http\n            initialDelaySeconds: 15\n            periodSeconds: 20\n          securityContext:\n            allowPrivilegeEscalation: false\n            runAsNonRoot: true\n            runAsUser: 101",
      problems: [
        {
          issue:
            "Deployment creation fails because selector does not match Pod template labels.",
          solution:
            "Make sure spec.selector.matchLabels contains the same label key-value pairs in spec.template.metadata.labels. The Deployment selector is important because it determines which Pods belong to the Deployment."
        },
        {
          issue:
            "Pods are showing ImagePullBackOff.",
          solution:
            "Check whether the image name and tag are correct, whether the registry is reachable and whether private registry authentication is configured. Use kubectl describe pod to inspect the image pull error."
        },
        {
          issue:
            "Pods are repeatedly restarting.",
          solution:
            "Check kubectl logs --previous and kubectl describe pod. Investigate application startup errors, missing environment variables, incorrect commands, failed health checks and insufficient memory."
        },
        {
          issue:
            "The Deployment is available but the application is not responding.",
          solution:
            "Check whether the application listens on the expected container port, whether the Service targets the correct Pod port and whether NetworkPolicy or application-level firewall rules block traffic."
        },
        {
          issue:
            "The container fails because runAsNonRoot is enabled but the image requires a different user setup.",
          solution:
            "Check the image's supported user and filesystem permissions. Configure a suitable non-root user in the image or adjust the security context according to your organization's security policy."
        }
      ]
    },

    {
      heading: "3. Kubernetes Service YAML – Exposing an Application",
      explanation:
        "A Kubernetes Pod can be created and destroyed at any time. Its IP address is not a permanent address that users should depend on. When a Deployment replaces a Pod, the replacement may receive a different IP address. A Service provides a stable network endpoint for a group of matching Pods. It uses label selectors to find the correct backend Pods. For example, a Service with selector app: devmavox sends traffic to Pods carrying that label. The Service provides a stable virtual IP and DNS name inside the cluster. ClusterIP is the default Service type and is commonly used for communication inside the cluster. NodePort exposes a port on cluster nodes. LoadBalancer requests an external load balancer when the cluster environment supports it. The Service port is the port exposed by the Service, while targetPort is the port on the application container. These values do not have to be identical.",
      steps: [
        "Create a file named service.yaml.",
        "Set apiVersion to v1 and kind to Service.",
        "Give the Service a meaningful name.",
        "Add a selector matching the labels on the application Pods.",
        "Configure port to define the Service port.",
        "Configure targetPort to match the application's listening port.",
        "Choose ClusterIP for internal cluster access unless external exposure is required.",
        "Apply the Service manifest.",
        "Use kubectl get endpoints or kubectl get endpointslices to verify that the Service has backend endpoints.",
        "Test communication from another Pod using the Service DNS name.",
        "For internet access, normally use an Ingress or Gateway implementation or a LoadBalancer Service depending on the cluster architecture."
      ],
      commands:
        "# Apply the Service\nkubectl apply -f service.yaml\n\n# List Services\nkubectl get services\n\n# Inspect the Service\nkubectl describe service devmavox-service\n\n# Check Service endpoints\nkubectl get endpoints devmavox-service\n\n# Check EndpointSlices\nkubectl get endpointslices\n\n# Test access from a temporary curl Pod\nkubectl run curl-test --image=curlimages/curl:latest --restart=Never --rm -it -- curl http://devmavox-service:80",
      config:
        "# service.yaml\napiVersion: v1\nkind: Service\nmetadata:\n  name: devmavox-service\n  labels:\n    app: devmavox\nspec:\n  type: ClusterIP\n  selector:\n    app: devmavox\n  ports:\n    - name: http\n      protocol: TCP\n      port: 80\n      targetPort: 80",
      problems: [
        {
          issue:
            "Service is created but endpoints are empty.",
          solution:
            "Check whether the selector matches the labels on ready Pods. Use kubectl get pods --show-labels and compare the output with the Service selector."
        },
        {
          issue:
            "Service DNS resolves but the connection is refused.",
          solution:
            "Verify that the application is running and listening on targetPort. Check container logs and confirm that the application listens on 0.0.0.0 rather than only on localhost."
        },
        {
          issue:
            "Users cannot access a ClusterIP Service from the internet.",
          solution:
            "ClusterIP is intended for internal cluster access. Configure an Ingress, Gateway or suitable LoadBalancer Service for external traffic."
        }
      ]
    },

    {
      heading: "4. Kubernetes ConfigMap and Secret – Managing Application Settings",
      explanation:
        "Applications need configuration values such as database hostnames, application modes, log levels and service URLs. We should avoid hardcoding all these values into the container image. A ConfigMap stores non-confidential configuration data and makes it available to Pods as environment variables or mounted files. A Secret is intended for confidential values such as passwords, tokens and credentials. Kubernetes Secret data is base64-encoded in its standard representation; base64 is not encryption. Anyone with sufficient permissions to read the Secret can access its contents. Therefore, use restrictive RBAC, encryption at rest and a proper external secret-management solution when required. ConfigMaps and Secrets help separate application code from environment-specific settings. When a ConfigMap is mounted as a volume, updates can eventually appear in the mounted files, but an application may need to reload them. Environment variables do not automatically update inside an already running process when the ConfigMap or Secret changes.",
      steps: [
        "Identify which settings are normal application configuration and which are confidential.",
        "Put non-sensitive values such as APP_ENV and LOG_LEVEL into a ConfigMap.",
        "Store passwords and tokens in a Secret or an approved external secret manager.",
        "Reference ConfigMap values using configMapKeyRef or envFrom.",
        "Reference Secret values using secretKeyRef or envFrom.",
        "Mount configuration files as volumes when the application expects a file rather than an environment variable.",
        "Use separate configuration values for development, testing and production.",
        "Restrict access to Secrets using Kubernetes RBAC.",
        "Do not commit real Secret manifests containing production credentials into public Git repositories.",
        "Restart or roll out workloads when environment-variable configuration changes need to take effect."
      ],
      commands:
        "# Create a ConfigMap from literal values\nkubectl create configmap devmavox-config --from-literal=APP_ENV=production --from-literal=LOG_LEVEL=info\n\n# Display ConfigMaps\nkubectl get configmaps\n\n# Inspect a ConfigMap\nkubectl describe configmap devmavox-config\n\n# Create a Secret interactively from a file or a secure deployment process\nkubectl create secret generic devmavox-secret --from-file=database-password=./database-password.txt\n\n# List Secrets\nkubectl get secrets\n\n# Inspect Secret metadata without printing its values\nkubectl describe secret devmavox-secret\n\n# Restart the Deployment after an environment variable configuration change\nkubectl rollout restart deployment/devmavox-app",
      config:
        "# configmap.yaml\napiVersion: v1\nkind: ConfigMap\nmetadata:\n  name: devmavox-config\ndata:\n  APP_ENV: \"production\"\n  LOG_LEVEL: \"info\"\n  API_BASE_URL: \"https://api.example.com\"\n\n---\n# deployment-config-example.yaml\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: devmavox-configured-app\nspec:\n  replicas: 2\n  selector:\n    matchLabels:\n      app: configured-app\n  template:\n    metadata:\n      labels:\n        app: configured-app\n    spec:\n      containers:\n        - name: application\n          image: nginx:1.27\n          envFrom:\n            - configMapRef:\n                name: devmavox-config\n          env:\n            - name: DATABASE_PASSWORD\n              valueFrom:\n                secretKeyRef:\n                  name: devmavox-secret\n                  key: database-password",
      problems: [
        {
          issue:
            "Pod fails because the referenced ConfigMap or Secret does not exist.",
          solution:
            "Check the resource name and namespace. The ConfigMap or Secret must exist in the same namespace as the Pod unless the configuration mechanism explicitly supports another arrangement."
        },
        {
          issue:
            "A changed ConfigMap value is not visible inside the application.",
          solution:
            "If the value is supplied through an environment variable, restart the Pod or Deployment. If it is mounted as a file, check volume update behavior and whether the application reloads the file."
        },
        {
          issue:
            "A team assumes that base64-encoded Secret data is secure encryption.",
          solution:
            "Base64 is only an encoding format. Enable encryption at rest, restrict RBAC permissions and use external secret management for sensitive production credentials."
        }
      ]
    },

    {
      heading: "5. Docker Compose – Understanding a Multi-Container Application",
      explanation:
        "Docker Compose is a tool for defining and running applications that contain multiple Docker containers. In a real project, an application may need a web server, backend service, database, cache and background worker. Running every container separately with long docker run commands becomes difficult to manage. Docker Compose allows us to describe all these services in one compose.yaml file. We define which image or build directory each service uses, which ports should be published, which environment variables are required, which volumes should persist data and which networks should connect the services. Docker Compose reads the file and creates the required containers, networks and volumes. Containers on the same Compose network can normally communicate using service names as DNS hostnames. For example, the backend can connect to PostgreSQL using the hostname db rather than a changing container IP address. Compose is especially useful for local development, testing, demonstrations and some smaller deployments. For large production environments, select an orchestration platform and operational architecture that meet the application's availability, security and scaling requirements.",
      steps: [
        "Create a directory for the application.",
        "Create a compose.yaml file in the project root.",
        "Define a services section. Every service represents one containerized component.",
        "Choose image when using an existing image or build when building an image from a Dockerfile.",
        "Use ports to publish a container port on the host machine.",
        "Use environment or env_file to provide application settings.",
        "Use volumes when data must survive container replacement.",
        "Use networks to control communication between services.",
        "Use healthcheck to determine whether a service is healthy.",
        "Use depends_on to express startup dependencies, remembering that basic startup ordering does not automatically mean the application is ready to accept connections.",
        "Use a database healthcheck and a suitable dependency condition where supported.",
        "Run docker compose up -d to create and start the services.",
        "Inspect logs and service status to verify that the application is working.",
        "Use docker compose down to stop and remove the Compose-managed containers and network. Named volumes are retained unless you explicitly request volume removal."
      ],
      commands:
        "# Validate Compose configuration\ndocker compose config\n\n# Start services in the background\ndocker compose up -d\n\n# Start and build images when required\ndocker compose up -d --build\n\n# List services and their status\ndocker compose ps\n\n# Display logs for all services\ndocker compose logs\n\n# Follow logs for the backend service\ndocker compose logs -f backend\n\n# Open a shell inside a running container\ndocker compose exec backend sh\n\n# Restart one service\ndocker compose restart backend\n\n# Stop and remove Compose containers and network\ndocker compose down\n\n# Remove containers, network and named volumes (destructive to stored volume data)\n# Use only when you intentionally want to delete the stored data\ndocker compose down -v",
      config:
        "# compose.yaml\nservices:\n  backend:\n    build:\n      context: ./backend\n      dockerfile: Dockerfile\n    container_name: devmavox-backend\n    ports:\n      - \"3000:3000\"\n    environment:\n      NODE_ENV: production\n      PORT: \"3000\"\n      DB_HOST: db\n      DB_PORT: \"5432\"\n      DB_NAME: devmavox\n      DB_USER: appuser\n    env_file:\n      - ./backend/.env\n    depends_on:\n      db:\n        condition: service_healthy\n    networks:\n      - app-network\n    restart: unless-stopped\n\n  db:\n    image: postgres:16\n    container_name: devmavox-db\n    environment:\n      POSTGRES_DB: devmavox\n      POSTGRES_USER: appuser\n      POSTGRES_PASSWORD: ${DB_PASSWORD:?Set DB_PASSWORD in the environment}\n    volumes:\n      - postgres-data:/var/lib/postgresql/data\n    healthcheck:\n      test: [\"CMD-SHELL\", \"pg_isready -U appuser -d devmavox\"]\n      interval: 10s\n      timeout: 5s\n      retries: 5\n    networks:\n      - app-network\n    restart: unless-stopped\n\nvolumes:\n  postgres-data:\n\nnetworks:\n  app-network:\n    driver: bridge",
      problems: [
        {
          issue:
            "Backend container starts before the database is ready.",
          solution:
            "Configure a meaningful database healthcheck and use depends_on with a supported healthy condition. The backend should also implement connection retry logic because database availability can change after startup."
        },
        {
          issue:
            "The application cannot connect to the database using localhost.",
          solution:
            "Inside the backend container, localhost refers to that backend container itself. Use the Compose service name, such as db, as the database hostname."
        },
        {
          issue:
            "Database records disappear after recreating the container.",
          solution:
            "Use a persistent named volume mounted at the database's data directory. Do not remove the named volume when running docker compose down -v unless you intend to delete the database data."
        },
        {
          issue:
            "The host cannot access the application.",
          solution:
            "Check the ports mapping, application listening address and host firewall. Confirm that the process listens on 0.0.0.0 inside the container when external container access is required."
        }
      ]
    },

    {
      heading: "6. Docker Compose Environment Variables and .env Files",
      explanation:
        "Environment variables allow an application to receive settings without hardcoding those values in the application source code or container image. Common examples include database host, database name, application mode, API endpoint and logging level. Docker Compose supports environment and env_file. The environment section defines variables directly in the Compose file or references variables from the host environment. The env_file section loads values from a file into the container environment. Compose also supports variable substitution in the Compose file itself. For example, ${DB_PASSWORD} can be replaced using a variable available to Compose. It is important to understand the difference between Compose interpolation and variables passed into a container. A project .env file is commonly used to provide values for Compose interpolation; it is not automatically the same as placing every variable inside every container. Use env_file or environment when the application container needs to receive those values. Keep real secrets outside source control and use deployment-platform secret facilities for production.",
      steps: [
        "Create a .env file for local development values.",
        "Add the .env file to .gitignore when it contains private or environment-specific values.",
        "Use ${VARIABLE_NAME} in the Compose file when Compose needs to substitute a value.",
        "Use env_file when the container should receive variables from a specified file.",
        "Use environment for explicit container variables.",
        "Use required-value syntax such as ${DB_PASSWORD:?Set DB_PASSWORD} to fail when a mandatory value is missing.",
        "Do not assume that a variable available on the host is automatically available inside every container.",
        "Use different secret sources for local development and production deployment.",
        "Rotate credentials if they are accidentally committed or exposed."
      ],
      commands:
        "# Check whether a variable exists in the current shell\nprintenv DB_PASSWORD\n\n# Export a value for the current shell session\nexport DB_PASSWORD='replace-with-a-local-test-value'\n\n# Validate resolved Compose configuration\n# Be careful: rendered output may include sensitive values\ndocker compose config\n\n# Start the application\ndocker compose up -d\n\n# Check environment variable names inside a container\n# Avoid printing secret values into shared terminals or logs\ndocker compose exec backend sh -c 'printenv | cut -d= -f1'",
      config:
        "# .env.example\nAPP_ENV=development\nDB_HOST=db\nDB_PORT=5432\nDB_NAME=devmavox\nDB_USER=appuser\nDB_PASSWORD=replace-this-with-a-secure-local-value\n\n# compose.yaml\nservices:\n  backend:\n    image: devmavox/backend:1.0\n    env_file:\n      - .env\n    environment:\n      APP_ENV: ${APP_ENV:-development}\n      DB_HOST: ${DB_HOST:-db}\n      DB_PORT: ${DB_PORT:-5432}\n      DB_NAME: ${DB_NAME:-devmavox}\n      DB_USER: ${DB_USER:-appuser}\n      DB_PASSWORD: ${DB_PASSWORD:?DB_PASSWORD is required}",
      problems: [
        {
          issue:
            "Compose reports that DB_PASSWORD is not set.",
          solution:
            "Check the current shell environment and the project .env file. Confirm that the variable name is spelled correctly and that the command is executed from the expected project directory."
        },
        {
          issue:
            "The .env file is committed to Git.",
          solution:
            "Add the file to .gitignore, remove it from Git tracking where appropriate, rotate any exposed credentials and provide a safe .env.example file containing placeholder values."
        },
        {
          issue:
            "A variable is visible to Compose but missing inside the container.",
          solution:
            "Use environment or env_file to explicitly pass the variable into the container. Compose interpolation and container environment injection are different operations."
        }
      ]
    },

    {
      heading: "7. Jenkinsfile – Declarative Pipeline from Checkout to Deployment",
      explanation:
        "Jenkins is an automation server commonly used to implement Continuous Integration and Continuous Delivery pipelines. A Jenkinsfile is a text file that stores pipeline instructions alongside the application source code. Keeping the pipeline in Git is called Pipeline as Code. A Declarative Jenkinsfile begins with the pipeline block. The agent tells Jenkins where the pipeline or its stages should execute. The stages block groups the workflow into meaningful stages such as Checkout, Build, Test, Package and Deploy. Each stage contains steps that Jenkins executes. The environment block defines environment variables, while credentials can be accessed through Jenkins' credentials system. The post block defines actions that should run after success, failure or completion. When a developer pushes code, a configured webhook or polling mechanism can trigger Jenkins. Jenkins checks out the code and executes the pipeline stages. A pipeline should fail when a critical build or test step fails so that a broken application is not silently promoted to production.",
      steps: [
        "Create a Jenkinsfile in the root of the source-code repository.",
        "Choose Declarative Pipeline syntax for a structured and readable pipeline.",
        "Define the pipeline agent. Use any for a simple example or a specific agent label when a particular build environment is required.",
        "Create stages for checkout, build, test, package and deployment.",
        "Use steps to execute shell commands or Jenkins pipeline steps.",
        "Use tools when Jenkins-managed installations such as Maven or JDK are configured and required.",
        "Use environment for non-secret environment variables.",
        "Use the credentials binding mechanism to retrieve credentials securely.",
        "Use post conditions to publish test results, notify teams or perform cleanup.",
        "Configure a Multibranch Pipeline or another suitable job type to discover Jenkinsfiles from Git branches.",
        "Configure the required Git credentials and webhook integration.",
        "Run the pipeline and inspect the console output when a stage fails.",
        "Keep deployment permissions separate from ordinary build permissions when possible."
      ],
      commands:
        "# Check Java version on a Jenkins agent\njava -version\n\n# Check Maven version\nmvn -version\n\n# Run a Maven build manually on a suitable agent\nmvn clean package\n\n# Run unit tests\nmvn test\n\n# List generated artifacts\nls -lh target/\n\n# Check Git branch and current commit\ngit branch --show-current\ngit rev-parse --short HEAD",
      config:
        "// Jenkinsfile\npipeline {\n    agent any\n\n    options {\n        timestamps()\n        disableConcurrentBuilds()\n        timeout(time: 30, unit: 'MINUTES')\n    }\n\n    environment {\n        APP_NAME = 'devmavox-app'\n        IMAGE_TAG = \"${BUILD_NUMBER}\"\n    }\n\n    stages {\n        stage('Checkout') {\n            steps {\n                checkout scm\n                sh 'git rev-parse --short HEAD'\n            }\n        }\n\n        stage('Build') {\n            steps {\n                sh 'mvn clean package -DskipTests'\n            }\n        }\n\n        stage('Test') {\n            steps {\n                sh 'mvn test'\n            }\n        }\n\n        stage('Package Information') {\n            steps {\n                sh 'ls -lh target/'\n            }\n        }\n\n        stage('Deploy to Test') {\n            when {\n                branch 'develop'\n            }\n            steps {\n                echo 'Run the approved test-environment deployment here.'\n            }\n        }\n    }\n\n    post {\n        success {\n            echo 'Pipeline completed successfully.'\n        }\n        failure {\n            echo 'Pipeline failed. Check the failed stage and console output.'\n        }\n        always {\n            echo 'Pipeline execution finished.'\n            archiveArtifacts artifacts: 'target/*.jar', allowEmptyArchive: true\n        }\n    }\n}",
      problems: [
        {
          issue:
            "Jenkins reports that it cannot find the Jenkinsfile.",
          solution:
            "Confirm that the file is named Jenkinsfile and is stored in the configured repository path. Check the job's script path and branch configuration."
        },
        {
          issue:
            "Pipeline fails with mvn: command not found.",
          solution:
            "Install Maven on the agent or configure a Jenkins-managed Maven installation. Verify the agent PATH and the tools configuration."
        },
        {
          issue:
            "Jenkins cannot access the Git repository.",
          solution:
            "Check repository URL, credentials, network access and repository permissions. Use Jenkins credential IDs rather than hardcoding passwords or tokens in the Jenkinsfile."
        },
        {
          issue:
            "A build succeeds but the artifact is missing.",
          solution:
            "Check the build output directory, archiveArtifacts pattern and whether the packaging stage actually created the expected artifact."
        }
      ]
    },

    {
      heading: "8. Jenkins Credentials – Securely Using Passwords and Tokens",
      explanation:
        "A CI/CD pipeline may need access to Git repositories, container registries, cloud accounts, deployment servers and notification services. These integrations often require credentials. A common mistake is to write a password or access token directly inside the Jenkinsfile. This exposes sensitive information to anyone who can read the repository. Jenkins Credentials provides a managed way to store secret text, usernames and passwords, SSH keys and other supported credential types. A Jenkinsfile can refer to a stored credential by its ID and retrieve it through an approved credentials binding. Access should be limited to the jobs and users that need it. Avoid printing credentials in console output, shell tracing or debugging logs. Also remember that a credential being stored in Jenkins does not automatically make every pipeline safe: untrusted pull requests and user-controlled pipeline code must not be allowed to access production secrets without suitable controls.",
      steps: [
        "Open Jenkins and navigate to the appropriate credential store.",
        "Create a credential with the correct type, such as secret text or username and password.",
        "Choose a clear credential ID that can be referenced by a pipeline.",
        "Restrict credential scope and access according to the environment and project.",
        "Use withCredentials or an appropriate credentials binding to expose the secret only for the required operation.",
        "Avoid echoing the value or enabling shell debug output that could expose it.",
        "Do not allow untrusted pull-request code to access production credentials.",
        "Rotate credentials periodically and immediately after suspected exposure.",
        "Prefer short-lived cloud credentials and workload identity mechanisms where supported."
      ],
      commands:
        "# Example: use a credential through Jenkins withCredentials.\n# The credential ID must already exist in Jenkins.\n# Do not print the secret value.\n\n# Review pipeline console output after execution.\n# Confirm that sensitive values are masked and not echoed.\n\n# Check that the required deployment tool is installed.\nkubectl version --client\n\n# Check AWS CLI version if the pipeline uses AWS.\naws --version",
      config:
        "// Jenkinsfile - credential binding example\npipeline {\n    agent any\n\n    stages {\n        stage('Authenticated Operation') {\n            steps {\n                withCredentials([\n                    string(\n                        credentialsId: 'registry-token',\n                        variable: 'REGISTRY_TOKEN'\n                    )\n                ]) {\n                    sh '''\n                        set +x\n                        echo \"Running authenticated registry operation\"\n                        # Use REGISTRY_TOKEN in the required command.\n                        # Never echo the token itself.\n                    '''\n                }\n            }\n        }\n    }\n}",
      problems: [
        {
          issue:
            "Jenkins reports that a credential ID cannot be found.",
          solution:
            "Check the credential ID, credential domain and scope. Make sure the job has access to the credential store where the credential was created."
        },
        {
          issue:
            "A token appears in pipeline logs.",
          solution:
            "Stop the pipeline, revoke or rotate the exposed token, remove unsafe logging and review access to the logs and repository. Do not rely only on log masking."
        },
        {
          issue:
            "A pull-request build can access production credentials.",
          solution:
            "Review branch protection and job trust settings. Separate untrusted validation jobs from privileged deployment jobs and grant production credentials only to trusted workflows."
        }
      ]
    },

    {
      heading: "9. GitHub Actions – Complete CI Workflow",
      explanation:
        "GitHub Actions is a CI/CD automation platform integrated with GitHub repositories. It executes workflows when configured events occur, such as a push, pull request, release or scheduled time. Workflow files are stored in the .github/workflows directory and normally use YAML syntax. A workflow contains a name, event triggers, permissions and jobs. Each job runs on a runner, which may be a GitHub-hosted machine or a configured self-hosted runner. Jobs contain steps. A step can run a shell command or use a reusable action. For example, a Node.js project can install dependencies, run lint checks, execute tests and create a production build after every pull request. If a required check fails, the team can prevent the change from being merged. This provides an automated quality gate. GitHub Actions also supports artifacts, dependency caching, job matrices, environments and reusable workflows. A secure workflow should use least-privilege permissions and carefully manage secrets and third-party actions.",
      steps: [
        "Create a directory named .github/workflows in the repository root.",
        "Create a YAML file such as ci.yml inside the workflows directory.",
        "Set a descriptive workflow name.",
        "Configure on to define which GitHub events should start the workflow.",
        "Define jobs for separate tasks such as lint, test and build.",
        "Choose an appropriate runs-on runner.",
        "Add steps using uses for actions and run for shell commands.",
        "Use actions/checkout to check out the repository source code.",
        "Set up the required language runtime using an appropriate setup action.",
        "Install dependencies using the project's lockfile-aware command.",
        "Run tests and build the application.",
        "Configure workflow permissions explicitly and only grant what the workflow requires.",
        "Store sensitive values in GitHub Actions Secrets or an approved external secret system.",
        "Use pull-request checks as a quality gate before merging.",
        "Inspect the Actions tab and job logs when a workflow fails."
      ],
      commands:
        "# Create the workflow directory\nmkdir -p .github/workflows\n\n# Check the workflow files\nls -la .github/workflows\n\n# Check the current repository branch\ngit branch --show-current\n\n# Check uncommitted changes\ngit status\n\n# Add a new workflow file\ngit add .github/workflows/ci.yml\n\n# Commit the workflow\ngit commit -m \"Add CI workflow\"\n\n# Push the workflow to GitHub\ngit push origin main",
      config:
        "# .github/workflows/ci.yml\nname: DevMavox CI\n\non:\n  push:\n    branches:\n      - main\n      - develop\n  pull_request:\n    branches:\n      - main\n      - develop\n\npermissions:\n  contents: read\n\nconcurrency:\n  group: ci-${{ github.workflow }}-${{ github.ref }}\n  cancel-in-progress: true\n\njobs:\n  build:\n    name: Install, Test and Build\n    runs-on: ubuntu-latest\n\n    steps:\n      - name: Checkout repository\n        uses: actions/checkout@v4\n\n      - name: Set up Node.js\n        uses: actions/setup-node@v4\n        with:\n          node-version: 22\n          cache: npm\n\n      - name: Install dependencies\n        run: npm ci\n\n      - name: Run lint\n        run: npm run lint --if-present\n\n      - name: Run tests\n        run: npm test --if-present\n\n      - name: Build application\n        run: npm run build",
      problems: [
        {
          issue:
            "GitHub Actions does not start after pushing code.",
          solution:
            "Check the workflow file path, YAML syntax, event trigger, branch filters and repository Actions settings. Workflow files must be inside .github/workflows."
        },
        {
          issue:
            "Workflow fails with permission denied.",
          solution:
            "Check the workflow's permissions block, repository Actions settings and the permissions required by the action or API operation. Grant only the minimum required permission."
        },
        {
          issue:
            "npm ci fails because the lockfile is missing or inconsistent.",
          solution:
            "Commit the correct package-lock.json generated for the project and keep it synchronized with package.json. Use npm install to update the lockfile when dependencies change, then commit both files."
        },
        {
          issue:
            "A workflow succeeds on one branch but not another.",
          solution:
            "Compare branch-specific configuration, environment variables, secrets, permissions and the exact code revision. Review branch filters and protection rules."
        }
      ]
    },

    {
      heading: "10. GitHub Actions Secrets and Environment Protection",
      explanation:
        "A GitHub Actions workflow often needs secrets for deployment, registry login or cloud access. GitHub Actions Secrets provides a secure storage location for sensitive values. A workflow can reference an approved secret using the secrets context. The secret value should not be written directly into the YAML file. GitHub also supports environments such as development, staging and production. Environments can have deployment protection rules and environment-specific secrets. For example, a production deployment can require approval from an authorized reviewer before the deployment job proceeds. This separates ordinary CI validation from privileged release operations. A secure workflow should avoid exposing secrets to untrusted pull-request code, should grant minimal token permissions and should prefer short-lived credentials when possible.",
      steps: [
        "Open the repository settings and navigate to Secrets and variables under Actions.",
        "Create the required repository or environment secret.",
        "Use a descriptive secret name such as DEPLOY_TOKEN.",
        "Reference the secret using the secrets context in the required workflow step.",
        "Avoid writing the secret value into the workflow file.",
        "Create a production environment when deployment approval or environment-specific settings are required.",
        "Configure protection rules for sensitive environments.",
        "Use the GITHUB_TOKEN with minimum permissions required by the job.",
        "Use OIDC-based short-lived cloud credentials where supported instead of long-lived access keys.",
        "Review workflow logs and ensure no command prints secret values."
      ],
      commands:
        "# Inspect workflow files locally\ngit ls-files .github/workflows\n\n# Validate the workflow using an appropriate YAML or Actions linter.\n# A successful YAML parse does not guarantee correct GitHub Actions behavior.\n\n# Review the latest workflow-related Git changes\ngit diff -- .github/workflows/",
      config:
        "# Example production deployment job\nname: Production Deployment\n\non:\n  workflow_dispatch:\n\npermissions:\n  contents: read\n\njobs:\n  deploy:\n    runs-on: ubuntu-latest\n    environment: production\n    permissions:\n      contents: read\n      id-token: write\n\n    steps:\n      - name: Checkout repository\n        uses: actions/checkout@v4\n\n      - name: Deploy application\n        env:\n          DEPLOY_TOKEN: ${{ secrets.DEPLOY_TOKEN }}\n        run: |\n          set +x\n          echo \"Starting approved production deployment\"\n          # Add the real deployment command here.\n          # The command must use DEPLOY_TOKEN securely.\n          # Never echo the token value.",
      problems: [
        {
          issue:
            "A workflow cannot read a secret.",
          solution:
            "Check the secret name, repository or environment scope, job environment and event type. Some events from forks or untrusted pull requests do not receive access to repository secrets."
        },
        {
          issue:
            "Production deployment starts without an expected approval.",
          solution:
            "Check whether the deployment job references the correct production environment and whether environment protection rules are configured correctly."
        },
        {
          issue:
            "The workflow uses a long-lived cloud access key.",
          solution:
            "Where supported, configure workload identity federation using GitHub OIDC and a restricted cloud trust policy. Use short-lived credentials with minimum permissions."
        }
      ]
    },

    {
      heading: "11. GitHub Actions Matrix Strategy – Testing Multiple Versions",
      explanation:
        "A matrix strategy allows one GitHub Actions job definition to run with multiple combinations of input values. For example, a Node.js application may need testing against several Node.js versions. Without a matrix, an engineer may duplicate almost the same job several times. Matrix configuration reduces duplication and makes the workflow easier to maintain. GitHub Actions creates separate job runs for the configured combinations. Matrix jobs can run in parallel depending on available runner capacity and workflow limits. Use fail-fast carefully: by default, a failing matrix job can cancel other in-progress matrix jobs. For important compatibility testing, you may prefer to allow all combinations to finish so that you can see every failure.",
      steps: [
        "Identify which versions or operating-system combinations the application must support.",
        "Define a matrix under the job strategy.",
        "Create one or more matrix variables such as node-version.",
        "Reference the matrix values using the matrix context.",
        "Run the same installation, test and build steps for each combination.",
        "Use include and exclude when certain combinations need extra settings or should not run.",
        "Review the individual matrix job results after the workflow finishes.",
        "Avoid creating unnecessarily large matrices because every combination consumes runner time."
      ],
      commands:
        "# Example local checks before using a matrix workflow\nnode --version\nnpm --version\nnpm ci\nnpm test",
      config:
        "name: Node Compatibility Tests\n\non:\n  pull_request:\n\npermissions:\n  contents: read\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    strategy:\n      fail-fast: false\n      matrix:\n        node-version: [20, 22]\n\n    steps:\n      - name: Checkout repository\n        uses: actions/checkout@v4\n\n      - name: Set up Node.js\n        uses: actions/setup-node@v4\n        with:\n          node-version: ${{ matrix.node-version }}\n          cache: npm\n\n      - name: Install dependencies\n        run: npm ci\n\n      - name: Run tests\n        run: npm test",
      problems: [
        {
          issue:
            "One matrix combination fails while others succeed.",
          solution:
            "Open the failed matrix job and inspect its runtime version, dependency compatibility and test output. A matrix failure may reveal a real compatibility issue rather than a GitHub Actions problem."
        },
        {
          issue:
            "The matrix creates too many jobs.",
          solution:
            "Reduce the version combinations to the supported test matrix. Use include and exclude to avoid unnecessary combinations."
        }
      ]
    },

    {
      heading: "12. Terraform HCL – Understanding Infrastructure as Code",
      explanation:
        "Terraform is an Infrastructure as Code tool. It allows engineers to define infrastructure in configuration files rather than creating every resource manually through a cloud console. Terraform commonly uses HCL, which stands for HashiCorp Configuration Language. HCL is designed to be readable and supports blocks, arguments, expressions, variables, functions and references. For example, an AWS EC2 instance can be described in a Terraform resource block. Terraform reads the configuration, compares it with the current state and the real infrastructure, and creates an execution plan. The plan shows which resources Terraform intends to create, update or destroy. After reviewing the plan, an authorized engineer can apply it. Terraform stores resource tracking information in a state file. State is important because Terraform uses it to understand which real infrastructure resources are managed by the configuration. State can contain sensitive values, so it must be protected. For team environments, a remote backend with access control and state locking is normally preferable to sharing a local state file.",
      steps: [
        "Install Terraform on the workstation or CI/CD agent.",
        "Create a dedicated directory for the infrastructure project.",
        "Create main.tf for resource definitions.",
        "Create variables.tf for configurable inputs.",
        "Create outputs.tf for useful values returned after deployment.",
        "Define required providers and provider versions.",
        "Run terraform init to download providers and initialize the backend.",
        "Run terraform fmt to format the configuration.",
        "Run terraform validate to check configuration structure and internal consistency.",
        "Run terraform plan to review proposed changes.",
        "Check whether the plan creates, updates or destroys resources.",
        "Run terraform apply only after reviewing and approving the plan.",
        "Protect the state file and use a remote backend for team collaboration.",
        "Do not manually edit state files unless following a carefully planned state-recovery procedure."
      ],
      commands:
        "# Check Terraform installation\nterraform version\n\n# Initialize the working directory and providers\nterraform init\n\n# Format Terraform files\nterraform fmt -recursive\n\n# Validate the configuration\nterraform validate\n\n# Create a readable execution plan\nterraform plan\n\n# Save a plan for later review and application\nterraform plan -out=tfplan\n\n# Inspect a saved plan\nterraform show tfplan\n\n# Apply the reviewed saved plan\nterraform apply tfplan\n\n# Display outputs\nterraform output\n\n# Display the state-managed resources\nterraform state list\n\n# Destroy infrastructure only when intentionally required\n# Review the destruction plan before confirming.\nterraform plan -destroy",
      config:
        "# versions.tf\nterraform {\n  required_version = \">= 1.6.0, < 2.0.0\"\n\n  required_providers {\n    aws = {\n      source  = \"hashicorp/aws\"\n      version = \"~> 5.0\"\n    }\n  }\n}\n\n# provider.tf\nprovider \"aws\" {\n  region = var.aws_region\n}\n\n# variables.tf\nvariable \"aws_region\" {\n  description = \"AWS region where infrastructure will be created\"\n  type        = string\n  default     = \"ap-south-1\"\n}\n\nvariable \"instance_type\" {\n  description = \"EC2 instance type\"\n  type        = string\n  default     = \"t3.micro\"\n}\n\nvariable \"environment\" {\n  description = \"Environment name\"\n  type        = string\n  default     = \"development\"\n}\n\n# main.tf\nresource \"aws_instance\" \"devmavox_server\" {\n  ami           = \"ami-REPLACE_WITH_A_VALID_REGION_AMI_ID\"\n  instance_type = var.instance_type\n\n  tags = {\n    Name        = \"devmavox-server\"\n    Environment = var.environment\n    ManagedBy   = \"Terraform\"\n  }\n}\n\n# outputs.tf\noutput \"instance_id\" {\n  description = \"ID of the created EC2 instance\"\n  value       = aws_instance.devmavox_server.id\n}\n\noutput \"instance_type\" {\n  description = \"Selected EC2 instance type\"\n  value       = aws_instance.devmavox_server.instance_type\n}",
      problems: [
        {
          issue:
            "terraform init fails to download a provider.",
          solution:
            "Check network access, provider source address, required provider version and Terraform registry availability. Inspect the error before changing provider versions."
        },
        {
          issue:
            "terraform validate reports an unsupported argument or missing required argument.",
          solution:
            "Check the resource type and provider documentation for the selected provider version. Confirm that the argument belongs to the correct resource or data source."
        },
        {
          issue:
            "terraform plan wants to destroy an unexpected resource.",
          solution:
            "Do not apply the plan. Review the resource address, configuration changes, state, provider configuration and lifecycle settings. Identify the cause before proceeding."
        },
        {
          issue:
            "Two engineers overwrite each other's state changes.",
          solution:
            "Use a supported remote backend with state locking and controlled access. Avoid sharing local state files through email or ordinary file-sharing folders."
        }
      ]
    },

    {
      heading: "13. Terraform Variables, Locals and Outputs",
      explanation:
        "Terraform variables allow a configuration to accept values from outside the configuration itself. For example, the same infrastructure code can create development and production resources with different instance sizes or naming conventions. Variables are declared using variable blocks. The type argument defines the expected data type, while description explains the purpose. A default value is optional. Values can be supplied using command-line options, environment variables, variable definition files or other supported input methods. Locals are named expressions used internally to avoid repeating calculations or long expressions. Outputs expose selected values after Terraform operations, such as an instance ID or a load balancer DNS name. Outputs are useful for connecting separate infrastructure components, but sensitive outputs still need careful handling. Marking a value sensitive hides it in some Terraform output displays; it does not remove the value from state.",
      steps: [
        "Declare each configurable input in variables.tf.",
        "Choose an appropriate type such as string, number, bool, list or map.",
        "Provide a description so that another engineer understands the input.",
        "Use a default only when a safe and meaningful default exists.",
        "Use locals for repeated expressions, derived names and common tags.",
        "Use variables in resource arguments instead of hardcoding environment-specific values.",
        "Declare outputs for values that other modules or operators need.",
        "Use sensitive = true for values that should be hidden from normal output display.",
        "Remember that sensitive values may still exist in state and plan files.",
        "Keep real secret values out of Git and use an approved secret input method."
      ],
      commands:
        "# Supply a variable through the command line\nterraform plan -var='environment=staging'\n\n# Use a variable file\nterraform plan -var-file='staging.tfvars'\n\n# Apply a reviewed plan created with the correct variable values\nterraform apply tfplan\n\n# Display declared outputs\nterraform output\n\n# Display one output\nterraform output instance_id",
      config:
        "# variables.tf\nvariable \"project_name\" {\n  description = \"Name used to identify the project\"\n  type        = string\n  default     = \"devmavox\"\n}\n\nvariable \"environment\" {\n  description = \"Deployment environment\"\n  type        = string\n  validation {\n    condition     = contains([\"development\", \"staging\", \"production\"], var.environment)\n    error_message = \"Environment must be development, staging or production.\"\n  }\n}\n\nvariable \"instance_count\" {\n  description = \"Number of instances to create\"\n  type        = number\n  default     = 1\n}\n\n# locals.tf\nlocals {\n  resource_prefix = \"${var.project_name}-${var.environment}\"\n\n  common_tags = {\n    Project     = var.project_name\n    Environment = var.environment\n    ManagedBy   = \"Terraform\"\n  }\n}\n\n# outputs.tf\noutput \"resource_prefix\" {\n  description = \"Common resource naming prefix\"\n  value       = local.resource_prefix\n}\n\noutput \"deployment_environment\" {\n  description = \"Selected deployment environment\"\n  value       = var.environment\n}",
      problems: [
        {
          issue:
            "Terraform asks for a required variable value.",
          solution:
            "Provide the value through a suitable -var option, a variable file or an approved environment-based input. Check whether the variable has a default."
        },
        {
          issue:
            "A variable receives a value of the wrong type.",
          solution:
            "Check the declared variable type and the supplied value. For example, provide a number for a number variable rather than an arbitrary text value."
        },
        {
          issue:
            "A sensitive output is still present in Terraform state.",
          solution:
            "Sensitive output marking is not encryption or state removal. Protect the backend, restrict access and use an appropriate secret-management approach."
        }
      ]
    },

    {
      heading: "14. Terraform for_each and count – Creating Multiple Resources",
      explanation:
        "Terraform supports count and for_each to create multiple instances of a resource from one resource block. count is useful when the required number of similar resources is known and they can be identified by numeric indexes. for_each is usually better when resources are identified by stable keys, such as environment names or subnet names. The choice matters because Terraform uses resource addresses to track each instance in state. With count, removing an item from the middle of a list can shift numeric indexes and may cause Terraform to propose unexpected changes. With for_each, meaningful keys provide more stable resource addresses. Do not choose count or for_each only to reduce the number of lines in a file. Choose the approach that best represents the identity and lifecycle of the resources.",
      steps: [
        "Use count when a resource is naturally represented by a number of similar instances.",
        "Use for_each when each resource has a meaningful and stable key.",
        "Reference count.index inside a count-based resource.",
        "Reference each.key and each.value inside a for_each resource.",
        "Keep keys predictable across plans and deployments.",
        "Review resource address changes before applying configuration updates.",
        "Use terraform plan to verify that removing an item will not destroy or recreate unrelated infrastructure."
      ],
      commands:
        "# Review all instances managed by Terraform\nterraform state list\n\n# Inspect one resource instance\nterraform state show 'aws_instance.example[0]'\n\n# Inspect a for_each resource instance\nterraform state show 'aws_instance.environment[\"development\"]'\n\n# Review changes before applying\nterraform plan",
      config:
        "# count example\nvariable \"instance_count\" {\n  type    = number\n  default = 2\n}\n\nresource \"aws_instance\" \"count_example\" {\n  count         = var.instance_count\n  ami           = \"ami-REPLACE_WITH_VALID_AMI\"\n  instance_type = \"t3.micro\"\n\n  tags = {\n    Name = \"devmavox-server-${count.index + 1}\"\n  }\n}\n\n# for_each example\nvariable \"environments\" {\n  type = map(string)\n  default = {\n    development = \"t3.micro\"\n    staging     = \"t3.small\"\n  }\n}\n\nresource \"aws_instance\" \"environment\" {\n  for_each = var.environments\n\n  ami           = \"ami-REPLACE_WITH_VALID_AMI\"\n  instance_type = each.value\n\n  tags = {\n    Name        = \"devmavox-${each.key}\"\n    Environment = each.key\n  }\n}",
      problems: [
        {
          issue:
            "Terraform proposes replacing multiple count-based resources after removing one list element.",
          solution:
            "Review the resource addresses and list ordering. If resources have stable identities, consider for_each with meaningful keys and plan any state migration carefully."
        },
        {
          issue:
            "for_each reports that the map or set keys are unknown during planning.",
          solution:
            "Use keys that are known before apply. Values may sometimes depend on resources created during the same operation, but Terraform needs to know which instances must exist during planning."
        }
      ]
    },

    {
      heading: "15. Terraform Modules – Reusable Infrastructure Design",
      explanation:
        "A Terraform module is a collection of Terraform configuration files that work together as a reusable unit. The root module is the directory where Terraform is run. A child module is called from another module using a module block. Modules help teams avoid writing the same infrastructure configuration repeatedly. For example, a company may create one reusable VPC module and use it in development, staging and production. A module can accept input variables and return output values. A good module has a clear responsibility, documented inputs, predictable outputs and controlled provider requirements. Do not create modules simply to split every resource into a separate directory. Modules should represent useful reusable infrastructure components. When using remote modules, pin a version or source revision where supported so that infrastructure changes do not unexpectedly occur because a module changed.",
      steps: [
        "Identify a group of resources that forms a reusable infrastructure component.",
        "Create a module directory such as modules/network.",
        "Put the module's resources in main.tf.",
        "Declare module inputs in variables.tf.",
        "Expose useful results through outputs.tf.",
        "Call the module from the root configuration using a module block.",
        "Pass required input values explicitly.",
        "Use outputs to connect module results to other infrastructure resources.",
        "Pin remote module versions where supported.",
        "Run terraform init and terraform plan after changing module sources or versions."
      ],
      commands:
        "# Typical Terraform module structure\nfind . -maxdepth 3 -type f -name '*.tf'\n\n# Initialize module dependencies\nterraform init\n\n# Validate the root module and child modules\nterraform validate\n\n# Review the complete planned infrastructure change\nterraform plan",
      config:
        "# Project structure\n# infrastructure/\n#   main.tf\n#   variables.tf\n#   outputs.tf\n#   modules/\n#     network/\n#       main.tf\n#       variables.tf\n#       outputs.tf\n\n# root main.tf\nmodule \"network\" {\n  source      = \"./modules/network\"\n  environment = var.environment\n  vpc_cidr    = \"10.0.0.0/16\"\n}\n\n# modules/network/variables.tf\nvariable \"environment\" {\n  type = string\n}\n\nvariable \"vpc_cidr\" {\n  type = string\n}\n\n# modules/network/main.tf\nresource \"aws_vpc\" \"main\" {\n  cidr_block           = var.vpc_cidr\n  enable_dns_support   = true\n  enable_dns_hostnames = true\n\n  tags = {\n    Name        = \"devmavox-${var.environment}-vpc\"\n    Environment = var.environment\n  }\n}\n\n# modules/network/outputs.tf\noutput \"vpc_id\" {\n  description = \"ID of the created VPC\"\n  value       = aws_vpc.main.id\n}\n\n# root outputs.tf\noutput \"network_vpc_id\" {\n  value = module.network.vpc_id\n}",
      problems: [
        {
          issue:
            "Terraform reports that a module source has changed.",
          solution:
            "Run terraform init to initialize or update module dependencies, then review the plan before applying."
        },
        {
          issue:
            "A root configuration cannot access a resource inside a child module directly.",
          solution:
            "Declare an output in the child module and reference it through module.module_name.output_name in the root module."
        },
        {
          issue:
            "A remote module update changes planned infrastructure unexpectedly.",
          solution:
            "Pin the module version or source revision, review its changelog and inspect the plan before applying the update."
        }
      ]
    },

    {
      heading: "16. Terraform State and Remote Backend Configuration",
      explanation:
        "Terraform state is the information Terraform uses to map configuration resources to real infrastructure objects. It records resource identities and other attributes required to calculate future changes. The default local state file is usually named terraform.tfstate. This file is important and may contain sensitive information. Do not commit it to a normal application repository. When several engineers work on the same infrastructure, a shared remote backend is normally required. A remote backend stores state in a shared location and can provide access control, versioning and locking depending on the backend. State locking prevents multiple supported Terraform operations from modifying the same state at the same time. For example, an S3 backend can use an S3 bucket with versioning and an appropriate locking configuration. The bucket, encryption, IAM permissions, backend initialization and recovery process must be designed carefully. Do not assume that simply storing a state file in a shared folder provides safe locking.",
      steps: [
        "Understand which backend is currently configured for the Terraform project.",
        "Keep local state files and saved plans out of Git.",
        "Choose a supported remote backend for team collaboration.",
        "Create the required backend storage and permissions using a controlled bootstrap process.",
        "Enable encryption and versioning where supported.",
        "Configure state locking using the backend's supported mechanism.",
        "Restrict access to state because it can contain sensitive values.",
        "Run terraform init to initialize the backend.",
        "When migrating existing state, use Terraform's supported migration process and back up state first.",
        "Do not manually delete or overwrite a production state file.",
        "Document recovery, backup and access procedures."
      ],
      commands:
        "# Inspect the current Terraform state resources\nterraform state list\n\n# Create a backup before a planned state operation\nterraform state pull > terraform-state-backup.json\n\n# Protect the backup file. It may contain sensitive data.\n\n# Initialize the configured backend\nterraform init\n\n# Reconfigure backend settings when intentionally required\nterraform init -reconfigure\n\n# Migrate existing state to a newly configured backend when planned\nterraform init -migrate-state",
      config:
        "# Example S3 backend configuration\n# The bucket and key must be created and secured appropriately.\nterraform {\n  backend \"s3\" {\n    bucket       = \"replace-with-secure-terraform-state-bucket\"\n    key          = \"devmavox/production/terraform.tfstate\"\n    region       = \"ap-south-1\"\n    encrypt      = true\n    use_lockfile = true\n  }\n}\n\n# Example .gitignore entries\n.terraform/\n*.tfstate\n*.tfstate.*\n*.tfplan\n*.tfplan.*\n*.tfvars\n*.tfvars.json\ncrash.log",
      problems: [
        {
          issue:
            "Terraform reports that the state is locked.",
          solution:
            "Identify the operation holding the lock and allow it to finish. Do not force-unlock unless you have confirmed that the original operation is no longer running and you understand the risk of concurrent state changes."
        },
        {
          issue:
            "Terraform cannot access the remote backend.",
          solution:
            "Check cloud credentials, bucket or storage permissions, backend configuration, network connectivity and encryption settings."
        },
        {
          issue:
            "A state file was accidentally committed to Git.",
          solution:
            "Treat it as a sensitive-data exposure. Restrict access, rotate any exposed credentials, remove the file from repository history using an approved procedure and move state to a protected backend."
        }
      ]
    },

    {
      heading: "17. Real-Time Example – Complete Application Configuration Flow",
      explanation:
        "Consider a company developing a web application. Developers write application code and store it in GitHub. GitHub Actions runs automated checks whenever a pull request is opened. After the change is approved and merged, a release pipeline builds a container image and pushes it to a container registry. Kubernetes Deployment YAML describes how many application Pods should run. A Service provides a stable internal endpoint for those Pods. ConfigMaps provide non-sensitive application settings, while Secrets or an external secret manager provide credentials. Terraform manages the cloud infrastructure such as networking, compute resources and supporting services. Docker Compose can provide a consistent local development environment for the application and its database. These files serve different purposes, but together they form a repeatable DevOps workflow. One important principle is to avoid using one configuration file for every environment without considering the differences between development, staging and production. The same application image can be promoted between environments while configuration and permissions are supplied separately.",
      steps: [
        "Developer creates or updates application code and pushes a branch to GitHub.",
        "GitHub Actions checks out the repository and runs lint, tests and build steps.",
        "A successful release process builds a versioned container image.",
        "The image is pushed to a trusted container registry.",
        "The Kubernetes Deployment is updated to use the approved image version.",
        "Kubernetes gradually replaces old Pods according to the Deployment rollout strategy.",
        "The readiness probe prevents a Pod from receiving normal Service traffic until it is ready.",
        "The Service routes requests to the ready matching Pods.",
        "ConfigMaps provide non-sensitive environment configuration.",
        "Secrets are delivered through approved secret-management controls.",
        "Terraform maintains the underlying cloud infrastructure and networking.",
        "Monitoring and logging systems verify application health after deployment.",
        "If a release fails, the team inspects rollout status, logs, events and metrics before deciding whether to roll back."
      ],
      commands:
        "# Local development with Docker Compose\ndocker compose up -d\n\n# Run application checks\nnpm ci\nnpm test --if-present\nnpm run build\n\n# Review Git changes\ngit status\ngit diff\n\n# Check Kubernetes Deployment status\nkubectl rollout status deployment/devmavox-app\n\n# Check Pods and their node placement\nkubectl get pods -o wide\n\n# Check recent application events\nkubectl get events --sort-by=.metadata.creationTimestamp\n\n# Check Terraform infrastructure plan\nterraform plan",
      config:
        "# Example repository structure\n# devmavox/\n#   app/                         Application source code\n#   Dockerfile                   Container build instructions\n#   compose.yaml                 Local multi-container development\n#   .dockerignore                Files excluded from Docker build context\n#   .github/\n#     workflows/\n#       ci.yml                   Automated build and test workflow\n#   k8s/\n#     deployment.yaml            Kubernetes Deployment\n#     service.yaml                Kubernetes Service\n#     configmap.yaml              Non-sensitive configuration\n#   infrastructure/\n#     versions.tf                 Terraform provider requirements\n#     main.tf                     Infrastructure resources\n#     variables.tf                Input variables\n#     outputs.tf                  Useful output values\n#\n# Keep secrets out of Git. Use approved secret management.\n# Use immutable image tags for controlled deployments.",
      problems: [
        {
          issue:
            "CI passes but the Kubernetes deployment fails.",
          solution:
            "CI success only confirms the checks that the workflow actually ran. Inspect the deployment image, cluster permissions, manifest validation, Pod events, health probes and runtime configuration."
        },
        {
          issue:
            "The new image is built but Kubernetes continues running the previous version.",
          solution:
            "Check the image tag in the Deployment, image pull policy, registry access and rollout status. Use a new immutable image tag and update the Deployment to that exact version."
        },
        {
          issue:
            "Application works locally with Compose but fails in Kubernetes.",
          solution:
            "Compare environment variables, service discovery, storage, port bindings, health checks, resource limits, security settings and network policies. Compose and Kubernetes do not have identical runtime behavior."
        },
        {
          issue:
            "Infrastructure and application deployment are mixed into one uncontrolled pipeline.",
          solution:
            "Separate infrastructure planning and approval from application build and deployment where appropriate. Use clear permissions, reviewed Terraform plans and controlled release stages."
        }
      ]
    },

    {
      heading: "18. YAML and Configuration Validation – Before Deployment",
      explanation:
        "A configuration file must be checked before it is used. YAML indentation errors can stop a parser from reading a file. A YAML file can also be syntactically valid but still contain invalid Kubernetes fields, incorrect selectors or unsupported values. That is why validation should happen in stages. First check syntax, then check tool-specific schemas and policies, and finally test behavior in a suitable environment. For Kubernetes, kubectl apply --dry-run=client can perform client-side validation, while server-side dry-run asks the API server to validate a request without persisting the object. Terraform has fmt, validate and plan. Docker Compose has docker compose config. GitHub Actions workflows can be checked with an appropriate workflow linter. Jenkins pipelines can be validated using the available Jenkins pipeline tooling or a test Jenkins environment. A successful syntax check is only one part of configuration quality.",
      steps: [
        "Check file names and extensions.",
        "Use spaces rather than tabs for YAML indentation.",
        "Check required fields and data types.",
        "Run the native configuration validator for the tool.",
        "Use schema or policy checks where available.",
        "Review the proposed infrastructure or deployment change.",
        "Run the configuration in a development or staging environment.",
        "Check application behavior and logs after deployment.",
        "Use code review and version control before production changes.",
        "Keep validation tools and schemas updated with the platform versions used by the project."
      ],
      commands:
        "# Docker Compose validation\ndocker compose config --quiet\n\n# Kubernetes client-side dry run\nkubectl apply --dry-run=client -f k8s/\n\n# Kubernetes server-side dry run\nkubectl apply --dry-run=server -f k8s/\n\n# Terraform formatting and validation\nterraform fmt -check -recursive\nterraform validate\nterraform plan\n\n# Check YAML with a suitable YAML linter when installed\nyamllint .github/workflows/ci.yml\n\n# Review all configuration changes\ngit diff",
      problems: [
        {
          issue:
            "YAML parser reports an indentation or mapping error.",
          solution:
            "Check indentation levels, colons, quotation marks and list markers. Use spaces consistently and keep child properties aligned under their parent."
        },
        {
          issue:
            "YAML passes syntax validation but the platform rejects it.",
          solution:
            "Run the platform-specific validator. A general YAML parser cannot verify Kubernetes API fields, Compose semantics or GitHub Actions workflow rules."
        },
        {
          issue:
            "A configuration passes validation but behaves incorrectly after deployment.",
          solution:
            "Validation does not replace runtime testing. Inspect events, application logs, network connectivity, permissions and the actual values supplied to the workload."
        }
      ]
    },

    {
      heading: "19. Configuration Management Best Practices",
      explanation:
        "Configuration files are part of the application's operational behavior. A small configuration change can expose a service publicly, delete stored data, increase cloud costs or stop a production deployment. Therefore, configuration should be treated like application code. Use Git history, code review, validation and controlled release processes. Keep development, staging and production settings separate. Use meaningful names and comments for non-obvious decisions. Avoid duplicating large blocks of configuration when reusable templates or modules are appropriate. Pin tool and provider versions when predictable behavior is important. Prefer immutable container image tags instead of repeatedly replacing the contents of a mutable tag such as latest. Apply least-privilege access controls. Protect state files and secrets. Review destructive changes before approving them. Maintain backups and rollback procedures for important systems.",
      steps: [
        "Use meaningful file names such as deployment.yaml, service.yaml, ci.yml and main.tf.",
        "Use consistent indentation and formatting.",
        "Keep each file focused on a clear responsibility.",
        "Separate non-sensitive configuration from confidential credentials.",
        "Never commit passwords, private keys, access tokens or production secret values.",
        "Use environment-specific configuration for development, staging and production.",
        "Pin container image versions and tool/provider versions when reproducibility matters.",
        "Use least-privilege permissions for CI/CD tokens, cloud identities and Kubernetes service accounts.",
        "Validate every configuration change before deployment.",
        "Review Terraform plans and Kubernetes changes before applying them.",
        "Use health checks and readiness probes for applications that require them.",
        "Protect Terraform state with secure remote storage and locking.",
        "Use persistent storage for databases and other stateful services.",
        "Keep configuration changes in Git so that they can be reviewed and audited.",
        "Document important assumptions, dependencies and rollback steps.",
        "Monitor the system after deployment to verify that the intended configuration actually works."
      ],
      commands:
        "# Check repository changes before committing\ngit status\ngit diff\n\n# Search for accidentally tracked environment files\ngit ls-files | grep -E '(^|/)\\.env($|\\.)'\n\n# Search for Terraform state files tracked by Git\ngit ls-files | grep -E '\\.tfstate($|\\.)'\n\n# Format Terraform files\nterraform fmt -recursive\n\n# Validate Compose configuration\ndocker compose config --quiet\n\n# Validate Kubernetes manifests without applying them\nkubectl apply --dry-run=client -f k8s/",
      config:
        "# Example .gitignore entries\n.env\n.env.*\n!.env.example\n\n# Terraform local working files and state\n.terraform/\n*.tfstate\n*.tfstate.*\n*.tfplan\n*.tfplan.*\n*.tfvars\n*.tfvars.json\n\n# Local application files\nnode_modules/\n.next/\n\n# Never commit real secrets, private keys or production credentials.\n# Keep a safe .env.example with placeholder values.",
      problems: [
        {
          issue:
            "Configuration values are duplicated across many files and become inconsistent.",
          solution:
            "Identify common values and use supported variables, templates, reusable modules or shared configuration mechanisms. Keep environment-specific values explicit."
        },
        {
          issue:
            "An engineer applies a production change without reviewing the impact.",
          solution:
            "Require code review, native validation and a reviewed execution plan or deployment diff. Use approval gates for high-impact production changes."
        },
        {
          issue:
            "A mutable image tag makes it difficult to identify which application version is running.",
          solution:
            "Build and deploy immutable version tags or image digests. Record the source commit and artifact version for traceability."
        },
        {
          issue:
            "A configuration change causes an outage and the team does not know how to recover.",
          solution:
            "Maintain rollback procedures, deployment history, configuration backups where appropriate and clear ownership. Test recovery procedures before an incident."
        }
      ]
    },

    {
      heading: "20. Common Configuration Mistakes – Practical Troubleshooting Checklist",
      explanation:
        "Many production problems are caused not by a tool failure but by a small configuration mistake. A wrong port can make an application unreachable. A label mismatch can leave a Kubernetes Service without endpoints. A missing environment variable can stop an application from starting. An incorrect YAML indentation level can change the structure of the entire file. A Terraform provider version change can introduce unexpected infrastructure differences. A CI/CD workflow may have insufficient permissions even when its YAML syntax is valid. Troubleshooting should start with the exact error message and the layer where the problem occurs. First confirm whether the file can be parsed. Then check whether the tool accepts the configuration. Finally inspect runtime behavior. Change one thing at a time and re-run the appropriate validation so that the actual cause becomes clear.",
      steps: [
        "Read the complete error message instead of focusing only on the final line.",
        "Identify the tool that reads the file: Kubernetes, Docker Compose, Jenkins, GitHub Actions or Terraform.",
        "Check whether the file path and file name are correct.",
        "Check syntax, indentation, spelling and required fields.",
        "Verify names and references between resources.",
        "Check permissions and authentication.",
        "Check whether the expected network port and service endpoint are available.",
        "Inspect logs and events from the component that failed.",
        "Compare the working configuration with the failing configuration.",
        "Make a small correction and run validation again.",
        "Use a safe test environment before repeating a risky production operation.",
        "Document the root cause and preventive action after resolving the issue."
      ],
      commands:
        "# Kubernetes troubleshooting\nkubectl get pods -o wide\nkubectl describe pod <pod-name>\nkubectl logs <pod-name>\nkubectl get events --sort-by=.metadata.creationTimestamp\n\n# Docker Compose troubleshooting\ndocker compose ps\ndocker compose logs --tail=100\ndocker compose config\n\n# Terraform troubleshooting\nterraform fmt -check\nterraform validate\nterraform plan\nterraform state list\n\n# GitHub workflow review\n# Inspect .github/workflows/*.yml and the GitHub Actions job logs.\n\n# Jenkins review\n# Inspect the Jenkins build console output and failed stage.",
      problems: [
        {
          issue:
            "The same error keeps appearing after editing the configuration.",
          solution:
            "Confirm that the correct file is being edited and that the application or platform has actually reloaded the configuration. Check whether the deployment is using another file, branch, namespace or environment."
        },
        {
          issue:
            "The configuration works on one engineer's machine but not on another.",
          solution:
            "Compare tool versions, environment variables, credentials, operating system differences, local dependencies and configuration file versions. Use pinned versions and documented setup instructions."
        },
        {
          issue:
            "A configuration change fixes one environment but breaks another.",
          solution:
            "Check which values are shared and which are environment-specific. Separate environment inputs, validate each target environment and use a staged promotion process."
        },
        {
          issue:
            "A deployment has failed but the team immediately repeats the same command.",
          solution:
            "Stop and inspect the failure first. Repeating an operation without understanding its state can create duplicate resources, worsen an outage or cause data loss."
        }
      ]
    }
  ]
};

export default configurationExamplesData;
