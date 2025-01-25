const { test, expect } = require("@playwright/test");
test("has link do login page", async ({ page }) => {
  await page.goto("http://localhost:3000/user/login");
  // Sprawdzenie, czy na stronie logowania jest przycisk z tekstem Login

  const emailInput = page.getByPlaceholder("Email");
  await expect(emailInput).toBeVisible();

  const passwordInput = page.getByPlaceholder("Your password");
  await expect(passwordInput).toBeVisible();

  await expect(page.locator('button[type="submit"]')).toContainText("Login");
});
