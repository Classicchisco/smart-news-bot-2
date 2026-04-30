let savedNews = [];

export function saveTopNews(news) {
  savedNews.push(...news);
}

export function getSavedNews() {
  return savedNews;
}

export function clearSavedNews() {
  savedNews = [];
}