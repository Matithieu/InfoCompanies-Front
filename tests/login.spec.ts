import { expect, test } from "@playwright/test";

const BASE_URL = "http://localhost:5173";

test.beforeEach(async ({ page }) => {
  // Go to the login page
  await page.goto(`${BASE_URL}/login`);

  await page.fill('input[id="email"]', "test@gmail.com");
  await page.fill('input[id="password"]', "azertyuiop");

  await page.click('button[aria-label="submit-login"]');

  await page.waitForLoadState("networkidle");

  const url = page.url();
  console.log(url);

  expect(url).toBe(`${BASE_URL}/dashboard`);
});

test("search a company and click on it", async ({ page }) => {
  const searchTerm = "computerline";
  const idOfCompany = 860868;

  await page.click('input[id="search-company"]');
  await page.fill('input[id="search-company"]', searchTerm);

  await page.keyboard.press("Enter");

  // wait for the table to be loaded
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(3000);

  await page.click(`tr[id="company-${idOfCompany}"]`);
});

test("go to the user page", async ({ page }) => {
  await page.click('div[id="user-page"]');

  await page.waitForLoadState("networkidle");

  const url = page.url();

  expect(url).toBe(`${BASE_URL}/account`);
});

test('put all elements in the "to do" state', async ({ page }) => {
  for (let i = 0; i < 10; i++) {
    await page.click(`button[id="checkbox-${i}"]`);
  }

  // Acces to the local storage to see the 10 elements in the "to do" state
  const localStorage = await page.evaluate(() => {
    return JSON.parse(localStorage.getItem("checkedToDo"));
  });

  expect(localStorage.length).toBe(10);
});
