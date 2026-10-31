import type { NoteData } from "../../types";

const data: NoteData = {
  title: "Docker Security",
  description: "Detailed Docker security notes, practical steps, commands, root causes and solutions.",
  sections: [
    {
      heading: "12. Docker Security – Non-Root, Capabilities and Secrets",
      explanation: `
Container security requires protecting the image, process, host and application data.

IMPORTANT PRACTICES:

1. Run as a non-root user where practical.
2. Use trusted and maintained base images.
3. Scan images for known vulnerabilities.
4. Avoid embedding credentials in Dockerfiles or image layers.
5. Drop unnecessary Linux capabilities.
6. Avoid privileged containers unless absolutely required.
7. Use read-only root filesystems where practical.
8. Use appropriate seccomp and security profiles.
9. Limit access to the Docker daemon socket.
10. Keep Docker Engine and host security updates current.

ROOT USER:
A container process running as root can increase the impact of a container compromise. A non-root user reduces privileges but does not replace other security controls.

CAPABILITIES:
Linux capabilities divide root privileges into smaller units. Add only capabilities that the application actually needs.

SECRETS:
Do not bake database passwords, API keys or private keys into an image. Build arguments and ordinary image environment settings are not a safe secret-storage solution.

DOCKER SOCKET:
Access to the Docker daemon socket is highly privileged. A user who can control the daemon may be able to gain extensive control over the host.
      `,
      steps: [
        "Inspect the image source and base image.",
        "Check which user runs the application.",
        "Identify required Linux capabilities.",
        "Remove unnecessary privileges.",
        "Use approved secret-management mechanisms.",
        "Scan images and remediate applicable vulnerabilities.",
        "Review Docker socket access and host permissions."
      ],
      commands: `
docker image inspect myapp:v1
docker inspect myapp

docker run --rm --user 10001:10001 myapp:v1

docker run --rm \\
  --read-only \\
  --cap-drop ALL \\
  myapp:v1
      `,
      problems: [
        {
          issue: "Security scan reports vulnerable packages.",
          rootCause:
            "The base image or application dependencies contain packages with known vulnerabilities.",
          solution:
            "Review severity and exploitability, update the affected base image or dependency, rebuild, rescan and test the new image."
        },
        {
          issue: "Application fails after switching to a non-root user.",
          rootCause:
            "The application may need write access to directories owned by root or access to a privileged port or resource.",
          solution:
            "Identify the exact permission requirement and grant only the required directory ownership or capability."
        }
      ]
    }
  ]
};

export default data;
