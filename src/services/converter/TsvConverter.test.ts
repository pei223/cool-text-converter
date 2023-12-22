import { describe, it, expect } from "vitest";
import { TsvConverter } from "./TsvConverter";

describe("TsvConverter", () => {
  const converter = new TsvConverter();

  describe("recognize", () => {
    it.each([
      "test\ttest",
      "tett\ttest\ttest",
      "head\thead\thead\ntett\ttest\ttest",
    ])("Success(%s)", (v: string) => {
      expect(() => converter.recognize(v)).not.toThrow();
    });
    it.each(["http//hoge", "1234", "invalid"])("Not apply(%s)", (v: string) => {
      expect(() => converter.recognize(v)).toThrow();
    });
  });
  // 中身いちいち正解かくのしんどいのでスナップショットテストにする
  it.each([
    ["test\ttest"],
    ["tett\ttest\ttest"],
    ["head\thead\thead\ntett\ttest\ttest"],
  ])("converteToMarkdown(%s) - (%s)", (v: string) => {
    expect(converter.convertToMarkdown(v)).toMatchSnapshot();
  });
});
