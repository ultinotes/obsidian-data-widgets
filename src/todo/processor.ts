import type { Todo } from "./common";

// sanitizeStrings
const s = (str?: string) => str?.trim().toLowerCase();

// REVIEW: still needed?
// export function filterEntries(
//   todos: Todo[],
//   filterBy: string,
//   filterValue: string
// ) {
//   const filterByTrimmed = filterBy.trim();
//   return filterByTrimmed !== ""
//     ? todos.filter((todo) => {
//         let itemValue = todo[filterByTrimmed];
//         if (itemValue === undefined) {
//           itemValue = "";
//         }
//         return itemValue === filterValue;
//       })
//     : todos;
// }

const binOptionDefaults = {
  defaultGroupName: "NO GROUP",
  defaultRowName: "",
};

export type BinResult = {
  map: Map<string, Map<string, Todo[]>>;
  groups: Set<string>;
};

// TODO: if column/group doesnt occur in defined column names, put them into the unknown group
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
  // TODO: type s() correctly to avoid undefined states
  const unknownColumnName =
    s(defaultGroupName) ?? s(binOptionDefaults.defaultGroupName);
  const unknownRowName =
    s(defaultRowName) ?? s(binOptionDefaults.defaultRowName);
  // NOTE: do not case-insensitivize these, as they are used as frontmatter keys
  const splitRowsByTrimmed = splitRowsBy.trim();
  const groupByTrimmed = groupBy.trim();

  const groups: Set<string> = new Set<string>();
  todos.forEach((todo) => {
    const segregationValue =
      splitRowsByTrimmed === ""
        ? ""
        : todo[splitRowsByTrimmed] ?? unknownRowName;
    const groupValue =
      groupByTrimmed === "" ? "" : todo[groupByTrimmed] ?? unknownColumnName;
    groups.add(s(groupValue)!);

    const segregationEntry =
      rowGroupMap.get(s(segregationValue)) ?? new Map<string, Todo[]>();
    const groupEntry = segregationEntry.get(s(groupValue)) ?? ([] as Todo[]);
    groupEntry.push(todo);
    segregationEntry.set(s(groupValue), groupEntry);
    rowGroupMap.set(s(segregationValue), segregationEntry);
  });

  return {
    map: rowGroupMap,
    groups: groups,
  };
}

export function getColumnNames(
  columnNames: string,
  unknownColumnName: string,
  todoGroups: string[],
  delimiter: string = " "
): string[] {
  // TODO: type s() correctly to avoid undefined states and ! operator
  let splitColumnNames = s(columnNames)!.split(delimiter);
  // avoid duplicate columns, check if unknown group name is already in column names
  if (!splitColumnNames.includes(s(unknownColumnName)!)) {
    splitColumnNames = [s(unknownColumnName)!, ...splitColumnNames];
  }
  return columnNames === "" ? todoGroups.map((g) => s(g)!) : splitColumnNames;
}
