import { Router } from "express";

import { postValidator } from "../validations/post.js";
import {
  create,
  getAll,
  getOne,
  remove,
  edit,
  getLastTags,
} from "../controllers/PostController.js";

import checkAuth from "../middleware/checkAuth.js";
import handleErrors from "../middleware/handleErrors.js";

export const postRouter = new Router();

postRouter.post("/", checkAuth, postValidator, handleErrors, create);
postRouter.get("/", getAll);
postRouter.get("/tags", getLastTags);
postRouter.get("/:id", getOne);
postRouter.delete("/:id", checkAuth, remove);
postRouter.patch("/:id", checkAuth, postValidator, handleErrors, edit);
