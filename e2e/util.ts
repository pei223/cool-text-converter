import { Page } from "@playwright/test";

export async function gotoRoot(page: Page): Promise<void> {
  await page.goto(process.env.HOST!);
}
