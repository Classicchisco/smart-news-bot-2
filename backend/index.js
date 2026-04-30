import "dotenv/config";

import express from "express";
import { fetchNews } from "./fetchNews.js";
import { scoreNews, getTopNews } from "./scorer.js";
import { sendNews } from "./telegram.js";
import { saveTopNews } from "./recap.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("🚀 News bot is running...");
});

async function runBot() {
  console.log("🚀 Bot fully initialized...");

  const news = await fetchNews();
  const scored = scoreNews(news);
  const top = getTopNews(scored);

  saveTopNews(top);
  await sendNews(top);
}

// run every 5 minutes
setInterval(runBot, 5 * 60 * 1000);

// run immediately on start
runBot();

app.listen(PORT, () => {
  console.log(`📊 Server running on port ${PORT}`);
});