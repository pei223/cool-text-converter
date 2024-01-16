import { Page } from "@playwright/test";

export async function gotoRoot(page: Page): Promise<void> {
  await page.goto(process.env.HOST!, { timeout: 10 * 1000 });
}

export async function gotoConvertMarkdownPage(page: Page): Promise<void> {
  await page.goto(process.env.HOST!);
  const markdownLinkCard = page.getByText("Markdownへ変換", { exact: true });
  await markdownLinkCard.click();
}
