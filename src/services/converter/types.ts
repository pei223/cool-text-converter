import { ConvertibleMarkdownFormats } from "../consts/format"

export interface MarkdownConverter extends Format {
    // 該当フォーマットと認識できなければthrowする.
    // 必要ならパースしてメモリキャッシュなどする.
    recognize(v: string): void
    // より詳細な変換器を取得する. 
    // nullならそれ以上は存在しない.
    getDetailedConverter(v: string): MarkdownConverter | null
    convertToMarkdown(v: string): string
    formatName(): ConvertibleMarkdownFormats
}

export interface Format {
    formatLabel(): string
}

export type ConvertResult<T> = {
    result: string
    convereter: T
}