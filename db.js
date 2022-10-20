import mongoose from "mongoose";

export const db = mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("database connected");
  })
  .catch((error) => {
    console.log("database error", error);
  });
