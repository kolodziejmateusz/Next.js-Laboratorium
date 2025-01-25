const { test, expect } = require("@playwright/test");

test("logowanie i przejście do profilu użytkownika", async ({ page }) => {
  await page.goto("http://localhost:3000/user/login");

  await page.fill('input[name="email"]', "user1@gmail.com");
  await page.fill('input[name="password"]', "qwerty");

  await page.click('button[type="submit"]');

  await expect(page).toHaveURL("http://localhost:3000/user/profile");

  const userEmail = page.locator("div.navbar-end p.btn");
  await expect(userEmail).toHaveText("user1@gmail.com");
});
