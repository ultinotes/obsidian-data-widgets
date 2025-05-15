import { describe, it, expect } from "vitest";
import { binEntriesBy } from "./processor";

// TODO: add tests
describe("BIN ENTRIES ", () => {
  it("HAPPY PATH -> group", () => {});

  it("HAPPY PATH -> split", () => {});

  it("group property missing -> sort into default group", () => {});

  it("row property missing   -> sort into default row", () => {});

  it("group property missing & defaults missing -> sort into default group", () => {});

  it("row property missing   & defaults missing -> sort into default row", () => {});

  it("group names have different cases -> normalize case", () => {});

  it("row names have different cases   -> normalize case", () => {});

  it("group names have whitespace -> normalize case", () => {});

  it("row names have whitespace   -> normalize case", () => {});
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
});
