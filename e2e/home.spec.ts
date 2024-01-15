import { test, expect } from "@playwright/test";
import { gotoRoot } from "./util";

test("to convert markdown page using card link", async ({ page }) => {
  await gotoRoot(page);

  const markdownLinkCard = page.getByText("Markdownへ変換", { exact: true });
  await markdownLinkCard.click();

  await expect(page.getByText("Markdown変換")).toBeVisible();
  await page.screenshot({ path: "test-ss/markdown-page.jpg" });
});

test("to convert markdown page using menu link", async ({ page }) => {
  await gotoRoot(page);

  const markdownLinkCard = page.getByText("# Markdownへ変換", { exact: true });
  await markdownLinkCard.click();

  await expect(page.getByText("Markdown変換")).toBeVisible();
});
