import type { NoteData } from "../../types";

const data: NoteData = {
  title: "Docker Dockerfile",
  description: "Detailed Docker dockerfile notes, practical steps, commands, root causes and solutions.",
  sections: [
    {
      heading: "04. Dockerfile – Instructions and Build Process",
      explanation: `
A Dockerfile contains instructions used to build a Docker image.

IMPORTANT DOCKERFILE INSTRUCTIONS:

FROM:
Selects the base image.

RUN:
Executes commands during image build. Commonly used to install packages or build application files.

COPY:
Copies files from the build context into the image.

ADD:
Copies files and supports additional features such as local archive extraction. Prefer COPY for ordinary file copying.

WORKDIR:
Sets the working directory for subsequent instructions.

ENV:
Defines environment variables in the image configuration.

ARG:
Defines build-time variables.

USER:
Sets the user used by subsequent build instructions and the container's default process.

EXPOSE:
Documents the port that the application expects to use. It does not publish the port to the host.

CMD:
Provides the default command or arguments for the container.

ENTRYPOINT:
Defines the main executable for the container.

HEALTHCHECK:
Defines a command Docker can use to determine whether the container is healthy.

SHELL:
Changes the shell used for shell-form RUN instructions.

STOPSIGNAL:
Sets the signal sent when stopping the container.

BUILD CONTEXT:
The directory sent to the builder. Files excluded by .dockerignore are not sent as normal build-context files.

LAYERING:
Many Dockerfile instructions create image layers. Ordering instructions carefully helps reuse build cache.

MULTI-STAGE BUILDS:
Use one stage to compile or build an application and another stage to contain only the runtime files. This can reduce final image size and avoid shipping build tools.

SECURITY:
Do not copy passwords, private keys or production secrets into image layers. Removing a secret in a later layer does not reliably remove it from the image history.
      `,
      steps: [
        "Choose a suitable and maintained base image.",
        "Set WORKDIR.",
        "Copy dependency manifests before frequently changing application source when that helps cache reuse.",
        "Install dependencies with reproducible version constraints.",
        "Copy application source.",
        "Set a non-root USER where practical.",
        "Define the startup command.",
        "Build and test the image.",
        "Scan and inspect the image before publishing."
      ],
      commands: `
docker build -t myapp:v1 .

# Specify Dockerfile
docker build -f Dockerfile.prod -t myapp:prod .

# Disable build cache
docker build --no-cache -t myapp:test .

# Pull base image before building
docker build --pull -t myapp:latest .

# Show image layers
docker history myapp:v1

# Inspect image configuration
docker image inspect myapp:v1
      `,
      config: `
# Example Dockerfile for a Node.js application

FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ENV NODE_ENV=production

EXPOSE 3000

USER node

CMD ["npm", "start"]
      `,
      problems: [
        {
          issue: "Docker build fails with COPY failed: file not found.",
          rootCause:
            "The file may not exist inside the build context, the path may be incorrect or .dockerignore may exclude it.",
          solution:
            "Check the build command's context directory, verify the source path and inspect .dockerignore."
        },
        {
          issue: "Docker image becomes very large.",
          rootCause:
            "The image may contain build tools, package caches, unnecessary files or multiple versions of dependencies.",
          solution:
            "Use a suitable smaller base image, multi-stage builds, .dockerignore and cleanup in the same build layer where appropriate."
        },
        {
          issue: "Docker build uses outdated dependencies or source.",
          rootCause:
            "The build cache may be reused because the inputs to an instruction have not changed.",
          solution:
            "Inspect the build output and cache inputs. Use --no-cache only when a clean rebuild is necessary; use --pull when a fresh base image is required."
        }
      ]
    },
    {
      heading: "16. BuildKit, Buildx and Multi-Platform Builds",
      explanation: `
BuildKit is a modern build engine used by Docker to build images efficiently.

Benefits can include:
- Improved build performance.
- Better cache handling.
- Parallel build steps where possible.
- Build secrets.
- SSH forwarding.
- Multi-platform build support through buildx.

BUILDX:
A Docker CLI plugin used for advanced builds and builder management.

MULTI-STAGE BUILD:
Separates build-time tools from the final runtime image.

BUILD SECRET:
Allows a build step to access a secret without placing the secret directly into a normal image layer.

IMPORTANT:
Do not use ARG or ENV as a substitute for BuildKit secret mounts when handling sensitive build credentials.

MULTI-PLATFORM:
An image can be built for architectures such as linux/amd64 and linux/arm64. The builder and target platform must be configured correctly.
      `,
      steps: [
        "Check the available builder.",
        "Use multi-stage builds to separate build and runtime dependencies.",
        "Use cache efficiently.",
        "Use BuildKit secret mounts for sensitive build-time data.",
        "Select the required target platforms.",
        "Test the image on the target architecture or a suitable runtime."
      ],
      commands: `
docker buildx version
docker buildx ls

docker buildx build --platform linux/amd64,linux/arm64 \\
  -t registry.example.com/team/api:v1 .

docker buildx build --secret id=npmrc,src=.npmrc \\
  -t myapp:build .
      `,
      problems: [
        {
          issue: "Image fails with exec format error on another server.",
          rootCause:
            "The image architecture may not match the host architecture.",
          solution:
            "Inspect the image platform and host architecture. Build or publish an image for the required platform."
        },
        {
          issue: "Build cannot access a private package registry.",
          rootCause:
            "The build process may not have the required authentication or secret mount.",
          solution:
            "Configure a secure BuildKit secret or approved package credential mechanism and verify that the secret is not copied into the image."
        }
      ]
    }
  ]
};

export default data;
