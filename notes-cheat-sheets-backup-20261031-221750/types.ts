
export type Problem = {
  issue: string;
  rootCause?: string;
  solution: string;
};

export type NoteSection = {
  heading: string;
  explanation: string;
  steps: string[];
  commands?: string;
  config?: string;
  problems: Problem[];
};

export type NoteData = {
  title: string;
  description: string;
  sections: NoteSection[];
};
