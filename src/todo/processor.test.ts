import { describe, it, expect } from "vitest";
import { binEntriesBy } from "./processor";
import type { Todo } from "./common";

// TODO: add tests
describe("BIN ENTRIES ", () => {
  it("HAPPY PATH -> group, split and sort", () => {
    // TODO: remove necessity for topic and status attributes if not used
    const common = {
      path: "",
      title: "",
      description: "",
      dueDate: "",
      topic: "",
      status: "",
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

  it("group property missing -> sort into default group", () => {});

  it("row property missing   -> sort into default row", () => {});

  it("group property missing & defaults missing -> sort into special group", () => {});

  it("row property missing   & defaults missing -> sort into special row", () => {});

  it("group names have different cases -> normalize case", () => {});

  it("row names have different cases   -> normalize case", () => {});

  it("group names have whitespace -> normalize case", () => {});

  it("row names have whitespace   -> normalize case", () => {});

  it("invalid inputs -> return exception", () => {});
});

describe("COLUMN NAMES", () => {
  it("HAPPY PATH -> column names in order", () => {});

  it("default column name in column names     -> no duplication", () => {});

  it("default column name not in column names -> append to front", () => {});

  it("no todos given -> onboarding column", () => {
    // move logic for "First Task" column here
  });

  it("empty default column & other columns exist -> omit default column", () => {
    // make sure other columns exist, otherwise it will trigger "no todos given"
  });

  it("invalid inputs -> return exception", () => {});
});
