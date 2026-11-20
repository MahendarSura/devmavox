FROM node:22-alpine
ARG KUBECTL_VERSION=v1.33.3
RUN apk add --no-cache ca-certificates curl \
 && curl -fsSLo /usr/local/bin/kubectl "https://dl.k8s.io/release/${KUBECTL_VERSION}/bin/linux/amd64/kubectl" \
 && chmod +x /usr/local/bin/kubectl \
 && addgroup -S student && adduser -S -G student -h /home/student student \
 && mkdir -p /home/student/.lab-state && chown -R student:student /home/student
WORKDIR /app
COPY server.js ./server.js
ENV PORT=8787 LAB_STATE=/home/student/.lab-state
EXPOSE 8787
USER student
CMD ["node","server.js"]
