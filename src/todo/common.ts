import type { Todo } from "../core/entities/todo";

export * from "../core/entities/todo";
export * from "../core/types";
export * from "../core/utils";

export type TodoViewOptions = {
  groupBy: string;
  groupFilterOrder: string;
  segregateBy: string;
  unknownGroupName: string;
};
