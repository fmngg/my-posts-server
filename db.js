import mongoose from "mongoose";

export const db = mongoose
  .connect(
    "mongodb+srv://admin:www123@cluster0.j6mazsv.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("database connected");
  })
  .catch((error) => {
    console.log("database error", error);
  });
