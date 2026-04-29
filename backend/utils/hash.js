import crypto from "crypto";

export const generateHash = (text) => {
  return crypto.createHash("sha256").update(text).digest("hex");
};