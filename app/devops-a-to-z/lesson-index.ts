import { atoZLessons as baseLessons } from "./lessons";
import { kubernetesAtoZLessons } from "./lessons-extra/kubernetes";
import { jenkinsAtoZLessons } from "./lessons-extra/jenkins";
import { terraformAtoZLessons } from "./lessons-extra/terraform";
import { ansibleAtoZLessons } from "./lessons-extra/ansible";

export const atoZLessons = { ...baseLessons, ...kubernetesAtoZLessons, ...jenkinsAtoZLessons, ...terraformAtoZLessons, ...ansibleAtoZLessons };
