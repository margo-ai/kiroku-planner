import { expect, test } from "@playwright/test";

const BASE_URL = "http://localhost:5173/";
const USER_DATA = { email: "test@gmail.com", password: "testpass" };

test.beforeEach(async ({ page }) => {
  await page.goto(`${BASE_URL}login`);

  await page.getByTestId("email-input").fill(USER_DATA.email);
  await page.getByTestId("password-input").fill(USER_DATA.password);

  await page.getByRole("button", { name: "Войти" }).click();

  await page.waitForURL(`${BASE_URL}`, { timeout: 10000 });
  await expect(page.getByTestId("main-page")).toBeVisible();
});

test("Редактирование имени и аватарки пользователя", async ({ page }) => {
  await page.goto(`${BASE_URL}profile`);
  await expect(page.getByRole("heading", { name: "Данные пользователя" })).toBeVisible();
  await page.getByRole("button", { name: "Редактировать" }).click();
  await page.getByTestId("name-input").fill("Tony Stark");
  await page
    .getByTestId("photo-input")
    .fill("https://info.sibnet.ru/ni/572/572130x630x0_1604979486.png");
  await page.getByRole("button", { name: "Сохранить" }).click();

  await page.reload({ timeout: 30000 });
  await expect(page.getByTestId("user-name")).toBeVisible();
  await page.setViewportSize({ width: 1920, height: 1080 });
  await expect(page).toHaveScreenshot({ timeout: 30000 });
});
