import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.seznam.cz/');
  await page.getByRole('textbox', { name: 'Vyhledat' }).click();
  await page.getByRole('textbox', { name: 'Vyhledat' }).fill('ukr');
  await page.getByRole('button', { name: 'Vyhledat' }).click();
  await page.locator('.szn-cmp-dialog-container').click();
  await page.locator('.szn-cmp-dialog-container').click();
});