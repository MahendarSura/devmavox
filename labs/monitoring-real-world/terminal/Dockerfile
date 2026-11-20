FROM alpine:3.21
ARG KUBECTL_VERSION=v1.33.3
ARG TARGETARCH=amd64
RUN apk add --no-cache bash curl jq ca-certificates coreutils grep sed ttyd
RUN curl -fsSLo /usr/local/bin/kubectl "https://dl.k8s.io/release/${KUBECTL_VERSION}/bin/linux/${TARGETARCH}/kubectl" \
 && chmod +x /usr/local/bin/kubectl
RUN adduser -D -h /home/student student
WORKDIR /home/student
USER student
EXPOSE 7681
COPY --chown=student:student entrypoint.sh /usr/local/bin/lab-entrypoint
USER root
RUN chmod 0755 /usr/local/bin/lab-entrypoint
USER student
ENTRYPOINT ["/usr/local/bin/lab-entrypoint"]
