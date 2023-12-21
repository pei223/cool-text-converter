function contentToString(v: unknown): string {
  // objectは展開して描画
  if (typeof v === "object" && !Array.isArray(v)) {
    return JSON.stringify(v);
  }
  return String(v);
}

/**
 * Markdownのテーブルを描画する
 * @param headers
 * @param contents
 * jsonなどの値はstring, number, 配列なども想定されるためunknown型にしている.
 * @returns
 */
export function writeMarkdownTable(
  headers: string[],
  contents: unknown[][]
): string {
  const headerText = `| ${headers.join(" | ")} |`;
  const dividerText = `|${" ---- |".repeat(headers.length)}`;
  const contentsText = contents
    .map(
      (v: unknown[]) =>
        `| ${v.map((v: unknown): string => contentToString(v)).join(" | ")} |`
    )
    .join("\n");

  return `${headerText}\n${dividerText}\n${contentsText}`;
}
