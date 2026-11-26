import { describe, expect, test } from "bun:test";
import { createFix, readFixHistory, writeFixHistory, HISTORY_KEY, type Fix, type StorageLike } from "../src/lib/fix-engine";

function memoryStorage(initial: string | null = null): StorageLike & { value: string | null } {
  return {
    value: initial,
    getItem() { return this.value; },
    setItem(_key, value) { this.value = value; },
  };
}

describe("Life Fix engine", () => {
  test("creates a safety-first plan for urgent hazards", () => {
    const fix = createFix("I smell a gas leak in the kitchen", "Home & Repairs");
    expect(fix.urgency).toBe("High");
    expect(fix.title).toBe("Safety first");
    expect(fix.watch[0]).toContain("not an emergency service");
  });

  test("creates a money plan for bills and rent", () => {
    const fix = createFix("I cannot pay rent this month", "Other");
    expect(fix.title).toBe("A money problem you can work through");
    expect(fix.steps.join(" ")).toContain("Protect essentials first");
  });

  test("category selection produces a technology plan", () => {
    const fix = createFix("My device will not connect", "Technology");
    expect(fix.title).toBe("A simple tech troubleshooting path");
    expect(fix.watch.join(" ")).toContain("passwords");
  });

  test("trims and caps problem text", () => {
    const fix = createFix(`  ${"x".repeat(2100)}  `, "Other");
    expect(fix.problem.length).toBe(2000);
  });

  test("safely ignores malformed saved history", () => {
    const storage = memoryStorage(JSON.stringify([{ id: "broken" }, null, "not a fix"]));
    expect(readFixHistory(storage)).toEqual([]);
  });

  test("persists and restores valid history", () => {
    const storage = memoryStorage();
    const fix = createFix("My flight was cancelled", "Travel");
    expect(writeFixHistory([fix], storage)).toBe(true);
    expect(storage.value).toContain(HISTORY_KEY);
    expect(readFixHistory(storage)).toEqual([fix]);
  });

  test("returns false rather than crashing when storage is unavailable", () => {
    const storage = {
      getItem() { throw new Error("blocked"); },
      setItem() { throw new Error("quota exceeded"); },
    };
    expect(readFixHistory(storage)).toEqual([]);
    expect(writeFixHistory([] as Fix[], storage)).toBe(false);
  });
});
