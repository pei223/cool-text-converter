import { describe, it, expect } from "vitest";
import { ImageConverter } from "./ImageConverter";

describe("URLConverter", () => {
  const converter = new ImageConverter();

  describe("recognize", () => {
    it.each([
      "http://hoge.png",
      "http://hoge.jpeg",
      "http://hoge/fuga/index.jpg",
      "https://hoge.png",
      "https://hoge.jpeg",
      "https://hoge/fuga/index.jpg",
      "./test.png",
      "hoge.jpg",
      "hoge/fuga.jpg",
    ])("Success(%s)", (v: string) => {
      expect(() => converter.recognize(v)).not.toThrow();
    });
    it.each(["http//hoge", "http//hoge", "invalid", "invalid.com", "hoge.txt"])(
      "Not apply(%s)",
      (v: string) => {
        expect(() => converter.recognize(v)).toThrow();
      }
    );
  });
  it("converteToMarkdown", () => {
    expect(converter.convertToMarkdown("http://hoge.png")).equal(
      `<img width="100" height="100" src="http://hoge.png" title="タイトル">`
    );
  });
});
