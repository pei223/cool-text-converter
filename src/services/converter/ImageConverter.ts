import { ConvertibleMarkdownFormats } from "../consts/format";
import { MarkdownUnrecognizedError } from "../errors/types";
import { MarkdownConverter } from "./types";

const imageExtensionPattern = /.*\.(png|jpg|jpeg)$/i;

export class ImageConverter implements MarkdownConverter {
  recognize(v: string): void {
    if (!imageExtensionPattern.test(v)) {
      throw new MarkdownUnrecognizedError(v, "Image", "regexp didn't applied");
    }
  }
  getDetailedConverter(): MarkdownConverter | null {
    return null;
  }
  convertToMarkdown(v: string): string {
    return `<img width="100" height="100" src="${v}" title="タイトル">`;
  }
  formatName(): ConvertibleMarkdownFormats {
    return "Image";
  }
  formatLabel(): string {
    return "画像ファイル";
  }
}
