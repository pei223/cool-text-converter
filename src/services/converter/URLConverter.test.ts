import { describe, it, expect } from "vitest";
import { URLConveter } from ".";

describe("URLConverter", () => {
  const converter = new URLConveter();
  describe("recognize", () => {
    it.each([
      "http://hoge.com",
      "http://hoge",
      "http://hoge/fuga/index.html",
      "https://hoge.com",
      "https://hoge",
      "https://hoge/fuga/index.html",
    ])("Success(%s)", (v: string) => {
      expect(() => converter.recognize(v)).not.toThrow();
    });
    it.each([
      "ftp://hoge",
      "http:/hoge",
      "http//hoge",
      "invalid",
      "invalid.com",
    ])("Not apply(%s)", (v: string) => {
      expect(() => converter.recognize(v)).toThrow();
    });
  });
  describe("getDetailedConverter", () => {
    it.each([
      "http://hoge.png",
      "http://hoge.jpeg",
      "http://hoge/fuga/index.jpg",
      "https://hoge.png",
      "https://hoge.jpeg",
      "https://hoge/fuga/index.jpg",
    ])("Detailed converter found(%s)", (v: string) => {
      expect(converter.getDetailedConverter(v)).not.toBeNull();
    });
    it.each([
      "http://hoge.com",
      "http://hoge",
      "http://hoge/fuga/index.html",
      "https://hoge.com",
      "https://hoge",
      "https://hoge/fuga/index.html",
    ])("Detailed converter not found(%s)", (v: string) => {
      expect(converter.getDetailedConverter(v)).toBeNull();
    });
  });

  it("convertToMarkdown", () => {
    expect(converter.convertToMarkdown("http://hoge.com")).equal(
      "[リンクテキスト](http://hoge.com)"
    );
  });
});
