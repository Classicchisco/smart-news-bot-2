let stats = {
  checked: 0,
  sent: 0,
  skipped: 0
};

export const incrementChecked = () => stats.checked++;
export const incrementSent = () => stats.sent++;
export const incrementSkipped = () => stats.skipped++;

export const logStats = () => {
  console.log("📊 Stats:", stats);
};