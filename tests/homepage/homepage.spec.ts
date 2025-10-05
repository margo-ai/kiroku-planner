import { expect, test } from "@playwright/test";

const BASE_URL = "http://localhost:5173/";
const USER_DATA = { email: "test@gmail.com", password: "testpass" };

test("Проверка переадресации на страницу авторизации", async ({ page }) => {
  await page.goto(BASE_URL);

  await page.waitForURL(`${BASE_URL}login`, { timeout: 500 });
});

test("Проверка регистрации", async ({ page }) => {
  await page.goto(`${BASE_URL}registration`);

  await expect(page.getByTestId("registration-form")).toBeVisible();
  await page.getByTestId("email-input").fill(USER_DATA.email);
  await page.getByTestId("password-input").fill(USER_DATA.password);
  await page.getByTestId("password-confirm-input").fill(USER_DATA.password);

  await page.getByRole("button", { name: "Зарегистрироваться" }).click();

  await page.waitForURL(BASE_URL);
});

test.beforeEach(async ({ page }) => {
  await page.goto(`${BASE_URL}login`);

  await page.getByTestId("email-input").fill(USER_DATA.email);
  await page.getByTestId("password-input").fill(USER_DATA.password);

  await page.getByRole("button", { name: "Войти" }).click();

  await page.waitForURL(`${BASE_URL}`, { timeout: 10000 });
  await expect(page.getByTestId("main-page")).toBeVisible();
});

test("Проверка перехода на доску с задачами", async ({ page }) => {
  await page.goto(BASE_URL);

  const avatarButton = page.getByTestId("avatar-button");
  await expect(avatarButton).toBeVisible();
  await avatarButton.click();
  await expect(page.getByTestId("avatar-button")).toContainClass("ant-dropdown-open");
  const boardLink = page.getByText("На доску");

  await expect(boardLink).toBeVisible();
  await boardLink.click();
  await page.waitForURL(`${BASE_URL}board`, { timeout: 10000 });
  await expect(page.getByTestId("add-list-button")).toBeVisible();
  // await page.setViewportSize({ width: 1920, height: 1080 });
  // await expect(page).toHaveScreenshot();
});
