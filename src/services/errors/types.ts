import { ConvertibleMarkdownFormats, TextFormats } from "../consts/format";

export class UnrecognizedError extends Error {
    readonly value: string
    readonly valueFormat: TextFormats
    readonly expectedFormat: string
    readonly reason: string;
    readonly detail: unknown

    constructor(value: string, valueFormat: TextFormats,expectedFormat: string,  reason: string, detail?: unknown) {
        super(`value: ${value}, valueFormat: ${valueFormat}, expectedFormat: ${expectedFormat}, reason: ${reason}, detail: ${detail}`)
        this.value = value
        this.valueFormat = valueFormat
        this.expectedFormat = expectedFormat
        this.reason = reason
        this.detail = detail
    }

    toString() {
        return this.message   
    }
}

export class MarkdownUnrecognizedError extends UnrecognizedError {
    constructor(value: string, expectedFormat: ConvertibleMarkdownFormats,  reason: string, detail?: unknown) {
        super(value, "Markdown", expectedFormat, reason, detail)
    }

    toString() {
        return this.message   
    }
}