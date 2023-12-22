import { ConvertibleMarkdownFormats } from "../consts/format";
import { MarkdownUnrecognizedError } from "../errors/types";
import { writeMarkdownTable } from "./tableWriter";
import { MarkdownConverter } from "./types";

export class CsvConverter implements MarkdownConverter {
  recognize(v: string): void {
    // 1行目にカンマがあるかで判断.
    // かなり誤検知がありそうなので優先度は低めにしておく.
    const firstLine = v.split("\n")[0];
    if (!firstLine.includes(",")) {
      throw new MarkdownUnrecognizedError(v, "CSV", `Not contained comma`);
    }
  }
  getDetailedConverter(): MarkdownConverter | null {
    return null;
  }
  convertToMarkdown(v: string): string {
    const lines = v.split("\n");
    return writeMarkdownTable(
      lines[0].split(","),
      lines.length === 1 ? [] : lines.map((v) => v.split(",")).slice(1)
    );
  }
  formatName(): ConvertibleMarkdownFormats {
    return "CSV";
  }
  formatLabel(): string {
    return "CSV";
  }
}
