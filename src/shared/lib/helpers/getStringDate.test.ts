import { expect, test } from "vitest";

import { getStringDate } from "./getStringDate";

test("Проверка правильности изменения формата даты 1", () => {
  expect(getStringDate(1759685784000)).toBe("5 окт. 2025 г.");
});
test("Проверка правильности изменения формата даты 2", () => {
  expect(getStringDate(1758628428000)).toBe("23 сент. 2025 г.");
});
