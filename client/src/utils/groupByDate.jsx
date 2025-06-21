// utils/groupByDate.js
export const groupByDate = (items) => {
  return items.reduce((acc, item) => {
    const date = new Date(item.createdAt).toLocaleDateString();
    acc[date] = acc[date] || [];
    acc[date].push(item);
    return acc;
  }, {});
};
