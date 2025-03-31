import type { Todo } from "../core/entities/todo";

export * from "../core/entities/todo";
export * from "../core/types";
export * from "../core/utils";

// TODO: add parameters for marking a todo as important/highlighted
export type TodoViewOptions = {
  groupBy: string;
  groupFilterOrder: string;
  segregateBy: string;
  unknownGroupName: string;
  creationPath: string;
  frontmatterTemplate: Record<string, string>
};
