export function infoLog(...args: unknown[]) {
    if (import.meta.env.DEV) {
        return
    }
    console.log(...args)
}

export function warnLog(...args: unknown[]) {
    if (import.meta.env.DEV) {
        return
    }
    console.warn(...args)
}

export function errorLog(...args: unknown[]) {
    if (import.meta.env.DEV) {
        return
    }
    console.error(...args)
}