const keywords = ["bitcoin", "btc", "ethereum", "etf", "sec", "fed"];

export const isImportant = (title) => {
  return keywords.some(k => title.toLowerCase().includes(k));
};