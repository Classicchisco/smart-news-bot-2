import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.log("❌ MongoDB failed, retrying in 5s...");
    setTimeout(connectDB, 5000);
  }
};

const newsSchema = new mongoose.Schema(
  {
    title: String,
    hash: String,
    summary: String,
    score: Number // ✅ NEW (for ranking)
  },
  { timestamps: true }
);

export const News = mongoose.model("News", newsSchema);