import type { NoteData } from "../../types";

const data: NoteData = {
  title: "ConfigMaps and Secrets",
  description: "Detailed Kubernetes notes covering configmaps and secrets, practical operations, troubleshooting and production scenarios.",
  sections: [
    {
          heading: "10. ConfigMaps and Secrets – Application Configuration",
          explanation: `
    Applications need configuration such as:
    - Database host.
    - Application mode.
    - Feature flags.
    - External service URLs.
    - API credentials.
    
    ConfigMap:
    Stores non-sensitive configuration.
    
    Secret:
    Stores sensitive configuration data such as passwords, tokens and certificates.
    
    Kubernetes Secrets are not automatically a complete secret-management solution.
    
    By default, Secret data is base64 encoded, which is not encryption.
    
    Production security should include:
    - Encryption at rest.
    - RBAC restrictions.
    - Secure secret delivery.
    - Access auditing.
    - Secret rotation.
    - Avoiding secret exposure in logs.
    
    CONFIGURATION DELIVERY:
    
    Environment variables:
    Configuration can be exposed to a container as environment variables.
    
    Volume mounts:
    ConfigMaps and Secrets can be mounted as files.
    
    IMPORTANT:
    A Pod generally needs to be recreated or restarted for environment-variable values sourced from an updated ConfigMap or Secret to take effect. Mounted ConfigMap and Secret files can update eventually, subject to mount and application behavior.
    
    Do not print Secret values into terminal logs or commit them to Git.
          `,
          steps: [
            "Identify the required application configuration.",
            "Decide whether the value is sensitive.",
            "Store non-sensitive values in ConfigMaps.",
            "Store sensitive values in approved Secret mechanisms.",
            "Reference the correct names and keys in the Pod specification.",
            "Check Pod events for missing references.",
            "Roll out a controlled update when required.",
            "Verify application configuration without exposing credentials."
          ],
          commands: `
    kubectl get configmaps -n production
    
    kubectl describe configmap app-config -n production
    
    kubectl get secrets -n production
    
    kubectl describe secret app-secret -n production
    
    kubectl rollout restart deployment/api -n production
    
    kubectl describe pod <pod-name> -n production
          `,
          config: `
    apiVersion: v1
    kind: ConfigMap
    metadata:
      name: app-config
      namespace: production
    data:
      APP_MODE: production
      DATABASE_HOST: database
    ---
    apiVersion: v1
    kind: Secret
    metadata:
      name: app-secret
      namespace: production
    type: Opaque
    stringData:
      DATABASE_PASSWORD: replace-with-secret-managed-value
    ---
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: api
      namespace: production
    spec:
      replicas: 2
      selector:
        matchLabels:
          app: api
      template:
        metadata:
          labels:
            app: api
        spec:
          containers:
            - name: api
              image: my-api:v1
              envFrom:
                - configMapRef:
                    name: app-config
              env:
                - name: DATABASE_PASSWORD
                  valueFrom:
                    secretKeyRef:
                      name: app-secret
                      key: DATABASE_PASSWORD
          `,
          problems: [
            {
              issue: "CreateContainerConfigError occurs.",
              rootCause:
                "A referenced ConfigMap, Secret or required key may be missing or incorrectly named.",
              solution:
                "Describe the Pod and inspect events. Verify the referenced resource and key exist in the same namespace."
            },
            {
              issue: "Application still uses an old environment variable value.",
              rootCause:
                "The Pod may still be using the previous environment configuration.",
              solution:
                "Perform a controlled rollout restart after updating the configuration and verify the new Pod configuration."
            },
            {
              issue: "Secret value is exposed in a Git repository.",
              rootCause:
                "Sensitive data was committed as plain configuration.",
              solution:
                "Revoke or rotate the exposed credential, remove it from active configuration and history as appropriate, and move secret delivery to an approved secure mechanism."
            }
          ]
        }
  ]
};

export default data;
