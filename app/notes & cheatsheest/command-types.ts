export type CommandLevel =
  | "Basic"
  | "Intermediate"
  | "Advanced"
  | "Troubleshooting";

export interface DevOpsCommand {
  command: string;
  level: CommandLevel;
  english: string;
  telugu: string;
}

export interface DevOpsTool {
  name: string;
  category: string;
  commands: DevOpsCommand[];
}
