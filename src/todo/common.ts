export * from "../core/types";
export * from "../core/utils";

// TODO: add parameters for marking a todo as important/highlighted
// TODO: add parameter for subtasks of a todo
export type TodoViewOptions = {
  groupBy: string;
  columnNames: string;
  columnNamesDelimiter: string;
  splitRowsBy: string;
  unknownColumnName: string;
  creationPath: string;
  frontmatterTemplate: Record<string, string>;
  // sortingFunction: (a: Todo, b: Todo) => number;
};

export type Todo = {
  path: string;
  id: string;
  title: string;
  description: string;
  dueDate: string;
  [key: string]: string;
};

export type GroupOptions = "dueDate" | "status" | "topic" | "";
export type FilterOptions = keyof Todo | "";

// TODO: write interface to enable groupings, separations and filtering by dates, strings or numbers
// --> numbers on axis
// --> string enums in columns
// --> dates in calendar --> what about pagination? --> group by day, segregate by hour
// TODO: enable sorting cells by predefined keys ("a-z", "z-a", "largest", "smalles") and custom functions
// TODO: add flag to enable showing additional columns not mentioned in column names
// TODO: add custom coloring
