const { test, expect } = require("@playwright/test");

test("brak logowania i przejście do profilu użytkownika", async ({ page }) => {
  await page.goto("http://localhost:3000/user/profile");

  //   await page.fill('input[name="email"]', "user1@gmail.com");
  //   await page.fill('input[name="password"]', "qwerty");

  //   await page.click('button[type="submit"]');
//   await page.waitForTimeout(1000); // Czeka 1 sekundę

  await expect(page).toHaveURL(
    "http://localhost:3000/user/login?returnUrl=/user/profile"
  );

  //   const userEmail = page.locator("div.navbar-end p.btn");
  //   await expect(userEmail).toHaveText("user1@gmail.com");
});
