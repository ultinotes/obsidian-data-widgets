import { describe, it, expect } from "vitest";
import { binEntriesBy, getColumnNames } from "./processor";
import type { Todo } from "./common";

const common = {
  path: "",
  title: "",
  description: "",
  dueDate: "",
};
const todos = [
  {
    id: "1",
    group: "A",
    row: "X",
    ...common,
  } as Todo,
  {
    id: "2",
    group: "A",
    row: "Y",
    ...common,
  } as Todo,
  {
    id: "3",
    group: "B",
    row: "X",
    ...common,
  } as Todo,
];

// TODO: add tests
describe("BIN ENTRIES ", () => {
  it("HAPPY PATH -> group, split and sort", () => {
    const result = binEntriesBy(todos, {
      splitRowsBy: "row",
      groupBy: "group",
    });
    expect(result.groups.size).toBe(2);
    const resultEntries = result.map.entries();

    // This will implicitly test for default sorting
    const [firstRow, secondRow] = [...resultEntries];
    const [firstRowName, firstRowMap] = firstRow;
    const [secondRowName, secondRowMap] = secondRow;

    expect(firstRowName).toBe("X");
    expect(firstRowMap?.size).toBe(2);

    const [firstRowFirstGroup, firstRowSecondGroup] = [
      ...firstRowMap?.entries(),
    ];
    const [firstRowFirstGroupName, firstRowFirstGroupTodos] =
      firstRowFirstGroup;
    const [firstRowSecondGroupName, firstRowSecondGroupTodos] =
      firstRowSecondGroup;

    expect(firstRowFirstGroupName).toBe("A");
    expect(firstRowFirstGroupTodos?.length).toBe(1);
    expect(firstRowFirstGroupTodos?.[0].id).toBe("1");

    expect(firstRowSecondGroupName).toBe("B");
    expect(firstRowSecondGroupTodos?.length).toBe(1);
    expect(firstRowSecondGroupTodos?.[0].id).toBe("3");

    expect(secondRowName).toBe("Y");
    expect(secondRowMap?.size).toBe(1);

    const [secondRowFirstGroup, secondRowSecondGroup] = [
      ...secondRowMap?.entries(),
    ];
    const [secondRowFirstGroupName, secondRowFirstGroupTodos] =
      secondRowFirstGroup;

    // REVIEW: should this be an empty array, empty group or undefined?
    // const [secondRowSecondGroupName, secondRowSecondGroupTodos] =
    // secondRowSecondGroup;

    expect(secondRowFirstGroupName).toBe("A");
    expect(secondRowFirstGroupTodos?.length).toBe(1);
    expect(secondRowFirstGroupTodos?.[0].id).toBe("2");

    // REVIEW: should this be an empty array, empty group or undefined?
    // expect(secondRowSecondGroupName).toBe("B");
    // expect(secondRowSecondGroupTodos?.length).toBe(0);
    // expect(secondRowSecondGroupTodos).toBeUndefined();
    expect(secondRowSecondGroup).toBeUndefined();
  });

  it("group property missing -> sort into default group", () => {
    const common = {
      path: "",
      title: "",
      description: "",
      dueDate: "",
    };
    const todos = [
      {
        id: "1",
        row: "X",
        // missing group
        ...common,
      } as Todo,
      {
        id: "2",
        group: "A",
        row: "Y",
        ...common,
      } as Todo,
      {
        id: "3",
        group: "B",
        row: "X",
        ...common,
      } as Todo,
    ];
    const result = binEntriesBy(todos, {
      splitRowsBy: "row",
      groupBy: "group",
      defaultGroupName: "C",
    });

    expect([...result.groups.values()]).toEqual(["C", "A", "B"]);
    expect(result.map.size).toBe(2);
    const resultEntries = result.map.entries();
    const [firstRow, secondRow] = [...resultEntries];
    const [firstRowName, firstRowMap] = firstRow;
    expect(firstRowName).toBe("X");

    const [firstRowFirstGroup, firstRowSecondGroup] = [
      ...firstRowMap?.entries(),
    ];
    const [firstRowFirstGroupName, firstRowFirstGroupTodos] =
      firstRowFirstGroup;
    expect(firstRowFirstGroupName).toBe("C");
  });

  it("row property missing   -> sort into default row", () => {
    const common = {
      path: "",
      title: "",
      description: "",
      dueDate: "",
    };
    const todos = [
      {
        id: "1",
        group: "A",
        ...common,
      } as Todo,
      {
        id: "2",
        group: "A",
        row: "Y",
        ...common,
      } as Todo,
      {
        id: "3",
        group: "B",
        row: "X",
        ...common,
      } as Todo,
    ];
    const result = binEntriesBy(todos, {
      splitRowsBy: "row",
      groupBy: "group",
      defaultGroupName: "C",
      defaultRowName: "D",
    });

    expect([...result.groups.values()]).toEqual(["A", "B"]);
    expect(result.map.size).toBe(3);
    const resultEntries = result.map.entries();
    const [firstRow, secondRow] = [...resultEntries];
    const [firstRowName, firstRowMap] = firstRow;
    expect(firstRowName).toBe("D");

    const [firstRowFirstGroup, firstRowSecondGroup] = [
      ...firstRowMap?.entries(),
    ];
    const [firstRowFirstGroupName, firstRowFirstGroupTodos] =
      firstRowFirstGroup;
    expect(firstRowFirstGroupName).toBe("A");
  });

  // it("group property missing & defaults missing -> sort into special group", () => {});

  // it("row property missing   & defaults missing -> sort into special row", () => {});

  // it("group names have different cases -> normalize case", () => {});

  // it("row names have different cases   -> normalize case", () => {});

  // it("group names have whitespace -> normalize case", () => {});

  // it("row names have whitespace   -> normalize case", () => {});

  // it("invalid inputs -> return exception", () => {});
});

describe("COLUMN NAMES", () => {
  it("default column name in column names     -> no duplication", () => {
    const result = getColumnNames("A B C", "A", ["B", "C", "D"], " ");
    expect(result).toEqual(["A", "B", "C"]);
  });

  it("default column name not in column names -> append to front", () => {
    const result = getColumnNames("A B C", "unknown", ["B", "C", "D"], " ");
    expect(result).toEqual(["unknown", "A", "B", "C"]);
  });

  it("custom delimiter -> split by custom delimiter", () => {
    const result = getColumnNames("A;B C", "unknown", ["B", "C", "D"], ";");
    expect(result).toEqual(["unknown", "A", "B C"]);
  });

  it("no todos given -> onboarding column", () => {
    // REVIEW: move logic for "First Task" column here
  });

  it("empty default column & other columns exist -> omit default column", () => {
    // REVIEW: make sure other columns exist, otherwise it will trigger "no todos given"
  });

  // it("invalid inputs -> return exception", () => {});
});
