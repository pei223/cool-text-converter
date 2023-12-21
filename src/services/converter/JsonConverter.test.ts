import { describe, it, expect } from "vitest";
import { JsonConverter } from "./JsonConverter";

describe("URLConverter", () => {
  const converter = new JsonConverter();

  describe("recognize", () => {
    it.each([
      '{"test": 1}',
      '{"test": "1"}',
      '{"test": "1", "hoge": 2}',
      '{"child": {"hoge": 1}}',
      '{"child1": {"child2": {"hoge": 1}}}',
      '{"test": [1, 2]}',
    ])("Success(%s)", (v: string) => {
      expect(() => converter.recognize(v)).not.toThrow();
    });
    it.each(["http//hoge", "1234", "invalid", "[1,2,3]", '["1", "2"]'])(
      "Not apply(%s)",
      (v: string) => {
        expect(() => converter.recognize(v)).toThrow();
      }
    );
  });
  // 中身いちいち正解かくのしんどいのでスナップショットテストにする
  it.each([
    ['{"test": 1}'],
    ['{"test": "1"}'],
    ['{"test": "1", "hoge": 2}'],
    ['{"child": {"hoge": 1}}'],
    ['{"child1": {"child2": {"hoge": 1}}}'],
    ['{"test": [1, 2]}'],
  ])("converteToMarkdown(%s) - (%s)", (v: string) => {
    expect(converter.convertToMarkdown(v)).toMatchSnapshot();
  });
});
