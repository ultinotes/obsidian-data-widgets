import type { Todo } from "../core/entities/todo";

export * from "../core/entities/todo";
export * from "../core/types";
export * from "../core/utils";

// TODO: add parameters for marking a todo as important/highlighted
// TODO: add parameter for subtasks of a todo
export type TodoViewOptions = {
  groupBy: string;
  columnNames: string;
  splitRowsBy: string;
  unknownColumnName: string;
  creationPath: string;
  frontmatterTemplate: Record<string, string>;
  // sortingFunction: (a: Todo, b: Todo) => number;
};
