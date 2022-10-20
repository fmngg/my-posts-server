import express from "express";
import cors from "cors";

import { router } from "./routes/index.js";
import { db } from "./db.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.use("/uploads", express.static("uploads"));

app.listen(process.env.PORT || 4000, (error) => {
  if (error) {
    return console.log(error);
  }

  console.log("server started");
});
