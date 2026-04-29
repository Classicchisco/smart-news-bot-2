const strongKeywords = [
  "sec",
  "etf",
  "fed",
  "interest rate",
  "regulation",
  "ban",
  "lawsuit",
  "approval",
  "rejection",
  "hack",
  "exploit"
];

const mediumKeywords = [
  "bitcoin",
  "btc",
  "ethereum",
  "eth",
  "solana",
  "market",
  "price",
  "surge",
  "crash",
  "bull",
  "bear"
];

export const getImportanceScore = (title) => {
  const text = title.toLowerCase();

  let score = 0;

  strongKeywords.forEach(k => {
    if (text.includes(k)) score += 2;
  });

  mediumKeywords.forEach(k => {
    if (text.includes(k)) score += 1;
  });

  return score;
};

export const isImportant = (title) => {
  return getImportanceScore(title) >= 2;
};

export const getFinalScore = (item) => {
  let score = getImportanceScore(item.title);

  // 🔥 boost if viral
  if (item.count >= 2) score += 3;
  if (item.count >= 3) score += 5;

  return score;
};