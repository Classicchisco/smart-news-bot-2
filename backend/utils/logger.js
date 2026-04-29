import fs from "fs";

export const logError = (msg) => {
  fs.appendFileSync("error.log", `${new Date()} - ${msg}\n`);
};