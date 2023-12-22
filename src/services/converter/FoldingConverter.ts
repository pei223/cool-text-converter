import { warnLog } from "../../utils/logger";
import { ConvertibleMarkdownFormats } from "../consts/format";
import { MarkdownUnrecognizedError } from "../errors/types";
import { MarkdownConverter } from "./types";

export class FoldingConverter implements MarkdownConverter {
  recognize(v: string) {
    warnLog("Unexpected recognize call (Folding): ", v);
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
    return `<details><summary>サマリー</summary><div>\n\n${v}\n</div></details>`;
  }
  formatName(): ConvertibleMarkdownFormats {
    return "Folding";
  }
  formatLabel(): string {
    return "折りたたみ";
  }
}
