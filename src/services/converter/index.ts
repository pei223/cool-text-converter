import { infoLog, warnLog } from "../../utils/logger";
import { ConvertibleMarkdownFormats } from "../consts/format";
import { MarkdownUnrecognizedError } from "../errors/types";
import { ConvertResult, MarkdownConverter } from "./types";

const urlPattern = /^https?:\/\/[\w/:%#$&?()~.=+-]+$/;
const imageExtensionPattern = /.*\.(png|jpg|jpeg)$/i;

const genMarkdownFormats = (): MarkdownConverter[]=> {
    return [
        new URLConveter(),
        new ImageConverter(),
    ]
}

export const convertToMarkdown = (v: string): ConvertResult<MarkdownConverter> | null => {
    for (const format of genMarkdownFormats()) {
        try {
            format.recognize(v)
            let detailFormat = format
            // eslint-disable-next-line no-constant-condition
            while (true) {
                const newDetailFormat = detailFormat.getDetailedConverter(v)
                if (newDetailFormat == null) {
                    break
                }
                detailFormat = newDetailFormat
            }
            return {
                convereter: detailFormat,
                result: detailFormat.convertToMarkdown(v)
            }
        } catch(e) {
            infoLog(e)
        }
    }
    return null
}

export class URLConveter implements MarkdownConverter {
    recognize(v: string) {
        if (!urlPattern.test(v)) {
            throw new MarkdownUnrecognizedError(v, "Image", "regexp didn't applied")
        }
    }
    getDetailedConverter(v: string): MarkdownConverter | null {
        const imageCvt = new ImageConverter()
        try {
            imageCvt.recognize(v)
            return imageCvt
        } catch (e) {
            if (!(e instanceof MarkdownUnrecognizedError)) {
                warnLog("unexpected error: ", e)
            }
            return  null
        }
    }
    convertToMarkdown(v: string): string {
        return `[リンクテキスト](${v})`
    }
    formatName(): ConvertibleMarkdownFormats {
        return "URL"
    }
    formatLabel(): string {
        return "URLリンク"
    }
}

export class ImageConverter implements MarkdownConverter {
    recognize(v: string): void {
        if (!imageExtensionPattern.test(v)) {
            throw new MarkdownUnrecognizedError(v, "Image", "regexp didn't applied")
        }
    }
    getDetailedConverter(): MarkdownConverter | null {
        return null
    }
    convertToMarkdown(v: string): string {
        return `<img width="100" height="100" src="${v}" title="タイトル">`
    }
    formatName(): ConvertibleMarkdownFormats {
        return "Image"
    }
    formatLabel(): string {
        return "画像ファイル"
    }
}


export const markdownConverters: MarkdownConverter[] = [
    new URLConveter(),
    new ImageConverter(),
]

export const matchConverter = (v: string): MarkdownConverter | null => {
    for (const cvt of markdownConverters) {
        try {
            cvt.recognize(v)
            let detailFormat = cvt
            // eslint-disable-next-line no-constant-condition
            while (true) {
                const newDetailFormat = detailFormat.getDetailedConverter(v)
                if (newDetailFormat == null) {
                    break
                }
                detailFormat = newDetailFormat
            }
            return detailFormat
        } catch(e) {
            infoLog(e)
        }
    }
    return null
}