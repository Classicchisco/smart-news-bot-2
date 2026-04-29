export const generateDailyRecap = (newsList) => {
  if (!newsList.length) return null;

  const topNews = newsList.slice(0, 7);

  let message = `📊 *Daily Crypto Recap*\n\n`;

  topNews.forEach((item, index) => {
    message += `${index + 1}. ${item.summary}\n\n`;
  });

  message += `#Crypto #Bitcoin #Web3`;

  return message;
};