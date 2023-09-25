import { test, expect } from '@playwright/test';

// See here how to get started:
// https://playwright.dev/docs/intro
test('visits the app root url', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#cookie-consent')).toBeVisible()
})


// test cookie lišty

// test IAMUP

// test chybové obrazovky, když API vrátí chybu
test("error page if API is down", async({ page }) => {
  await page.goto('/');
  await expect(page.getByTestId("error-title")).toContainText("Error :-(")
})

test("not found page", async ({ page }) => {
  await page.goto('/nonexisting');
  await expect(page.getByTestId("error-title")).toContainText("Not Found :-(")
})


// česky, když je "locale: 'cs-CZ' nebo 'cs'. Jinak anglicky.
test.describe("czech locale", ()=>{
  test.use({locale: "cs-CZ"})

  test("czech for czech folks", async({page})=>{
    // ...
  })
})

test.describe("english locale", ()=>{
  test.use({locale: "fr-FR"})

  test("english for non-czech folks", async({page})=>{
    // ...
  })
})