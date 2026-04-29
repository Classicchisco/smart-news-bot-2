import stringSimilarity from "string-similarity";
import { News } from "../db/mongo.js";
import { generateHash } from "../utils/hash.js";

export const isDuplicate = async (title) => {
  const hash = generateHash(title);

  // Exact match
  const exists = await News.findOne({ hash });
  if (exists) return true;

  // Similar match
  const recent = await News.find().sort({ createdAt: -1 }).limit(100);

  for (let item of recent) {
    const similarity = stringSimilarity.compareTwoStrings(
      title.toLowerCase(),
      item.title.toLowerCase()
    );

    if (similarity > 0.75) return true;
  }

  return false;
};