import { Router } from "express";

import { loginValidator, registerValidator } from "../validations/auth.js";
import { register, login, getMe } from "../controllers/UserController.js";
import checkAuth from "../middleware/checkAuth.js";
import handleErrors from "../middleware/handleErrors.js";

export const userRouter = new Router();

userRouter.get("/me", checkAuth, getMe);
userRouter.post("/login", loginValidator, handleErrors, login);
userRouter.post("/register", registerValidator, handleErrors, register);
