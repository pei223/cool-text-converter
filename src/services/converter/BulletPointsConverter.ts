import { ConvertibleMarkdownFormats } from "../consts/format";
import { MarkdownUnrecognizedError } from "../errors/types";
import { MarkdownConverter } from "./types";

export class BulletPointsConverter implements MarkdownConverter {
  recognize(v: string): void {
    const lines = v
      .split("\n")
      .filter((v) => v.replace(" ", "").replace("\t", "") !== "");
    // かなり判定が緩いので優先度は低めにしておく
    if (lines.length < 2) {
      throw new MarkdownUnrecognizedError(
        v,
        "Bullet points",
        "Not multiple line"
      );
    }
  }
  getDetailedConverter(): MarkdownConverter | null {
    return null;
  }
  convertToMarkdown(v: string): string {
    return v
      .split("\n")
      .map((row) => {
        const match = /([\s\t]*)(.*)/g.exec(row);
        if (row === "" || !match) {
          return "";
        }
        return `${match[1]}- ${match[2]}`;
      })
      .join("\n");
  }
  formatName(): ConvertibleMarkdownFormats {
    return "Bullet points";
  }
  formatLabel(): string {
    return "箇条書き";
  }
}
