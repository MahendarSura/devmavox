
export type Problem = {
  issue: string;
  rootCause?: string;
  solution: string;
};

export type NoteSection = {
  heading: string;
  explanation: string;
  steps?: string[];
  commands?: string | string[];
  config?: string | string[];
  problems?: Problem[];
  interviewQuestions?: {
    question: string;
    answer: string;
  }[];
};

export type NoteData = {
  title: string;
  description: string;
  sections: NoteSection[];
};
