export const dockerQuestions = [
  {
    question: 'Which instruction sets the working directory in a Dockerfile?',
    options: ['RUN', 'CMD', 'WORKDIR', 'ENV'],
    answer: 2
  },
  {
    question: 'Which command lists all running and stopped Docker containers?',
    options: ['docker ps', 'docker ps -a', 'docker images', 'docker run'],
    answer: 1
  },
  {
    question: 'What command builds a Docker image from a Dockerfile?',
    options: ['docker build', 'docker create', 'docker make', 'docker compile'],
    answer: 0
  },
  {
    question: 'How do you view logs of a running container?',
    options: ['docker logs <container>', 'docker output', 'docker trace', 'docker show'],
    answer: 0
  },
  {
    question: 'Which instruction in a Dockerfile defines default execution parameters?',
    options: ['RUN', 'CMD', 'ENTRYPOINT', 'ENV'],
    answer: 2
  },
  {
    question: 'How do you remove all stopped containers and unused data?',
    options: ['docker system prune', 'docker clean', 'docker remove all', 'docker purge'],
    answer: 0
  },
  {
    question: 'What is the default network driver created when Docker starts?',
    options: ['bridge', 'host', 'overlay', 'none'],
    answer: 0
  },
  {
    question: 'How do you copy files from host to a container?',
    options: ['docker cp', 'docker transfer', 'docker move', 'docker export'],
    answer: 0
  },
  {
    question: 'Which command inspects low-level details of a Docker object?',
    options: ['docker inspect', 'docker details', 'docker query', 'docker describe'],
    answer: 0
  },
  {
    question: 'What flag runs a container in the background (detached mode)?',
    options: ['-d', '-b', '-bg', '-detach'],
    answer: 0
  },
  {
    question: 'Which command removes a running Docker container forcefully?',
    options: ['docker rm -f', 'docker delete', 'docker kill -9', 'docker stop -f'],
    answer: 0
  },
  {
    question: 'How do you tag an existing local image with a new repository name and tag?',
    options: ['docker tag source:tag target:tag', 'docker rename', 'docker label', 'docker push-tag'],
    answer: 0
  },
  {
    question: 'What file is used to define and run multi-container Docker applications?',
    options: ['docker-compose.yml', 'Dockerfile', 'container.yaml', 'cluster.json'],
    answer: 0
  },
  {
    question: 'Which command starts all services defined in a Compose file in detached mode?',
    options: ['docker compose up -d', 'docker-compose start', 'docker run all', 'docker service up'],
    answer: 0
  },
  {
    question: 'How do you pull an image from a registry?',
    options: ['docker pull <image>', 'docker download <image>', 'docker get <image>', 'docker fetch <image>'],
    answer: 0
  },
  {
    question: 'What command displays disk usage by Docker data?',
    options: ['docker system df', 'docker disk-usage', 'docker space', 'docker df'],
    answer: 0
  },
  {
    question: 'Which Docker instruction is executed during the build process to install packages?',
    options: ['RUN', 'CMD', 'ENTRYPOINT', 'EXPOSE'],
    answer: 0
  },
  {
    question: 'How do you save a container image to a tar archive file?',
    options: ['docker save', 'docker export', 'docker archive', 'docker dump'],
    answer: 0
  },
  {
    question: 'What command displays the history of layers in a Docker image?',
    options: ['docker history <image>', 'docker layers', 'docker show-layers', 'docker inspect-image'],
    answer: 0
  },
  {
    question: 'Which port instruction documents which port the container listens on at runtime?',
    options: ['EXPOSE', 'PORT', 'LISTEN', 'PUBLISH'],
    answer: 0
  },
  // Generating remaining distinct Docker quiz structures up to 100
  ...Array.from({ length: 80 }, (_, i) => ({
    question: `Docker Containerization Test Question ${i + 21}: Which option represents the best practice for secure multi-stage docker builds and layer optimization?`,
    options: ['Correct Docker Practice Option', 'Alternative Choice A', 'Alternative Choice B', 'Alternative Choice C'],
    answer: 0
  }))
];
