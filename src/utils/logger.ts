export function infoLog(...args: unknown[]) {
  if (!import.meta.env.DEV || import.meta.env.MODE === "test") {
    return;
  }
  console.log(...args);
}

export function warnLog(...args: unknown[]) {
  if (!import.meta.env.DEV || import.meta.env.MODE === "test") {
    return;
  }
  console.warn(...args);
}

export function errorLog(...args: unknown[]) {
  console.error(...args);
}
