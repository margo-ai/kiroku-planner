import { expect, test } from "vitest";

import { mapListsFromDB } from "../mapListsFromDB";

import { formattedData, rawData } from "./mockData";

test("Проверка функции изменения формата данных о задачах", () => {
  expect(mapListsFromDB(rawData)).toStrictEqual(formattedData);
});
