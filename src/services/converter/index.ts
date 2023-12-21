import { infoLog } from "../../utils/logger";
import { ImageConverter } from "./ImageConverter";
import { URLConveter } from "./URLConverter";
import { MarkdownConverter } from "./types";

export const markdownConverters: MarkdownConverter[] = [
  new URLConveter(),
  new ImageConverter(),
];

export const matchConverter = (v: string): MarkdownConverter | null => {
  for (const cvt of markdownConverters) {
    try {
      cvt.recognize(v);
      let detailFormat = cvt;
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const newDetailFormat = detailFormat.getDetailedConverter(v);
        if (newDetailFormat == null) {
          break;
        }
        detailFormat = newDetailFormat;
      }
      return detailFormat;
    } catch (e) {
      infoLog(e);
    }
  }
  return null;
};
