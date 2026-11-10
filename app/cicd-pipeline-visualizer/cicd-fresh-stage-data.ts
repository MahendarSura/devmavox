// Generated DevMavox CI/CD lesson data
// 210 navigation topics and 3,357 lesson sections

import stage01 from './integrated-stage-data/stage-01.json';
import stage02 from './integrated-stage-data/stage-02.json';
import stage03 from './integrated-stage-data/stage-03.json';
import stage04 from './integrated-stage-data/stage-04.json';
import stage05 from './integrated-stage-data/stage-05.json';
import stage06 from './integrated-stage-data/stage-06.json';
import stage07 from './integrated-stage-data/stage-07.json';
import stage08 from './integrated-stage-data/stage-08.json';
import stage09 from './integrated-stage-data/stage-09.json';
import stage10 from './integrated-stage-data/stage-10.json';
import stage11 from './integrated-stage-data/stage-11.json';
import stage12 from './integrated-stage-data/stage-12.json';

export const freshStageLessons = {
  1: stage01,
  2: stage02,
  3: stage03,
  4: stage04,
  5: stage05,
  6: stage06,
  7: stage07,
  8: stage08,
  9: stage09,
  10: stage10,
  11: stage11,
  12: stage12,
} as const;

export type FreshStageLesson = {
  topicTitle: string;
  sections: { title: string; content: string }[];
};

