import { describe, expect, it } from "vitest";
import { matchConverter } from ".";
import { URLConverter } from "./URLConverter";
import { ImageConverter } from "./ImageConverter";
import { JsonConverter } from "./JsonConverter";
import { CsvConverter } from "./CsvConverter";
import { TsvConverter } from "./TsvConverter";

describe("matchConverter", () => {
  // 詳細なケースはそれぞれのモジュールのテストで
  // 担保しているので各ケースで正常系一本あれば良い.
  // また、変換処理は適切なConverterさえ決まれば
  // モジュールのテストと同様なので設ける必要はない.
  it.each([
    ["http://hoge.com", URLConverter.name],
    // URLだけど画像のパターン
    ["http://hoge.png", ImageConverter.name],
    ["hoge.png", ImageConverter.name],
    ['{"test": 1}', JsonConverter.name],
    ["tett\ttest\ttest\ntett\ttest\ttest", TsvConverter.name],
    ["tett,test,test\ntett,test,test", CsvConverter.name],
  ])("URL case(%s)", (v: string, expectedClass: string) => {
    const result = matchConverter(v);
    expect(result).not.toBeNull();
    // 一致判定をクラス名でやるのはダサい.
    // できれば型で綺麗にやりたい.
    expect(result!.constructor.name).equal(expectedClass);
  });
});
