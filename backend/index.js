import dotenv from "dotenv";
dotenv.config();

import cron from "node-cron";
import express from "express";

import { fetchNews } from "./fetchNews.js";
import { scoreNews, getTopNews } from "./scorer.js";
import { sendNews } from "./telegram.js";
import { saveTopNews, getSavedNews } from "./recap.js";

const app = express();

// ✅ IMPORTANT: Render dynamic port
const PORT = process.env.PORT || 3000;

// Health check (for Render)
app.get("/", (req, res) => {
  res.send("Bot is running 🚀");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// 🔁 Fetch + send news every 30 mins
cron.schedule("*/30 * * * *", async () => {
  console.log("⏳ Fetching news...");

  const news = await fetchNews();
  const scored = scoreNews(news);
  const top = getTopNews(scored);

  await sendNews(top);
  saveTopNews(top);

  console.log("✅ News sent");
});

// 📅 Daily recap (9PM)
cron.schedule("0 21 * * *", async () => {
  console.log("📅 Sending daily recap...");

  const saved = getSavedNews();

  let message = "🧠 <b>Daily Crypto Recap</b>\n\n";

  saved.forEach((item, i) => {
    message += `${i + 1}. ${item.title}\n`;
    message += `📊 Score: ${item.score}\n`;
    message += `${item.link}\n\n`;
  });

  await sendNews([{ title: message, score: "", source: "Daily Recap", link: "" }]);

  console.log("✅ Recap sent");
});