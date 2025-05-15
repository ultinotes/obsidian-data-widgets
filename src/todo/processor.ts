import type { Todo } from "./common";

export function filterEntries(
  todos: Todo[],
  filterBy: string,
  filterValue: string
) {
  const filterByTrimmed = filterBy.trim();
  return filterByTrimmed !== ""
    ? todos.filter((todo) => {
        let itemValue = (todo as any)[filterByTrimmed];
        if (itemValue === undefined) {
          itemValue = "";
        }
        return itemValue === filterValue;
      })
    : todos;
}

const binOptionDefaults = {
  defaultGroupName: "NO GROUP",
  defaultRowName: "",
};

export type BinResult = {
  map: Map<string, Map<string, Todo[]>>;
  groups: Set<string>;
};

export function binEntriesBy(
  todos: Todo[],
  {
    splitRowsBy,
    groupBy,
    defaultGroupName,
    defaultRowName,
  }: {
    splitRowsBy: string;
    groupBy: string;
    defaultGroupName?: string;
    defaultRowName?: string;
  }
): BinResult {
  const rowGroupMap = new Map();
  const unknownColumnName =
    defaultGroupName ?? binOptionDefaults.defaultGroupName;
  const unknownRowName = defaultRowName ?? binOptionDefaults.defaultRowName;
  const splitRowsByTrimmed = splitRowsBy.trim();
  const groupByTrimmed = groupBy.trim();

  const groups: Set<string> = new Set<string>();
  todos.forEach((todo) => {
    const segregationValue =
      splitRowsByTrimmed === ""
        ? ""
        : (todo as any)[splitRowsByTrimmed] ?? unknownRowName;
    const groupValue =
      groupByTrimmed === ""
        ? ""
        : (todo as any)[groupByTrimmed] ?? unknownColumnName;
    groups.add(groupValue);

    const segregationEntry =
      rowGroupMap.get(segregationValue) ?? new Map<string, Todo[]>();
    const groupEntry = segregationEntry.get(groupValue) ?? ([] as Todo[]);
    groupEntry.push(todo);
    segregationEntry.set(groupValue, groupEntry);
    rowGroupMap.set(segregationValue, segregationEntry);
  });

  return {
    map: rowGroupMap,
    groups: groups,
  };
}

export function getColumnNames(
  columnNames: string,
  unknownColumnName: string,
  binnedTodos: BinResult
) {
  let splitColumnNames = columnNames.split(" ");
  // avoid duplicate columns, check if unknown group name is already in column names
  if (!splitColumnNames.contains(unknownColumnName)) {
    splitColumnNames = [unknownColumnName, ...splitColumnNames];
  }
  return columnNames === ""
    ? binnedTodos.groups.values().toArray()
    : splitColumnNames;
}
