export const summarizeNews = async (title) => {
  try {
    let summary = title;

    // Basic crypto-style tweaks
    summary = summary
      .replace(/Bitcoin/gi, "BTC")
      .replace(/Ethereum/gi, "ETH")
      .replace(/cryptocurrency/gi, "crypto")
      .replace(/United States/gi, "US");

    // Add human-like tone
    const styles = [
      (t) => `🚨 ${t}`,
      (t) => `📰 ${t}`,
      (t) => `📊 ${t}`,
      (t) => `👀 ${t}`,
      (t) => `💥 ${t}`
    ];

    const randomStyle = styles[Math.floor(Math.random() * styles.length)];

    return `${randomStyle(summary)}\n\n#Crypto #Bitcoin`;
  } catch (err) {
    console.error("❌ Summary error:", err.message);
    return title;
  }
};