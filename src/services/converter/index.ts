import { infoLog } from "../../utils/logger";
import { BulletPointsConverter } from "./BulletPointsConverter";
import { CheckBoxesConverter } from "./CheckBoxesConverter";
import { CsvConverter } from "./CsvConverter";
import { FoldingConverter } from "./FoldingConverter";
import { ImageConverter } from "./ImageConverter";
import { JsonConverter } from "./JsonConverter";
import { TsvConverter } from "./TsvConverter";
import { URLConverter } from "./URLConverter";
import { MarkdownConverter } from "./types";

// この順番で認識処理が走るので、
// 誤検知されやすいものは下の方にする.
export const markdownConverters: MarkdownConverter[] = [
  new URLConverter(),
  new ImageConverter(),
  new JsonConverter(),
  new TsvConverter(),
  new CsvConverter(),
  new FoldingConverter(),
  new BulletPointsConverter(),
  new CheckBoxesConverter(),
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
