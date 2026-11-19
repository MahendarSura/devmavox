import { atoZLessons as baseLessons } from "./lessons";
import { kubernetesAtoZLessons } from "./lessons-extra/kubernetes";
import { jenkinsAtoZLessons } from "./lessons-extra/jenkins";

export const atoZLessons = { ...baseLessons, ...kubernetesAtoZLessons, ...jenkinsAtoZLessons };
