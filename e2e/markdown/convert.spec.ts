import { test, expect } from "@playwright/test";
import { gotoConvertMarkdownPage } from "../util";
import { getPreview, inputValue, inputValueFromFile } from "./markdown-page";

test("Input URL", async ({ page }) => {
  await gotoConvertMarkdownPage(page);

  await inputValue(page, "http://hoge.com");
  const urlBtn = page.getByTestId("btn:markdown-convert-page:convert-URL");
  await expect(urlBtn).toHaveClass(/MuiChip-clickableColorPrimary/);

  await expect(getPreview(page)).toHaveText(/リンクテキスト/);
  const link = getPreview(page).locator("a");
  await expect(link).toHaveAttribute("href", "http://hoge.com");
});

test("Input Image URL", async ({ page }) => {
  await gotoConvertMarkdownPage(page);

  await inputValue(page, "./imgs/image.jpg");
  const imageBtn = page.getByTestId("btn:markdown-convert-page:convert-Image");
  await expect(imageBtn).toHaveClass(/MuiChip-clickableColorPrimary/);

  const image = getPreview(page).locator("img");
  await expect(image).toHaveAttribute("src", "./imgs/image.jpg");
});

test("Input JSON", async ({ page }) => {
  await gotoConvertMarkdownPage(page);

  await inputValueFromFile(page, "e2e/markdown/test.json");
  const jsonBtn = page.getByTestId("btn:markdown-convert-page:convert-JSON");
  await expect(jsonBtn).toHaveClass(/MuiChip-clickableColorPrimary/);

  const table = getPreview(page).locator("table");
  // 最初の値のみ確認
  await expect(table.locator("td").nth(0)).toHaveText("key1");
});

test("Input CSV", async ({ page }) => {
  await gotoConvertMarkdownPage(page);

  await inputValueFromFile(page, "e2e/markdown/test.csv");
  const csvBtn = page.getByTestId("btn:markdown-convert-page:convert-CSV");
  await expect(csvBtn).toHaveClass(/MuiChip-clickableColorPrimary/);

  const table = getPreview(page).locator("table");
  // ヘッダーと1行目の最初の値のみ確認
  await expect(table.locator("th").nth(0)).toHaveText("head1");
  await expect(table.locator("td").nth(0)).toHaveText("value1");
});

test("Input TSV", async ({ page }) => {
  await gotoConvertMarkdownPage(page);

  await inputValueFromFile(page, "e2e/markdown/test.tsv");
  const tsvBtn = page.locator(
    "[data-testid='btn:markdown-convert-page:convert-TSV']"
  );
  await expect(tsvBtn).toHaveClass(/MuiChip-clickableColorPrimary/);

  const table = getPreview(page).locator("table");
  // ヘッダーと1行目の最初の値のみ確認
  await expect(table.locator("th").nth(0)).toHaveText("head1");
  await expect(table.locator("td").nth(0)).toHaveText("value1");
});

test("Input value and select Folding", async ({ page }) => {
  await gotoConvertMarkdownPage(page);

  await inputValue(page, "test");
  const foldingBtn = page.locator(
    "[data-testid='btn:markdown-convert-page:convert-Folding']"
  );
  await foldingBtn.click();
  await expect(foldingBtn).toHaveClass(/MuiChip-clickableColorPrimary/);
  await expect(getPreview(page)).toHaveText(/サマリー/);
  await expect(getPreview(page)).toHaveText(/test/);
});
