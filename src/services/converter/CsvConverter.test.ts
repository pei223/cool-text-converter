import { describe, it, expect } from "vitest";
import { CsvConverter } from "./CsvConverter";

describe("CsvConverter", () => {
  const converter = new CsvConverter();

  describe("recognize", () => {
    it.each(["test,test", "tett,test,test", "head,head,head\ntett,test,test"])(
      "Success(%s)",
      (v: string) => {
        expect(() => converter.recognize(v)).not.toThrow();
      }
    );
    it.each(["http//hoge", "1234", "invalid"])("Not apply(%s)", (v: string) => {
      expect(() => converter.recognize(v)).toThrow();
    });
  });
  // 中身いちいち正解かくのしんどいのでスナップショットテストにする
  it.each([
    ["test,test"],
    ["tett,test,test"],
    ["head,head,head\ntett,test,test"],
  ])("converteToMarkdown(%s) - (%s)", (v: string) => {
    expect(converter.convertToMarkdown(v)).toMatchSnapshot();
  });
});
