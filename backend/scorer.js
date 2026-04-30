export function scoreNews(newsArray) {
  return newsArray.map((item) => {
    let score = 0;

    const text = (item.title + " " + (item.description || "")).toLowerCase();

    if (text.includes("bitcoin") || text.includes("btc")) score += 5;
    if (text.includes("ethereum") || text.includes("eth")) score += 4;
    if (text.includes("fed") || text.includes("interest rate")) score += 6;
    if (text.includes("sec") || text.includes("regulation")) score += 5;
    if (text.includes("breaking")) score += 3;

    return { ...item, score };
  });
}

export function getTopNews(newsArray, limit = 5) {
  return newsArray
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}