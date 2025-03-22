export type Todo = {
  path: string;
  id: string;
  title: string;
  description: string;
  dueDate: string;
  topic: string;
  status: string;
};

export type GroupOptions = "dueDate" | "status" | "topic" | "";
export type FilterOptions = keyof Todo | "";

// TODO: write interface to enable groupings, separations and filtering by dates, strings or numbers
// --> numbers on axis
// --> string enums in columns
// --> dates in calendar --> what about pagination? --> group by day, segregate by hour
