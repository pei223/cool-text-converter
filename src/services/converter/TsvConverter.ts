import { ConvertibleMarkdownFormats } from "../consts/format";
import { MarkdownUnrecognizedError } from "../errors/types";
import { writeMarkdownTable } from "./tableWriter";
import { MarkdownConverter } from "./types";

export class TsvConverter implements MarkdownConverter {
  recognize(v: string): void {
    // 1行目にタブがあるかで判断.
    // かなり誤検知がありそうなので優先度は低めにしておく.
    const firstLine = v.split("\n")[0];
    if (!firstLine.includes("\t")) {
      throw new MarkdownUnrecognizedError(v, "TSV", `Not contained tab`);
    }
  }
  getDetailedConverter(): MarkdownConverter | null {
    return null;
  }
  convertToMarkdown(v: string): string {
    const lines = v.split("\n");
    return writeMarkdownTable(
      lines[0].split("\t"),
      lines.length === 1 ? [] : lines.map((v) => v.split("\t")).slice(1)
    );
  }
  formatName(): ConvertibleMarkdownFormats {
    return "TSV";
  }
  formatLabel(): string {
    return "TSV";
  }
}
