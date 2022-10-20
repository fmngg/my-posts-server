import { Router } from "express";
import { postRouter } from "./postRouter.js";
import { userRouter } from "./userRouter.js";
import checkAuth from "../middleware/checkAuth.js";
import { upload } from "../middleware/uploader.js";

export const router = new Router();

router.use(userRouter);
router.use("/posts", postRouter);
router.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});
