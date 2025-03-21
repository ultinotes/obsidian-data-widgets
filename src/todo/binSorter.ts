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

export function binEntriesBy(
  todos: Todo[],
  {
    segregateBy,
    groupBy,
    defaultGroupName,
    defaultRowName,
  }: {
    segregateBy: string;
    groupBy: string;
    defaultGroupName?: string;
    defaultRowName?: string;
  }
) {
  const rowGroupMap = new Map();
  const unknownGroupName =
    defaultGroupName ?? binOptionDefaults.defaultGroupName;
  const unknownRowName = defaultRowName ?? binOptionDefaults.defaultRowName;
  const segregateByTrimmed = segregateBy.trim();
  const groupByTrimmed = groupBy.trim();

  const groups: Set<string> = new Set<string>();
  todos.forEach((todo) => {
    const segregationValue =
      segregateByTrimmed === ""
        ? ""
        : (todo as any)[segregateByTrimmed] ?? unknownRowName;
    const groupValue =
      groupByTrimmed === ""
        ? ""
        : (todo as any)[groupByTrimmed] ?? unknownGroupName;
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
