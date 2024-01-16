import { Page, Locator } from "@playwright/test";
import fs from "fs";

export async function inputValue(page: Page, value: string): Promise<void> {
  const srcField = page
    .getByTestId("textarea:markdown-convert-page:src-text")
    .locator("textarea")
    .nth(0);
  await srcField.fill(value);
}

export async function inputValueFromFile(
  page: Page,
  filePath: string
): Promise<void> {
  const value = fs.readFileSync(filePath).toString();
  const srcField = page
    .getByTestId("textarea:markdown-convert-page:src-text")
    .locator("textarea")
    .nth(0);
  await srcField.fill(value);
}

export function getPreview(page: Page): Locator {
  return page.getByTestId("text:markdown-convert-page:preview");
}
