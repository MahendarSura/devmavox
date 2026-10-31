import type { NoteData } from "../../types";

const data: NoteData = {
  title: "Docker Registry",
  description: "Detailed Docker registry notes, practical steps, commands, root causes and solutions.",
  sections: [
    {
      heading: "11. Docker Registry – Pull, Push, Login and Private Images",
      explanation: `
A Docker registry stores and distributes images.

Examples:
- Docker Hub.
- Private company registries.
- Cloud container registries.

Typical workflow:

1. Build an image.
2. Tag the image with the registry and repository name.
3. Authenticate if required.
4. Push the image.
5. Pull the image from the deployment environment.
6. Deploy the required version.

A registry path commonly contains:
registry / namespace / repository : tag

Example:
registry.example.com/team/api:v2.1

Authentication failures, missing repositories, network restrictions and TLS configuration can all cause registry errors.

Do not put registry passwords directly into scripts or source code. Use an approved credential store or CI/CD secret mechanism.
      `,
      steps: [
        "Confirm the registry hostname and repository path.",
        "Check DNS and network connectivity to the registry.",
        "Authenticate using the approved credential method.",
        "Tag the image correctly.",
        "Push the intended version.",
        "Verify the image exists in the registry.",
        "Pull the image from a clean deployment environment."
      ],
      commands: `
docker login registry.example.com

docker build -t registry.example.com/team/api:v2.1 .

docker push registry.example.com/team/api:v2.1

docker pull registry.example.com/team/api:v2.1

docker image inspect registry.example.com/team/api:v2.1
      `,
      problems: [
        {
          issue: "Docker push returns unauthorized.",
          rootCause:
            "The credentials may be invalid, expired or missing permission to push to the repository.",
          solution:
            "Authenticate using the approved credential method and verify repository-level push permissions."
        },
        {
          issue: "Docker pull fails with manifest unknown.",
          rootCause:
            "The requested repository or tag may not exist, or the image may have been pushed under a different path.",
          solution:
            "Verify the registry hostname, namespace, repository and exact tag."
        },
        {
          issue: "Image pull fails due to certificate verification.",
          rootCause:
            "The registry TLS certificate may be invalid, untrusted or incorrectly configured.",
          solution:
            "Fix the registry certificate chain and trust configuration. Do not disable TLS verification as a permanent workaround."
        }
      ]
    },
    {
      heading: "22. Real Production Incident – ImagePullBackOff or Registry Pull Failure",
      explanation: `
SCENARIO:

A deployment host cannot pull the required application image.

Docker error examples can include:
- pull access denied.
- repository does not exist.
- manifest unknown.
- unauthorized.
- certificate signed by unknown authority.
- no matching manifest for the requested platform.

INVESTIGATION:

1. Verify the complete registry image path.
2. Verify repository and tag.
3. Check authentication.
4. Check repository pull permissions.
5. Check DNS and network access.
6. Check registry TLS certificates.
7. Check host architecture against image platform.

Do not treat every pull failure as a password problem. The exact error message is important.
      `,
      steps: [
        "Capture the full image-pull error.",
        "Verify registry hostname and repository path.",
        "Verify the tag exists.",
        "Check authentication and pull permission.",
        "Check DNS, proxy and TLS.",
        "Check target architecture.",
        "Retry the pull after correcting the identified issue."
      ],
      commands: `
docker pull registry.example.com/team/api:v1

docker login registry.example.com

docker image inspect registry.example.com/team/api:v1

docker info
      `,
      problems: [
        {
          issue: "pull access denied.",
          rootCause:
            "The repository may be private, the user may not be authenticated or pull permission may be missing.",
          solution:
            "Authenticate securely and verify repository access permissions."
        },
        {
          issue: "manifest unknown.",
          rootCause:
            "The repository or requested tag may not exist.",
          solution:
            "Verify the exact repository path and tag in the registry."
        },
        {
          issue: "no matching manifest for the requested platform.",
          rootCause:
            "The registry image may not contain a manifest for the host's required architecture.",
          solution:
            "Build and publish the required platform image or configure a suitable multi-platform image."
        }
      ]
    }
  ]
};

export default data;
