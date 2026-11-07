import type { GlossaryLearningSection } from "./glossary-data";

export const dockerImageLearningContent: GlossaryLearningSection[] = [
  {
    title: "1. Purpose – Why Is It Used?",
    items: [
      {
        title: "Docker Image ante enti?",
        explanation: "Telugu Answer:\nDocker Image ante application run avvadaniki kavalsina code, runtime, libraries, dependencies, configuration files anni kalipi package chesina read-only template. Ee image base chesukoni Docker containers create chestham. Image anedi running application kaadu. Container create cheyadaniki use ayye package.\n\nEnglish Explanation:\nA Docker Image is a read-only template containing application code, runtime, libraries, dependencies, and configuration required to run an application. Docker uses this image to create containers. An image is not a running application; it is the package used to start containers.",
        example: "Example: Node.js application code, Node.js runtime, package dependencies, and startup configuration ni oka Docker Image lo package cheyyachu."
      },
      {
        title: "Docker Image enduku use chestaru?",
        explanation: "Telugu Answer:\nDeveloper laptop lo application correct ga run ayina, vere server lo dependencies mismatch valla fail avvachu. Docker Image application ki kavalsina environment ni package chesthundi. Anduke development, testing, staging, production environments lo same image use cheyyachu. Prathi server lo manual ga dependencies install cheyyalsina avasaram thagguthundi.\n\nEnglish Explanation:\nDocker Images package applications with their required runtime and dependencies. This reduces environment differences between development, testing, staging, and production. Teams can build an image once and deploy the same image consistently across multiple environments.",
        example: "Example: Developer machine lo build chesina image ni testing server and production server lo deploy cheyyachu."
      },
      {
        title: "Docker Image valla benefits enti?",
        explanation: "Telugu Answer:\nDocker Images valla portability, consistency, faster deployment, version control, repeatable builds benefits vasthayi. Application dependencies image lo package avvadam valla environment mismatch problems thagguthayi. Image tags use chesi different versions maintain cheyyachu. Registry lo store chesi vere servers ki distribute cheyyachu.\n\nEnglish Explanation:\nDocker Images provide portability, consistent environments, faster deployments, versioning, and repeatable application packaging. Images can be tagged, stored in registries, shared across teams, and deployed to different environments.",
        details: [
          "Portability – image ni different Docker hosts lo run cheyyachu.",
          "Consistency – environments madhya dependency differences thagguthayi.",
          "Versioning – tags use chesi image versions identify cheyyachu.",
          "Reusability – base images ni multiple applications lo reuse cheyyachu."
        ]
      },
      {
        title: "Docker Image ekkada use chestaru?",
        explanation: "Telugu Answer:\nDocker Images ni local development, application testing, CI/CD pipelines, cloud deployments, microservices, Kubernetes workloads, and production environments lo use chestaru. Developer image build chesi registry ki push chesthadu. Deployment system aa image ni pull chesi container start chesthundi.\n\nEnglish Explanation:\nDocker Images are used in local development, testing, CI/CD pipelines, cloud deployments, microservices, Kubernetes workloads, and production environments. Developers build images, push them to registries, and deployment platforms pull them to start containers.",
        example: "Example: Jenkins pipeline Docker Image build chesi Amazon ECR ki push chesthundi. Kubernetes aa image ni pull chesi application Pods start chesthundi."
      }
    ]
  },
  {
    title: "2. Real-Time Project Example",
    items: [
      {
        title: "Real-time project lo Docker Image ela use chestaru?",
        explanation: "Telugu Answer:\nOka e-commerce application lo frontend, backend, payment service separate services ga unnayi anukundam. Prathi service ki separate Dockerfile untundi. CI/CD pipeline source code checkout chesi Docker Image build chesthundi. Build ayina image ki version tag assign chesi registry ki push chesthundi. Deployment environment aa exact image version ni pull chesi containers run chesthundi.\n\nEnglish Explanation:\nIn an e-commerce project, frontend, backend, and payment services can each have their own Dockerfile. A CI/CD pipeline checks out the source code, builds Docker Images, assigns version tags, and pushes them to a registry. Deployment environments pull the selected image versions and run containers.",
        details: [
          "Developer code Git repository ki push chesthadu.",
          "Jenkins pipeline source code checkout chesthundi.",
          "Docker Image build and validation jaruguthayi.",
          "Image registry ki push avuthundi.",
          "Deployment platform image ni pull chesi container start chesthundi."
        ]
      },
      {
        title: "Development and production lo same image ela maintain chestaru?",
        explanation: "Telugu Answer:\nDevelopment lo test chesina image ni malli production kosam rebuild cheyyakunda same image digest ni promote cheyyadam better practice. Environment-specific configuration ni environment variables, secrets, or configuration management dwara provide chestharu. Ila chesthe development lo test chesina artifact production lo kuda same ga untundi.\n\nEnglish Explanation:\nA reliable deployment process promotes the same tested image digest from development to staging and production instead of rebuilding it for every environment. Environment-specific settings are provided through environment variables, secrets, or configuration management.",
        example: "Example: app:1.4.2 image staging lo validate ayyaka same image digest production ki promote chestharu."
      },
      {
        title: "Microservices project lo separate images enduku create chestaru?",
        explanation: "Telugu Answer:\nMicroservices architecture lo prathi service independent ga develop and deploy avuthundi. Anduke frontend, user-service, order-service, payment-service ki separate Docker Images build chestharu. Oka service update ayithe migatha services images rebuild cheyyalsina avasaram undadu. Service-wise scaling and rollback easy avuthayi.\n\nEnglish Explanation:\nMicroservices are independently developed and deployed. Separate Docker Images allow each service to be built, scaled, released, and rolled back independently without rebuilding unrelated services.",
        example: "Example: Payment service update ayithe payment-service image matrame rebuild chesi deploy cheyyachu."
      }
    ]
  },
  {
    title: "3. Workflow – How Does It Work?",
    items: [
      {
        title: "Docker Image creation workflow enti?",
        explanation: "Telugu Answer:\nDeveloper application code and Dockerfile prepare chesthadu. Docker build command Dockerfile instructions execute chesi image create chesthundi. Build process lo base image pull avvachu, files copy avuthayi, dependencies install avuthayi, configuration set avuthundi. Final image local Docker image store lo save avuthundi.\n\nEnglish Explanation:\nA developer prepares application source code and a Dockerfile. The Docker build command processes the Dockerfile instructions, obtains the base image, copies files, installs dependencies, and creates the final image in the local Docker image store.",
        details: [
          "Step 1: Application source code prepare cheyyali.",
          "Step 2: Dockerfile create cheyyali.",
          "Step 3: docker build command execute cheyyali.",
          "Step 4: Build output image ni verify cheyyali.",
          "Step 5: Image tag chesi registry ki push cheyyali."
        ],
        commands: [
          "docker build -t myapp:1.0 .",
          "docker images",
          "docker image inspect myapp:1.0"
        ]
      },
      {
        title: "Docker Image nunchi container ela create avuthundi?",
        explanation: "Telugu Answer:\nDocker run command image ni base chesukoni container create chesthundi. Image lo unna filesystem layers container ki base ga untayi. Container start ayinappudu image lo configure chesina default command or CMD execute avuthundi. Container ki writable layer add avuthundi; image layers matram read-only ga untayi.\n\nEnglish Explanation:\nThe docker run command creates a container from an image. The image provides the base filesystem layers, and Docker adds a writable container layer. When the container starts, Docker executes the configured startup command.",
        commands: [
          "docker run -d --name web myapp:1.0",
          "docker ps",
          "docker ps -a"
        ]
      },
      {
        title: "Image build ayyaka registry ki ela velthundi?",
        explanation: "Telugu Answer:\nLocal image ni remote registry ki upload cheyyadaniki mundu registry account ki login avvali. Tarvatha image ki registry path and tag assign chesi docker push execute cheyyali. Registry image layers ni store chesthundi. Authorized servers aa image ni docker pull command tho download chesukuntayi.\n\nEnglish Explanation:\nTo upload a local image to a remote registry, authenticate to the registry, tag the image with the registry path, and run docker push. The registry stores the image layers so authorized systems can download them using docker pull.",
        commands: [
          "docker login",
          "docker tag myapp:1.0 username/myapp:1.0",
          "docker push username/myapp:1.0"
        ]
      }
    ]
  },
  {
    title: "4. Practical Commands",
    items: [
      {
        title: "Docker Images list ela chudali?",
        explanation: "Telugu Answer:\nLocal system lo available unna Docker Images list chudataniki docker images command use chestham. Ee command repository name, tag, image ID, creation time, and size chupisthundi. Specific image details kavali ante docker image inspect use cheyyachu.\n\nEnglish Explanation:\nThe docker images command lists images available in the local Docker image store. It displays repository names, tags, image IDs, creation information, and sizes. Use docker image inspect to view detailed image metadata.",
        commands: [
          "docker images",
          "docker image ls",
          "docker image ls --digests",
          "docker image inspect nginx:latest"
        ]
      },
      {
        title: "Docker Image build ela cheyyali?",
        explanation: "Telugu Answer:\nDockerfile unna directory ki terminal lo velli docker build command execute cheyyali. -t option image ki name and tag assign chesthundi. Last lo unna dot current directory ni build context ga indicate chesthundi. Docker aa context nunchi required files access chesthundi.\n\nEnglish Explanation:\nRun docker build from the directory containing the Dockerfile. The -t option assigns a repository name and tag. The dot specifies the current directory as the build context.",
        commands: [
          "docker build -t myapp:1.0 .",
          "docker build -f Dockerfile.prod -t myapp:prod .",
          "docker build --no-cache -t myapp:1.0 ."
        ]
      },
      {
        title: "Docker Image pull and push commands enti?",
        explanation: "Telugu Answer:\ndocker pull remote registry nunchi image download chesthundi. docker push local image ni remote registry ki upload chesthundi. Push cheyyadaniki correct registry name, repository path, tag, and permissions undali.\n\nEnglish Explanation:\nThe docker pull command downloads an image from a registry. The docker push command uploads a local image to a registry. The correct repository path, tag, authentication, and permissions are required.",
        commands: [
          "docker pull nginx:latest",
          "docker pull redis:7",
          "docker tag myapp:1.0 username/myapp:1.0",
          "docker push username/myapp:1.0"
        ]
      },
      {
        title: "Unused Docker Images ela remove cheyyali?",
        explanation: "Telugu Answer:\nUnused image ni remove cheyyadaniki docker rmi command use chestham. Image ni use chesthunna container unte direct ga remove avvakapovachu. Unused dangling images clean cheyyadaniki docker image prune use cheyyachu. Cleanup mundu required images and running workloads verify cheyyali.\n\nEnglish Explanation:\nUse docker rmi to remove a specific image. Docker may prevent removal when containers depend on that image. The docker image prune command removes dangling images. Always verify workloads before cleanup.",
        commands: [
          "docker rmi myapp:1.0",
          "docker image prune",
          "docker image prune -a",
          "docker images"
        ]
      }
    ]
  },
  {
    title: "5. Common Mistakes",
    items: [
      {
        title: "Docker Image tag specify cheyyakapothe em avuthundi?",
        explanation: "Telugu Answer:\nImage pull or run command lo tag specify cheyyakapothe Docker default ga latest tag ni consider chesthundi. Kaani latest ante always newest or production-approved version ani guarantee ledu. Registry lo latest tag change avvachu. Production deployments lo explicit version tags or immutable digests use cheyyadam better.\n\nEnglish Explanation:\nWhen a tag is omitted, Docker generally uses the latest tag. However, latest does not guarantee the newest or approved production version. Production deployments should use explicit version tags or immutable image digests.",
        example: "Example: docker pull nginx command latest tag ni use chesthundi. docker pull nginx:1.27 explicit version ni request chesthundi."
      },
      {
        title: "Wrong build context valla problem enti?",
        explanation: "Telugu Answer:\nDocker build command lo wrong directory select chesthe Dockerfile ki required files build context lo dorakakapovachu. COPY instruction fail avvachu or incomplete application image create avvachu. Correct project root nunchi build command run cheyyali. .dockerignore file use chesi unnecessary files exclude cheyyali.\n\nEnglish Explanation:\nAn incorrect build context can prevent Docker from accessing files required by COPY instructions. This may cause build failures or incomplete images. Build from the correct project directory and use .dockerignore to exclude unnecessary files."
      },
      {
        title: "latest tag ni production lo blindly use cheyyadam enduku mistake?",
        explanation: "Telugu Answer:\nlatest tag different time lo different image versions ki point avvachu. Deployment reproducibility affect avuthundi. Rollback time lo exact previous version identify cheyyadam difficult avvachu. Production lo semantic version, release number, or image digest pin cheyyali.\n\nEnglish Explanation:\nThe latest tag can point to different image versions over time, making deployments less predictable and rollbacks harder. Production systems should pin explicit release tags or image digests."
      },
      {
        title: "Image remove cheyyadaniki mundu em check cheyyali?",
        explanation: "Telugu Answer:\nImage remove cheyyadaniki mundu aa image tho containers create ayyaya, running or stopped containers unnaya, deployment environment lo required aa ani check cheyyali. Unnecessary cleanup valla local testing or rollback ki kavalsina image delete avvachu.\n\nEnglish Explanation:\nBefore removing an image, check whether running or stopped containers depend on it and whether it is needed for testing or rollback. Unplanned cleanup can remove useful local artifacts.",
        commands: [
          "docker ps -a",
          "docker image ls",
          "docker image inspect myapp:1.0"
        ]
      }
    ]
  },
  {
    title: "6. Configuration Examples",
    items: [
      {
        title: "Simple Dockerfile tho image ela build cheyyali?",
        explanation: "Telugu Answer:\nDockerfile lo base image select chesi application files copy chesi required dependencies install chesi startup command define chestham. Docker build command ee instructions process chesi image create chesthundi. Base image version ni explicit ga specify cheyyadam reproducibility ki help chesthundi.\n\nEnglish Explanation:\nA Dockerfile selects a base image, copies application files, installs required dependencies, and defines the startup command. Docker processes these instructions to create an image. Explicit base image versions improve reproducibility.",
        example: "Example Dockerfile:\nFROM nginx:1.27\nCOPY ./html /usr/share/nginx/html\nEXPOSE 80\nCMD [\"nginx\", \"-g\", \"daemon off;\"]",
        commands: [
          "docker build -t website:1.0 .",
          "docker run -d -p 8080:80 website:1.0"
        ]
      },
      {
        title: "Docker build arguments ela pass cheyyali?",
        explanation: "Telugu Answer:\nDockerfile build time lo values receive cheyyadaniki ARG use chestham. Build command lo --build-arg option tho value pass chestham. ARG value image build process ki sambandhinchindi. Sensitive passwords or secrets ni ARG lo store cheyyakudadhu, endukante build metadata or layers dwara expose ayye risk untundi.\n\nEnglish Explanation:\nThe ARG instruction defines build-time variables in a Dockerfile. Values are supplied with --build-arg during the build. Do not use ARG for secrets because build metadata or image layers may expose sensitive values.",
        example: "Example:\nARG APP_VERSION=1.0\nRUN echo Building version $APP_VERSION",
        commands: [
          "docker build --build-arg APP_VERSION=2.0 -t myapp:2.0 ."
        ]
      },
      {
        title: "Environment variables image lo ela configure chestaru?",
        explanation: "Telugu Answer:\nDockerfile lo ENV instruction default environment variable set chesthundi. Container start chesetappudu -e option tho value override cheyyachu. Database passwords lanti sensitive values image lo hardcode cheyyakudadhu. Runtime secrets management use cheyyali.\n\nEnglish Explanation:\nThe ENV instruction defines default environment variables in an image. Runtime values can be overridden with the -e option. Sensitive values such as passwords should not be hardcoded into images.",
        example: "Example Dockerfile:\nENV APP_ENV=production",
        commands: [
          "docker run -e APP_ENV=staging myapp:1.0"
        ]
      }
    ]
  },
  {
    title: "7. Troubleshooting",
    items: [
      {
        title: "Docker Image build fail ayithe ela troubleshoot cheyyali?",
        explanation: "Telugu Answer:\nBuild failure vachinappudu first terminal output lo exact failing instruction identify cheyyali. Dockerfile syntax, base image availability, network connectivity, package repository access, COPY source paths, permissions, and build context check cheyyali. Error message ni batti issue isolate chesi fix chesaka build repeat cheyyali.\n\nEnglish Explanation:\nWhen an image build fails, identify the exact failing Dockerfile instruction from the build output. Check syntax, base image availability, network access, package repositories, COPY paths, permissions, and build context. Fix the root cause and rebuild.",
        commands: [
          "docker build --progress=plain -t myapp:debug .",
          "docker build --no-cache -t myapp:debug ."
        ]
      },
      {
        title: "Image pull access denied error enduku vasthundi?",
        explanation: "Telugu Answer:\nEe error private repository ki authentication lekapovadam, wrong image name, incorrect tag, or insufficient registry permissions valla ravachu. Registry URL and repository path verify cheyyali. Correct account tho login ayyi pull permission undho check cheyyali.\n\nEnglish Explanation:\nAn access denied error may occur because the repository is private, the image name or tag is incorrect, authentication is missing, or the account lacks pull permission. Verify the registry path and authenticate with an authorized account.",
        commands: [
          "docker login",
          "docker pull username/myapp:1.0"
        ]
      },
      {
        title: "no space left on device error ela solve cheyyali?",
        explanation: "Telugu Answer:\nDocker image layers, stopped containers, build cache, and volumes disk space consume chesthayi. First disk usage inspect cheyyali. Unused build cache and unnecessary images identify chesi safe ga cleanup cheyyali. Required production images or volumes ni blindly delete cheyyakudadhu.\n\nEnglish Explanation:\nDocker images, stopped containers, build cache, and volumes consume disk space. Inspect Docker disk usage first, identify unused resources, and clean them carefully. Never blindly remove production images or required volumes.",
        commands: [
          "docker system df",
          "docker image ls",
          "docker builder du",
          "docker builder prune"
        ]
      },
      {
        title: "Image architecture mismatch error ela fix cheyyali?",
        explanation: "Telugu Answer:\nImage architecture host architecture ki match kakapothe exec format error or platform mismatch ravachu. Host architecture and image platform verify cheyyali. Required platform kosam image build or pull cheyyali. Multi-platform image build cheyyadaniki Buildx use cheyyachu.\n\nEnglish Explanation:\nAn architecture mismatch can cause execution format errors or platform warnings. Verify the host architecture and image platform. Build or pull the correct platform image, or use Docker Buildx to create multi-platform images.",
        commands: [
          "docker info",
          "docker image inspect myapp:1.0",
          "docker buildx build --platform linux/amd64,linux/arm64 -t myapp:1.0 ."
        ]
      }
    ]
  },
  {
    title: "8. Best Practices",
    items: [
      {
        title: "Production Docker Images ki best practices enti?",
        explanation: "Telugu Answer:\nProduction images small, secure, reproducible, and maintainable ga undali. Trusted and supported base images use cheyyali. Unnecessary packages install cheyyakudadhu. Multi-stage builds use chesi build tools final image nunchi remove cheyyali. Explicit tags or digests pin cheyyali. Image scan and test chesina tarvatha deploy cheyyali.\n\nEnglish Explanation:\nProduction images should be small, secure, reproducible, and maintainable. Use trusted base images, avoid unnecessary packages, apply multi-stage builds, pin versions, scan vulnerabilities, and test images before deployment."
      },
      {
        title: "Small Docker Image ela create cheyyali?",
        explanation: "Telugu Answer:\nSmall image create cheyyadaniki lightweight trusted base image select cheyyali, multi-stage build use cheyyali, unnecessary build tools final stage lo include cheyyakudadhu, and .dockerignore maintain cheyyali. Image size thaggadam valla transfer time and storage usage reduce avuthayi. Kaani size kosam security updates sacrifice cheyyakudadhu.\n\nEnglish Explanation:\nCreate smaller images by selecting an appropriate trusted base image, using multi-stage builds, excluding unnecessary build tools from the final stage, and maintaining a .dockerignore file. Smaller images reduce transfer time and storage usage without sacrificing security updates."
      },
      {
        title: "Image versions ela manage cheyyali?",
        explanation: "Telugu Answer:\nPrathi release ki meaningful version tag assign cheyyali. Example ga 1.0.0, 1.0.1, 1.1.0 lanti versioning use cheyyachu. Build number or Git commit SHA kuda tag lo include cheyyachu. Production deployment lo mutable tags meeda depend avvakunda digest pin cheyyadam reliable.\n\nEnglish Explanation:\nAssign meaningful version tags to every release. Semantic versions, build numbers, or Git commit identifiers help trace artifacts. Pin image digests for production deployments when immutable references are required.",
        commands: [
          "docker tag myapp:build username/myapp:1.2.0",
          "docker push username/myapp:1.2.0",
          "docker image ls --digests"
        ]
      }
    ]
  },
  {
    title: "9. Security Considerations",
    items: [
      {
        title: "Docker Image security enduku important?",
        explanation: "Telugu Answer:\nImage lo vulnerable operating system packages, outdated libraries, malicious files, or exposed secrets undochu. Ee image production lo deploy ayithe application and infrastructure risk lo padathayi. Anduke trusted base images use cheyyali, regular ga scan cheyyali, dependencies update cheyyali, and secrets ni image lo include cheyyakudadhu.\n\nEnglish Explanation:\nImages may contain vulnerable operating system packages, outdated libraries, malicious files, or exposed secrets. Deploying insecure images creates application and infrastructure risks. Use trusted base images, scan regularly, update dependencies, and keep secrets outside images."
      },
      {
        title: "Docker Image lo passwords store cheyyadam safe aa?",
        explanation: "Telugu Answer:\nPasswords, API tokens, private keys ni Dockerfile lo hardcode cheyyadam safe kaadu. Build arguments or environment defaults kuda secrets storage ki correct solution kaavu. Secrets ni secret manager or runtime secret mechanism dwara provide cheyyali. Accidentally secret image lo add ayithe image rebuild chesi exposed credential rotate cheyyali.\n\nEnglish Explanation:\nHardcoding passwords, API tokens, or private keys in a Dockerfile is unsafe. Build arguments and image environment defaults are not appropriate secret stores. Provide secrets through a secret manager or runtime secret mechanism. Rotate credentials if they were exposed.",
        details: [
          "Dockerfile lo passwords hardcode cheyyakudadhu.",
          "Build context lo secret files include kakunda .dockerignore use cheyyali.",
          "Runtime secrets management implement cheyyali.",
          "Leaked credentials ni revoke and rotate cheyyali."
        ]
      },
      {
        title: "Image vulnerability scanning ante enti?",
        explanation: "Telugu Answer:\nImage vulnerability scanning ante image lo unna OS packages and application dependencies ni known security vulnerabilities database tho compare cheyyadam. Scanner findings lo vulnerability ID, severity, affected package, and fixed version details untayi. Critical findings ni review chesi patched image build cheyyali.\n\nEnglish Explanation:\nImage vulnerability scanning compares operating system packages and application dependencies against known vulnerability databases. Results include vulnerability identifiers, severity, affected packages, and available fixed versions. Review findings and rebuild patched images.",
        commands: [
          "docker scout quickview myapp:1.0",
          "docker scout cves myapp:1.0"
        ]
      }
    ]
  },
  {
    title: "10. Related Concepts",
    items: [
      {
        title: "Docker Image and Container madhya difference enti?",
        explanation: "Telugu Answer:\nDocker Image read-only template. Docker Container aa image nunchi create ayye running or stopped instance. Image reusable ga untundi; same image nunchi multiple containers create cheyyachu. Container ki writable layer untundi, image layers read-only ga untayi.\n\nEnglish Explanation:\nA Docker Image is a read-only template, while a Docker Container is an instance created from that image. Multiple containers can be created from one image. Containers have a writable layer on top of the image's read-only layers.",
        details: [
          "Image – application package or template.",
          "Container – image nunchi create ayye isolated instance.",
          "One image nunchi multiple containers create cheyyachu."
        ]
      },
      {
        title: "Docker Image and Dockerfile madhya difference enti?",
        explanation: "Telugu Answer:\nDockerfile anedi image ela build cheyyalo cheppe instructions unna text file. Docker Image anedi aa instructions process chesaka create ayye artifact. Dockerfile source instructions laga work chesthundi; image deploy cheyyadaniki and container create cheyyadaniki use avuthundi.\n\nEnglish Explanation:\nA Dockerfile is a text file containing instructions for building an image. A Docker Image is the artifact produced by processing those instructions. The Dockerfile defines the build, while the image is used to create containers."
      },
      {
        title: "Docker Registry ante enti?",
        explanation: "Telugu Answer:\nDocker Registry anedi Docker Images store and distribute cheyadaniki use ayye service. Developers images push chestharu; servers and deployment platforms images pull chesthayi. Docker Hub public and private repositories provide chesthundi. Organizations private registries like Amazon ECR or other registry services use cheyyachu.\n\nEnglish Explanation:\nA Docker Registry is a service used to store and distribute Docker Images. Developers push images to registries, and deployment systems pull them. Examples include Docker Hub and Amazon Elastic Container Registry.",
        commands: [
          "docker login",
          "docker push username/myapp:1.0",
          "docker pull username/myapp:1.0"
        ]
      },
      {
        title: "Image layers ante enti?",
        explanation: "Telugu Answer:\nDocker Image multiple filesystem layers tho construct avuthundi. Dockerfile lo konni instructions image layers create chesthayi. Common base layers multiple images madhya share avvachu. Layer caching valla unchanged steps malli execute cheyyalsina avasaram thagguthundi. Anduke Dockerfile instructions order important.\n\nEnglish Explanation:\nDocker Images are built from filesystem layers. Some Dockerfile instructions create layers, and common base layers can be shared between images. Layer caching avoids rebuilding unchanged steps, so Dockerfile instruction order affects build efficiency."
      }
    ]
  },
  {
    title: "11. Architecture & Internals",
    items: [
      {
        title: "Docker Image layers internal ga ela work avuthayi?",
        explanation: "Telugu Answer:\nDocker image filesystem layers stack laga arrange avuthayi. Base image layers paina application files and configuration layers add avuthayi. Image layers immutable and read-only ga untayi. Container create ayinappudu Docker additional writable layer add chesthundi. Container changes aa writable layer lo record avuthayi; original image layers modify avvavu.\n\nEnglish Explanation:\nDocker image filesystems are arranged as stacked layers. Application files and configuration are added above base image layers. Image layers are immutable and read-only. When a container is created, Docker adds a writable layer where runtime changes are stored."
      },
      {
        title: "Docker image cache ela work avuthundi?",
        explanation: "Telugu Answer:\nDocker build previous build lo create ayina layers ni cache ga reuse cheyyagaladu. Dockerfile instruction, input files, and build dependencies unchanged ga unte cached layer reuse avuthundi. Oka layer change ayithe dani tarvatha dependent layers rebuild avvachu. Frequently change ayye application files ni Dockerfile lo later copy cheyyadam build cache efficiency improve chesthundi.\n\nEnglish Explanation:\nDocker can reuse layers from previous builds when instructions and their inputs have not changed. If a layer changes, subsequent dependent layers may need rebuilding. Placing frequently changing application files later in the Dockerfile can improve cache efficiency."
      },
      {
        title: "Image manifest and digest ante enti?",
        explanation: "Telugu Answer:\nImage manifest anedi image configuration and layers references ni describe chesthundi. Digest anedi content-based cryptographic identifier. Tag change avvachu, kani digest specific image content ni identify chesthundi. Production lo digest pin chesthe exact artifact deploy avuthundani verify cheyyadam easy.\n\nEnglish Explanation:\nAn image manifest describes image configuration and layer references. A digest is a content-based cryptographic identifier. Tags can be moved to different image versions, while a digest identifies specific content and supports immutable deployment references."
      }
    ]
  },
  {
    title: "12. Implementation",
    items: [
      {
        title: "Application kosam Docker Image implementation steps enti?",
        explanation: "Telugu Answer:\nFirst application runtime and dependencies identify cheyyali. Tarvatha suitable base image select chesi Dockerfile create cheyyali. Required files copy chesi dependencies install chesi startup command define cheyyali. Local ga image build chesi container run chesi test cheyyali. Tests pass ayyaka version tag assign chesi registry ki push cheyyali.\n\nEnglish Explanation:\nIdentify the application's runtime and dependencies, select a suitable base image, and create a Dockerfile. Copy required files, install dependencies, define the startup command, build the image, test a container locally, and push the approved version to a registry.",
        commands: [
          "docker build -t myapp:1.0 .",
          "docker run --rm myapp:1.0",
          "docker tag myapp:1.0 username/myapp:1.0",
          "docker push username/myapp:1.0"
        ]
      },
      {
        title: "Multi-stage build enduku implement chestaru?",
        explanation: "Telugu Answer:\nApplication build cheyadaniki compilers, SDKs, and development dependencies kavali avvachu. Kaani production runtime ki avi avasaram lekapovachu. Multi-stage build lo first stage application build chesthundi; final stage ki required output matrame copy chestham. Dini valla final image size and unnecessary packages thagguthayi.\n\nEnglish Explanation:\nApplication builds may require compilers, SDKs, and development dependencies that are not needed at runtime. Multi-stage builds separate compilation from the final runtime image and copy only required artifacts into the final stage, reducing image size and unnecessary packages.",
        example: "Example:\nFROM node:22 AS build\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\nFROM node:22-slim\nWORKDIR /app\nCOPY --from=build /app/package*.json ./\nCOPY --from=build /app/node_modules ./node_modules\nCOPY --from=build /app/dist ./dist\nCMD [\"node\", \"dist/server.js\"]"
      },
      {
        title: "Non-root user tho image ela configure cheyyali?",
        explanation: "Telugu Answer:\nContainer application ni root user ga run chesthe process compromise ayinappudu impact ekkuva undochu. Dockerfile lo dedicated non-root user create chesi USER instruction use cheyyali. Application files ki correct ownership and permissions set cheyyali. Application ki required permissions matrame ivvali.\n\nEnglish Explanation:\nRunning applications as root increases the impact of a compromised process. Create a dedicated non-root user in the Dockerfile and use the USER instruction. Set correct file ownership and grant only the permissions required by the application."
      }
    ]
  },
  {
    title: "13. Production Use Cases",
    items: [
      {
        title: "Production deployment lo Docker Image role enti?",
        explanation: "Telugu Answer:\nProduction deployment lo Docker Image application artifact ga work chesthundi. CI pipeline approved source code nunchi image build chesthundi. Image scan and tests pass ayyaka registry lo publish chestharu. Deployment platform approved image version or digest ni pull chesi containers run chesthundi. Same artifact ni multiple replicas ki use cheyyachu.\n\nEnglish Explanation:\nIn production, a Docker Image acts as the application artifact. A CI pipeline builds it from approved source code, scans and tests it, and publishes it to a registry. Deployment platforms pull the approved version or digest and run containers from it."
      },
      {
        title: "Kubernetes lo Docker Image ela use avuthundi?",
        explanation: "Telugu Answer:\nKubernetes Pod specification lo container image field define chestham. Worker node container runtime registry nunchi image pull chesthundi, required container create chesi start chesthundi. imagePullPolicy and image tag behavior deployment consistency ki important. Production lo stable version or digest specify cheyyali.\n\nEnglish Explanation:\nA Kubernetes Pod specification defines the container image. The worker node's container runtime pulls the image from a registry and creates the container. Image tags, digests, and imagePullPolicy affect how image versions are selected and retrieved.",
        example: "Example Kubernetes YAML:\napiVersion: v1\nkind: Pod\nmetadata:\n  name: web-app\nspec:\n  containers:\n    - name: web\n      image: nginx:1.27"
      },
      {
        title: "Cloud environment lo Docker Image ekkada store chestaru?",
        explanation: "Telugu Answer:\nCloud environment lo Docker Images ni managed container registries lo store cheyyachu. AWS lo Amazon ECR, Azure lo Azure Container Registry, and Google Cloud lo Artifact Registry use cheyyachu. Registry authentication, repository permissions, image scanning, and lifecycle policies configure cheyyali.\n\nEnglish Explanation:\nCloud environments provide managed container registries. AWS offers Amazon ECR, Azure offers Azure Container Registry, and Google Cloud offers Artifact Registry. Configure authentication, repository permissions, image scanning, and lifecycle policies."
      }
    ]
  },
  {
    title: "14. Monitoring & Observability",
    items: [
      {
        title: "Docker Image size ela monitor cheyyali?",
        explanation: "Telugu Answer:\nImage size ekkuva ayithe registry storage and network transfer time increase avuthayi. docker images command image size chupisthundi. docker system df overall Docker storage usage chupisthundi. CI pipeline lo image size threshold validation add cheyyachu. Unexpected size increase ayithe Dockerfile layers and included dependencies inspect cheyyali.\n\nEnglish Explanation:\nLarge images increase registry storage and network transfer time. Use docker images to inspect individual image sizes and docker system df for overall Docker storage usage. CI pipelines can enforce image-size thresholds and investigate unexpected growth.",
        commands: [
          "docker images",
          "docker system df",
          "docker image inspect myapp:1.0"
        ]
      },
      {
        title: "Image build history ela inspect cheyyali?",
        explanation: "Telugu Answer:\nDocker image history command image create ayina layers and associated instructions information chupisthundi. Ee output lo layer sizes and commands identify cheyyachu. Large layer or unexpected command unte Dockerfile and build process review cheyyali.\n\nEnglish Explanation:\nThe docker image history command displays information about image layers and the instructions associated with them. It helps identify large layers and unexpected build steps for optimization.",
        commands: [
          "docker history myapp:1.0",
          "docker history --no-trunc myapp:1.0"
        ]
      },
      {
        title: "Image vulnerabilities and compliance ela track cheyyali?",
        explanation: "Telugu Answer:\nImage scanning results ni CI/CD pipeline lo collect chesi severity-wise review cheyyali. Critical and high vulnerabilities ki remediation owner and deadline assign cheyyali. Approved base image versions and scanning policies maintain cheyyali. Scan results ni release records tho link chesthe audit time lo traceability improve avuthundi.\n\nEnglish Explanation:\nCollect image scanning results in the CI/CD pipeline and review findings by severity. Assign remediation owners and deadlines for critical and high vulnerabilities. Maintain approved base image versions and scanning policies, and retain scan records for audit traceability."
      }
    ]
  },
  {
    title: "15. Recovery & Incident Management",
    items: [
      {
        title: "Production image release fail ayithe rollback ela cheyyali?",
        explanation: "Telugu Answer:\nNew image deploy ayyaka application health checks fail ayithe previous known-good image version ki rollback cheyyali. Previous image tag or digest release records lo available undali. Deployment platform lo old version restore chesi health checks and application logs verify cheyyali. Root cause fix chesaka new release malli test cheyyali.\n\nEnglish Explanation:\nIf a new image release causes failed health checks, roll back to the previous known-good image version. Keep previous tags or digests in release records. Restore the earlier version, verify health checks and logs, and redeploy only after fixing the root cause."
      },
      {
        title: "Registry lo image accidentally delete ayithe em cheyyali?",
        explanation: "Telugu Answer:\nRegistry lo required image delete ayithe first local build agents, cache, or backup registry lo same digest available undho check cheyyali. Source code and Dockerfile nunchi image rebuild cheyyachu, kani original digest same ga untundani assume cheyyakudadhu. Rebuilt image scan and test chesi correct version ga publish cheyyali.\n\nEnglish Explanation:\nIf a required registry image is deleted, check build agents, caches, and backup registries for the original digest. Rebuilding from source may produce different content, so do not assume the digest will match. Scan and test the rebuilt image before publishing it."
      },
      {
        title: "Corrupted or unexpected image ni ela handle cheyyali?",
        explanation: "Telugu Answer:\nUnexpected image behavior kanipisthe image digest, source registry, build history, and release metadata verify cheyyali. Trusted pipeline nunchi image malli build cheyyali. Suspicious image ni production lo run cheyyakudadhu. Security incident ayithe affected image deployments isolate chesi credentials and registry access review cheyyali.\n\nEnglish Explanation:\nWhen an image behaves unexpectedly, verify its digest, source registry, build history, and release metadata. Rebuild through a trusted pipeline. Do not run suspicious images in production. For a security incident, isolate affected deployments and review credentials and registry access."
      }
    ]
  },
  {
    title: "16. Automation & CI/CD Integration",
    items: [
      {
        title: "Jenkins pipeline lo Docker Image ela build chestaru?",
        explanation: "Telugu Answer:\nJenkins pipeline Git repository checkout chesina tarvatha Dockerfile location lo docker build execute chesthundi. Build success ayithe image ki build number or commit SHA tag assign chesthundi. Tests and security scans pass ayyaka registry credentials use chesi image push chesthundi. Credentials ni Jenkins credentials store lo secure ga maintain cheyyali.\n\nEnglish Explanation:\nAfter checking out the Git repository, a Jenkins pipeline runs docker build using the Dockerfile. It tags the image with a build number or commit SHA. After tests and security scans pass, the pipeline authenticates to the registry and pushes the image using securely stored credentials.",
        example: "Example Jenkins stages:\nCheckout -> Build Image -> Test Image -> Scan Image -> Push Image -> Deploy",
        commands: [
          "docker build -t myapp:$BUILD_NUMBER .",
          "docker tag myapp:$BUILD_NUMBER registry.example.com/myapp:$BUILD_NUMBER",
          "docker push registry.example.com/myapp:$BUILD_NUMBER"
        ]
      },
      {
        title: "CI/CD pipeline lo image tagging ela automate cheyyali?",
        explanation: "Telugu Answer:\nCI pipeline lo Git commit SHA, release version, or build number use chesi unique image tag generate cheyyachu. Same tag ni build, test, push, and deployment stages lo use cheyyali. Mutable latest tag ni convenience kosam maintain chesina, production deployment ki immutable digest record cheyyadam better.\n\nEnglish Explanation:\nA CI pipeline can generate unique image tags using a Git commit SHA, release version, or build number. Use the same tag across build, test, push, and deployment stages. Record immutable digests for production deployments.",
        commands: [
          "docker build -t myapp:$GIT_COMMIT .",
          "docker push registry.example.com/myapp:$GIT_COMMIT"
        ]
      },
      {
        title: "Buildx tho multi-platform image ela automate cheyyali?",
        explanation: "Telugu Answer:\nDifferent CPU architectures kosam separate image builds maintain cheyyakunda Docker Buildx use chesi multi-platform image build cheyyachu. --platform option lo target architectures specify chestham. Registry ki push chesinappudu manifest list publish avuthundi. Target platforms and application compatibility validate cheyyali.\n\nEnglish Explanation:\nDocker Buildx can build multi-platform images for different CPU architectures. Specify target platforms with --platform and push the result to a registry. Validate application compatibility and test each supported platform.",
        commands: [
          "docker buildx create --use",
          "docker buildx build --platform linux/amd64,linux/arm64 -t username/myapp:1.0 --push ."
        ]
      }
    ]
  },
  {
    title: "17. Performance & Capacity",
    items: [
      {
        title: "Docker Image size deployment performance ni ela affect chesthundi?",
        explanation: "Telugu Answer:\nImage size ekkuva ayithe registry nunchi download cheyadaniki ekkuva time and bandwidth avasaram avuthayi. Kubernetes lo new Pod start ayye mundu node image pull cheyyalsi ravachu. Large images scale-out and recovery time ni slow cheyyachu. Multi-stage builds, smaller trusted base images, and dependency cleanup valla image size reduce cheyyachu.\n\nEnglish Explanation:\nLarge images require more bandwidth and time to download from registries. Kubernetes nodes may need to pull images before starting new Pods, which can slow scaling and recovery. Multi-stage builds, suitable base images, and dependency cleanup help reduce image size."
      },
      {
        title: "Docker Image build time ela optimize cheyyali?",
        explanation: "Telugu Answer:\nBuild time reduce cheyyadaniki Docker layer cache reuse avvali. Dependency files first copy chesi dependencies install cheyyali; application source code tarvatha copy cheyyali. .dockerignore use chesi unnecessary files build context nunchi exclude cheyyali. BuildKit cache mounts and remote cache CI environments lo useful ga untayi.\n\nEnglish Explanation:\nOptimize build time by reusing Docker layer cache. Copy dependency manifests before application source files so dependency installation can be cached. Use .dockerignore to reduce build context and BuildKit cache mounts or remote caches in CI environments."
      },
      {
        title: "Docker Image storage capacity ela manage cheyyali?",
        explanation: "Telugu Answer:\nLocal Docker hosts and registries lo old images, unused tags, and build cache storage consume chesthayi. Regular ga storage usage monitor cheyyali. Registry lifecycle policies use chesi retention rules configure cheyyachu. Kaani rollback and compliance requirements kosam required release images preserve cheyyali.\n\nEnglish Explanation:\nOld images, unused tags, and build cache consume storage on Docker hosts and registries. Monitor usage regularly and configure registry lifecycle policies. Preserve release images required for rollback, auditing, and compliance.",
        commands: [
          "docker system df",
          "docker image ls",
          "docker builder du",
          "docker image prune"
        ]
      },
      {
        title: "Image caching valla deployment speed ela improve avuthundi?",
        explanation: "Telugu Answer:\nDocker host lo required image layers already available unte registry nunchi full image download cheyyalsina avasaram undakapovachu. Shared layers reuse avuthayi. Kubernetes lo imagePullPolicy and node image cache behavior deployment start time ni affect chesthayi. Kaani cache meeda matrame depend avvakunda correct image version and availability plan cheyyali.\n\nEnglish Explanation:\nWhen required image layers are already present on a Docker host, Docker may reuse them instead of downloading the entire image again. Shared layers reduce transfer work. In Kubernetes, imagePullPolicy and node image cache behavior affect startup time, but image availability must still be planned."
      }
    ]
  }
];
