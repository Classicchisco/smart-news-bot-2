import express from "express";
import { News } from "../db/mongo.js";

const app = express();
const PORT = 5050;

// API
app.get("/news", async (req, res) => {
  try {
    const news = await News.find()
      .sort({ createdAt: -1 })
      .limit(50);

    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UI Dashboard
app.get("/", async (req, res) => {
  try {
    const news = await News.find()
      .sort({ createdAt: -1 })
      .limit(20);

    const items = news.map(n => `
      <div style="padding:10px; border-bottom:1px solid #ddd;">
        <p><strong>${n.title}</strong></p>
        <p>${n.summary}</p>
        <small>${new Date(n.createdAt).toLocaleString()}</small>
      </div>
    `).join("");

    res.send(`
      <html>
        <head>
          <title>Smart News Dashboard</title>
        </head>
        <body style="font-family:Arial; max-width:700px; margin:auto;">
          <h2>🚀 Smart Crypto News</h2>
          ${items}
        </body>
      </html>
    `);
  } catch (err) {
    res.send("Error loading dashboard");
  }
});

app.listen(PORT, () => {
  console.log(`📊 Dashboard running at http://localhost:${PORT}`);
});