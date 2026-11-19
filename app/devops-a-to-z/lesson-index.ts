import { atoZLessons as baseLessons } from "./lessons";
import { linuxAtoZLessons } from "./lessons-extra/linux";
import { gitGithubAtoZLessons } from "./lessons-extra/git-github";
import { kubernetesAtoZLessons } from "./lessons-extra/kubernetes";
import { jenkinsAtoZLessons } from "./lessons-extra/jenkins";
import { terraformAtoZLessons } from "./lessons-extra/terraform";
import { ansibleAtoZLessons } from "./lessons-extra/ansible";
import { cicdAtoZLessons } from "./lessons-extra/cicd-github-actions";
import { argocdAtoZLessons } from "./lessons-extra/argocd";
import { helmAtoZLessons } from "./lessons-extra/helm";
import { prometheusAtoZLessons } from "./lessons-extra/prometheus";
import { grafanaAtoZLessons } from "./lessons-extra/grafana";
import { eksAtoZLessons } from "./lessons-extra/eks";
import { mavenAtoZLessons } from "./lessons-extra/maven";
import { nexusAtoZLessons } from "./lessons-extra/nexus";

import { networkingAtoZLessons } from "./lessons-extra/networking";

import { jiraAtoZLessons } from "./lessons-extra/jira";

import { tomcatAtoZLessons } from "./lessons-extra/tomcat";

import { devsecopsSecurityAtoZLessons } from "./lessons-extra/devsecops-security";

export const atoZLessons = { ...baseLessons, ...linuxAtoZLessons, ...gitGithubAtoZLessons, ...kubernetesAtoZLessons, ...jenkinsAtoZLessons, ...terraformAtoZLessons, ...ansibleAtoZLessons, ...cicdAtoZLessons, ...argocdAtoZLessons, ...helmAtoZLessons, ...prometheusAtoZLessons, ...grafanaAtoZLessons, ...eksAtoZLessons, ...mavenAtoZLessons, ...nexusAtoZLessons, ...networkingAtoZLessons , ...jiraAtoZLessons , ...tomcatAtoZLessons , ...devsecopsSecurityAtoZLessons };
