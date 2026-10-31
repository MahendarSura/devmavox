import type { NoteData } from "../../types";

const data: NoteData = {
  title: "Docker Images",
  description: "Detailed Docker images notes, practical steps, commands, root causes and solutions.",
  sections: [
    {
      heading: "05. Docker Image Management – Layers, Tags, Digests and Cache",
      explanation: `
An image consists of filesystem layers and image configuration metadata.

Each layer can be reused by other images. This saves storage and can speed up builds and downloads.

TAG:
A human-readable label such as myapp:v1.4.2.

DIGEST:
A content-addressed identifier for an image manifest. A digest is useful when an exact immutable image reference is required.

IMPORTANT:
A tag such as latest is not automatically the newest or safest image. It is simply a tag that can be moved to point to another image.

IMAGE COMMANDS:

docker image ls:
Lists local images.

docker image inspect:
Displays image configuration and metadata.

docker history:
Shows image layer history.

docker image tag:
Creates another tag for an existing image.

docker image rm:
Removes an image reference, subject to container and image usage constraints.

docker image prune:
Removes unused images according to its options.

Before deleting images on a production host, identify which containers and deployments depend on them.
      `,
      steps: [
        "List local images.",
        "Inspect the image ID, tags and architecture.",
        "Check image history when investigating unexpected image size.",
        "Use versioned tags for release management.",
        "Use digest references when exact content identity is required.",
        "Remove unused images only after checking host usage and deployment requirements."
      ],
      commands: `
docker image ls
docker image inspect myapp:v1
docker history myapp:v1

docker image tag myapp:v1 registry.example.com/team/myapp:v1

docker image rm myapp:v1

# Preview unused images
docker image ls

# Remove dangling images
docker image prune
      `,
      problems: [
        {
          issue: "Image pull downloads a different image than expected.",
          rootCause:
            "A mutable tag may have been updated in the registry.",
          solution:
            "Use a versioned tag or a digest-pinned image reference. Verify the pulled image ID and digest."
        },
        {
          issue: "Image deletion fails because an image is being used.",
          rootCause:
            "One or more containers still reference the image.",
          solution:
            "Inspect containers using the image. Remove only containers that are confirmed to be disposable, then remove the image."
        }
      ]
    }
  ]
};

export default data;
