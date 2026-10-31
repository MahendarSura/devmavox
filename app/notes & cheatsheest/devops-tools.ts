import type { DevOpsTool } from "./command-types";
import { linuxTool } from "./linux-commands";
import { bashTool } from "./bash-commands";
import { gitTool } from "./git-commands";
import { githubTool } from "./github-commands";
import { dockerTool } from "./docker-commands";
import { kubernetesTool } from "./kubernetes-commands";
import { helmTool } from "./helm-commands";
import { eksTool } from "./eks-commands";
import { awsCliTool } from "./aws-cli-commands";
import { terraformTool } from "./terraform-commands";
import { jenkinsTool } from "./jenkins-commands";
import { githubActionsTool } from "./github-actions-commands";
import { argocdTool } from "./argo-cd-commands";
import { ansibleTool } from "./ansible-commands";
import { mavenTool } from "./maven-commands";
import { gradleTool } from "./gradle-commands";
import { nexusTool } from "./nexus-commands";
import { prometheusTool } from "./prometheus-commands";
import { grafana } from "./grafana-commands";
import { alertmanagerTool } from "./alertmanager-commands";
import { nginxTool } from "./nginx-commands";
import { tomcatTool } from "./apache-tomcat-commands";
import { trivyTool } from "./trivy-commands";
import { sonarqubeTool } from "./sonarqube-commands";
import { snykTool } from "./snyk-commands";
import { owaspDependencyCheckTool } from "./owasp-dependency-check-commands";
import { jiraTool } from "./jira-commands";
import { slackTool } from "./slack-commands";

export const devOpsTools: DevOpsTool[] = [
  linuxTool,
  bashTool,
  gitTool,
  githubTool,
  dockerTool,
  kubernetesTool,
  helmTool,
  eksTool,
  awsCliTool,
  terraformTool,
  jenkinsTool,
  githubActionsTool,
  argocdTool,
  ansibleTool,
  mavenTool,
  gradleTool,
  nexusTool,
  prometheusTool,
  grafana,
  alertmanagerTool,
  nginxTool,
  tomcatTool,
  trivyTool,
  sonarqubeTool,
  snykTool,
  owaspDependencyCheckTool,
  jiraTool,
  slackTool
];


