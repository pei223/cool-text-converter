import { infoLog } from "../../utils/logger";
import { ConvertibleMarkdownFormats } from "../consts/format";
import { MarkdownUnrecognizedError } from "../errors/types";
import { writeMarkdownTable } from "./tableWriter";
import { MarkdownConverter } from "./types";

export class JsonConverter implements MarkdownConverter {
  recognize(v: string): void {
    let parsed: unknown;
    try {
      parsed = JSON.parse(v);
    } catch (e) {
      throw new MarkdownUnrecognizedError(v, "JSON", `Not parsed: ${e}`);
    }
    // typeof で配列はobjectを返す.
    // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/typeof#%E5%9F%BA%E6%9C%AC%E7%9A%84%E3%81%AA%E4%BD%BF%E3%81%84%E6%96%B9
    // nullもtypeofだとobject判定になる.
    // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/typeof#typeof_null
    if (typeof parsed !== "object" || Array.isArray(parsed) || parsed == null) {
      throw new MarkdownUnrecognizedError(
        v,
        "JSON",
        `Parsed, but not object: ${parsed}`
      );
    }
  }
  getDetailedConverter(): MarkdownConverter | null {
    return null;
  }
  convertToMarkdown(v: string): string {
    try {
      const parsed = JSON.parse(v);
      return writeMarkdownTable(["key", "value"], Object.entries(parsed));
    } catch (e) {
      // 基本的にrecognizeに成功しているか、ユーザーが明示的に指定しないと起きない.
      infoLog("Parse error on JSON converteToMarkdown", e);
      return "JSON形式として認識できませんでした";
    }
  }
  formatName(): ConvertibleMarkdownFormats {
    return "JSON";
  }
  formatLabel(): string {
    return "JSON";
  }
}
