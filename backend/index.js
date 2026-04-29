import "dotenv/config";
import cron from "node-cron";

import { connectDB, News } from "./db/mongo.js";
import { fetchNews } from "./services/fetchNews.js";
import { isDuplicate } from "./services/deduplicate.js";
import { summarizeNews } from "./services/summarize.js";
import { sendToTelegram, delay } from "./services/telegram.js";
import { generateHash } from "./utils/hash.js";

import { getFinalScore } from "./utils/importance.js";
import { detectVirality } from "./utils/viral.js";
import { generateDailyRecap } from "./utils/recap.js";

import "./dashboard/server.js";

console.log("🚀 Bot fully initialized...");

// Connect DB
await connectDB();

/**
 * MAIN NEWS JOB
 */
const runNewsJob = async () => {
  try {
    console.log("🔄 Checking for news...");

    const rawNews = await fetchNews();

    console.log("📊 Total fetched:", rawNews.length);

    // 🔥 Detect viral news
    const processedNews = detectVirality(rawNews);

    for (let item of processedNews) {
      try {
        console.log("➡️ Processing:", item.title);

        const score = getFinalScore(item);

        if (score < 2) {
          console.log(`🟡 Low priority (${score}) skipped`);
          continue;
        }

        const duplicate = await isDuplicate(item.title);

        if (duplicate) {
          console.log("⏭️ Duplicate skipped");
          continue;
        }

        const summary = await summarizeNews(item.title);

        const viralTag = item.count >= 2 ? "🔥 VIRAL\n" : "";

        await News.create({
          title: item.title,
          hash: generateHash(item.title),
          summary,
          score // ✅ SAVED
        });

        await sendToTelegram(
`📰 *Crypto Update*

${viralTag}${summary}

📊 Impact Score: ${score}
🗞 Sources: ${item.sources.join(", ")}

🔗 ${item.url}`
        );

        console.log("✅ SENT:", item.title);

        await delay(1500);

      } catch (err) {
        console.error("❌ Processing error:", err.message);
      }
    }

  } catch (err) {
    console.error("❌ Job error:", err.message);
  }
};

/**
 * DAILY RECAP JOB
 */
const runDailyRecap = async () => {
  try {
    console.log("📊 Generating daily recap...");

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const news = await News.find({
      createdAt: { $gte: today }
    }).sort({ score: -1 });

    if (!news.length) {
      console.log("⚠️ No news for recap");
      return;
    }

    const recap = generateDailyRecap(news);

    if (!recap) return;

    await sendToTelegram(recap);

    console.log("✅ Daily recap sent");

  } catch (err) {
    console.error("❌ Recap error:", err.message);
  }
};

/**
 * SCHEDULES (UNCHANGED)
 */

// News times
cron.schedule("0 9 * * *", runNewsJob, {
  timezone: "Africa/Lagos"
});
cron.schedule("0 12 * * *", runNewsJob, {
  timezone: "Africa/Lagos"
});
cron.schedule("0 14 * * *", runNewsJob, {
  timezone: "Africa/Lagos"
});
cron.schedule("0 16 * * *", runNewsJob, {
  timezone: "Africa/Lagos"
});
cron.schedule("0 18 * * *", runNewsJob, {
  timezone: "Africa/Lagos"
});
cron.schedule("0 20 * * *", runNewsJob, {
  timezone: "Africa/Lagos"
});
cron.schedule("0 22 * * *", runNewsJob, {
  timezone: "Africa/Lagos"
});
cron.schedule("30 23 * * *", runNewsJob, {
  timezone: "Africa/Lagos"
});

// ✅ DAILY RECAP (NEW)
cron.schedule("59 23 * * *", runDailyRecap, {
  timezone: "Africa/Lagos"
});
