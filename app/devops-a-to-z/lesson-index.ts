import { atoZLessons as baseLessons } from "./lessons";
import { kubernetesAtoZLessons } from "./lessons-extra/kubernetes";
import { jenkinsAtoZLessons } from "./lessons-extra/jenkins";
import { terraformAtoZLessons } from "./lessons-extra/terraform";
import { ansibleAtoZLessons } from "./lessons-extra/ansible";
import { cicdAtoZLessons } from "./lessons-extra/cicd-github-actions";
import { argocdAtoZLessons } from "./lessons-extra/argocd";
import { helmAtoZLessons } from "./lessons-extra/helm";

export const atoZLessons = { ...baseLessons, ...kubernetesAtoZLessons, ...jenkinsAtoZLessons, ...terraformAtoZLessons, ...ansibleAtoZLessons, ...cicdAtoZLessons, ...argocdAtoZLessons, ...helmAtoZLessons };
