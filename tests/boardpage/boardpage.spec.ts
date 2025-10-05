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

test("Добавление списка", async ({ page }) => {
  await page.goto(`${BASE_URL}board`);
  await page.getByTestId("add-list-button").click();
  await expect(page.getByTestId("add-list-modal")).toBeVisible();
  await page.getByTestId("add-list-input").fill("Новый список");
  await page.getByRole("button", { name: "Создать список" }).click();
  await expect(page.getByText("Новый список")).toBeVisible();
});

test("Удаление списка", async ({ page }) => {
  await page.goto(`${BASE_URL}board`);
  await expect(page.getByText("Новый список")).toBeVisible();
  await page.getByTestId("list-header").hover();

  const deleteBtn = page.getByTestId("delete-list-button");
  await expect(deleteBtn).toBeVisible();
  await deleteBtn.click();
  await expect(page.getByTestId("delete-list-modal")).toBeVisible();
  await page.getByRole("button", { name: "Удалить" }).click();
  await expect(page.getByText("Новый список")).not.toBeVisible();
});

test("Добавление задачи", async ({ page }) => {
  await page.goto(`${BASE_URL}board`);
  await expect(page.getByText("Новый список")).toBeVisible();
  await page.getByTestId("add-task-button").click();
  await expect(page.getByTestId("add-task-modal")).toBeVisible();
  await page.getByTestId("title-input").fill("Тестовая задача");
  await page.getByTestId("description-input").fill("Описание новой задачи");

  const priorityInput = page.getByTestId("priority-input");
  await priorityInput.click();
  await expect(priorityInput).toContainClass("ant-select-open");
  await page.getByTitle("Medium").click();
  await page.getByRole("button", { name: "Создать задачу" }).click();
  await expect(page.getByTestId("tasks-list")).toHaveCount(1);
});

test("Редактирование задачи", async ({ page }) => {
  await page.goto(`${BASE_URL}board`);
  await page.getByTestId("task-item").click();
  await expect(page.getByTestId("edit-task-modal")).toBeVisible();
  await page.getByTestId("description-input").fill("Измененное описание задачи");
  await page.getByRole("button", { name: "Готово" }).click();
  await expect(page.getByTestId("edit-task-modal")).not.toBeVisible();
  await expect(page.getByText("Измененное описание задачи")).toBeVisible();
});

test("Удаление задачи", async ({ page }) => {
  await page.goto(`${BASE_URL}board`);
  const taskTitle = page.getByText("Тестовая задача");
  await expect(taskTitle).toBeVisible();
  await taskTitle.click({ button: "right" });

  const deleteTaskBtn = page.getByText("Удалить задачу");
  await expect(deleteTaskBtn).toBeVisible();
  await deleteTaskBtn.click();
  await expect(taskTitle).not.toBeVisible();
});

test("Проверка переноса списков", async ({ page }) => {
  await page.goto(`${BASE_URL}board`);

  // создаем первый список
  await page.getByTestId("add-list-button").click();
  await expect(page.getByTestId("add-list-modal")).toBeVisible();
  await page.getByTestId("add-list-input").fill("Первый список");
  await page.getByRole("button", { name: "Создать список" }).click();
  await expect(page.getByText("Первый список")).toBeVisible();

  //  создаем второй список
  await page.getByTestId("add-list-button").click();
  await expect(page.getByTestId("add-list-modal")).toBeVisible();
  await page.getByTestId("add-list-input").fill("Второй список");
  await page.getByRole("button", { name: "Создать список" }).click();
  await expect(page.getByText("Второй список")).toBeVisible();

  const firstListAddButton = page
    .locator('[data-testid="list-header"]:has-text("Первый список")')
    .locator('~ [data-testid="add-task-button"]');
  await firstListAddButton.click();
  await expect(page.getByTestId("add-task-modal")).toBeVisible();
  await page.getByTestId("title-input").fill("Тестовая задача 1");
  await page.getByTestId("description-input").fill("Описание новой задачи 1");
  await page.getByRole("button", { name: "Создать задачу" }).click();

  const secondListAddButton = page
    .locator('[data-testid="list-header"]:has-text("Второй список")')
    .locator('~ [data-testid="add-task-button"]');
  await secondListAddButton.click();
  await expect(page.getByTestId("add-task-modal")).toBeVisible();
  await page.getByTestId("title-input").fill("Тестовая задача 2");
  await page.getByTestId("description-input").fill("Описание новой задачи 2");
  await page.getByRole("button", { name: "Создать задачу" }).click();

  const source = page.getByText("Второй список");
  const target = page.getByText("Первый список");

  await source.dragTo(target, {
    sourcePosition: { x: 10, y: 10 },
    targetPosition: { x: 10, y: 10 }
  });
});
