import { ConvertibleMarkdownFormats } from "../consts/format";
import { MarkdownUnrecognizedError } from "../errors/types";
import { MarkdownConverter } from "./types";
import { warnLog } from "../../utils/logger";

export class CheckBoxesConverter implements MarkdownConverter {
  recognize(v: string): void {
    // 自動認識ではなく明示的に実行するのみのため
    warnLog("Unexpected recognize call (check boxes): ", v);
    throw new MarkdownUnrecognizedError(
      v,
      "Folding",
      "Unexpected recgonize call"
    );
  }
  getDetailedConverter(): MarkdownConverter | null {
    return null;
  }
  convertToMarkdown(v: string): string {
    return v
      .split("\n")
      .map((row) => {
        if (row === "") {
          return "";
        }
        const bulletPointsMatch = /([\s\t]*)- (.*)/g.exec(row);
        if (bulletPointsMatch) {
          return `${bulletPointsMatch[1]}- [ ] ${bulletPointsMatch[2]}`;
        }
        const match = /([\s\t]*)(.*)/g.exec(row);
        if (!match) {
          return "";
        }
        return `${match[1]}- [ ] ${match[2]}`;
      })
      .join("\n");
  }
  formatName(): ConvertibleMarkdownFormats {
    return "Check boxes";
  }
  formatLabel(): string {
    return "チェックボックス箇条書き";
  }
}
