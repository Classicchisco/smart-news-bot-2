import fetch from "node-fetch";

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function sendNews(newsArray) {
  if (!TOKEN || !CHAT_ID) {
    console.log("❌ Telegram config missing");
    return;
  }

  for (const news of newsArray) {
    const message = `
📰 *${news.title}*
${news.description || ""}

🔗 ${news.url}
`;

    await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    });
  }
}