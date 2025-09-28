export const getStringDate = (ISODate: number) => {
  const stringDate = new Date(ISODate).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });

  return stringDate;
};
