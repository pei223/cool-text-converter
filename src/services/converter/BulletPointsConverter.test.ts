import { describe, it, expect } from "vitest";
import { BulletPointsConverter } from "./BulletPointsConverter";

describe("BulletPointsConverter", () => {
  const converter = new BulletPointsConverter();

  describe("recognize", () => {
    it.each(["test\ntest", `test1\ntest2\ntest3`])(
      "Success(%s)",
      (v: string) => {
        expect(() => converter.recognize(v)).not.toThrow();
      }
    );

    it.each(["test", `\n\n`, "\t\n"])("Not apply(%s)", (v: string) => {
      expect(() => converter.recognize(v)).toThrow();
    });
  });
  // 中身いちいち正解かくのしんどいのでスナップショットテストにする
  it.each([
    ["test", "- test"],
    [
      `test1
test2
test3`,
      `- test1
- test2
- test3`,
    ],
    [
      `test1
  test1-1
  test1-2`,
      `- test1
  - test1-1
  - test1-2`,
    ],
  ])("converteToMarkdown(%s) - (%s)", (v: string, expected: string) => {
    expect(converter.convertToMarkdown(v)).toBe(expected);
  });
});
