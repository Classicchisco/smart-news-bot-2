import Parser from "rss-parser";

const parser = new Parser();

const feeds = [
  { url: "https://www.coindesk.com/arc/outboundfeeds/rss/", source: "CoinDesk" },
  { url: "https://cointelegraph.com/rss", source: "CoinTelegraph" },
  { url: "https://decrypt.co/feed", source: "Decrypt" },
  { url: "https://www.theblock.co/rss.xml", source: "TheBlock" }
];

export const fetchNews = async () => {
  try {
    console.log("📡 Fetching news from multiple sources...");

    let allNews = [];

    for (let feed of feeds) {
      try {
        const data = await parser.parseURL(feed.url);

        const formatted = data.items.map(item => ({
          title: item.title,
          url: item.link,
          source: feed.source
        }));

        allNews = [...allNews, ...formatted];

      } catch (err) {
        console.log("⚠️ Failed source:", feed.url);
      }
    }

    console.log("📰 Total combined news:", allNews.length);

    return allNews;

  } catch (err) {
    console.error("❌ Fetch error:", err.message);
    return [];
  }
};