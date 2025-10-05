export const getStringDate = (numberDate: number) => {
  const stringDate = new Date(numberDate).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });

  return stringDate;
};
