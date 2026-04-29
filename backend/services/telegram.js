import axios from "axios";

// Delay helper (prevents rate limit issues)
export const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const sendToTelegram = async (message) => {
  try {
    const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

    await axios.post(url, {
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: "Markdown"
    });

  } catch (err) {
    console.error("❌ Telegram error:", err.response?.data || err.message);
  }
};