import { atoZLessons as baseLessons } from "./lessons";
import { kubernetesAtoZLessons } from "./lessons-extra/kubernetes";

export const atoZLessons = { ...baseLessons, ...kubernetesAtoZLessons };
