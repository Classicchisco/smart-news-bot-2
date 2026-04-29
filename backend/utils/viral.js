export const detectVirality = (newsList) => {
  const map = {};

  for (let item of newsList) {
    const key = item.title.toLowerCase().slice(0, 80); // simple grouping

    if (!map[key]) {
      map[key] = {
        ...item,
        sources: [item.source],
        count: 1
      };
    } else {
      map[key].count++;
      map[key].sources.push(item.source);
    }
  }

  return Object.values(map);
};