import { describe, it, expect } from "vitest";
import { FoldingConverter } from "./FoldingConverter";

describe("FoldingConverter", () => {
  const converter = new FoldingConverter();

  describe("recognize", () => {
    it("always throw Error", () => {
      expect(() => converter.recognize("")).toThrow();
      expect(() => converter.recognize("hoge")).toThrow();
    });
  });
  // 中身いちいち正解かくのしんどいのでスナップショットテストにする
  it.each([
    ["Foldable text"],
    ["Foldable text\nFoldable text\nFoldable text\nFoldable text"],
  ])("converteToMarkdown(%s) - (%s)", (v: string) => {
    expect(converter.convertToMarkdown(v)).toMatchSnapshot();
  });
});
