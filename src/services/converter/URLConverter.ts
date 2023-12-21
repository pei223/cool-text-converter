import { warnLog } from "../../utils/logger";
import { ConvertibleMarkdownFormats } from "../consts/format";
import { MarkdownUnrecognizedError } from "../errors/types";
import { ImageConverter } from "./ImageConverter";
import { MarkdownConverter } from "./types";

const urlPattern = /^https?:\/\/[\w/:%#$&?()~.=+-]+$/;

export class URLConveter implements MarkdownConverter {
  recognize(v: string) {
    if (!urlPattern.test(v)) {
      throw new MarkdownUnrecognizedError(v, "Image", "regexp didn't applied");
    }
  }
  getDetailedConverter(v: string): MarkdownConverter | null {
    const imageCvt = new ImageConverter();
    try {
      imageCvt.recognize(v);
      return imageCvt;
    } catch (e) {
      if (!(e instanceof MarkdownUnrecognizedError)) {
        warnLog("unexpected error: ", e);
      }
      return null;
    }
  }
  convertToMarkdown(v: string): string {
    return `[リンクテキスト](${v})`;
  }
  formatName(): ConvertibleMarkdownFormats {
    return "URL";
  }
  formatLabel(): string {
    return "URLリンク";
  }
}
