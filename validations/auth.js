import { body } from "express-validator";

export const registerValidator = [
  body("email", "Email is invalid").isEmail(),
  body("password", "Password should be at least 8 characters long").isLength({
    min: 8,
  }),
  body("nickname", "Name should be at least 3 characters long").isLength({
    min: 3,
  }),
  body("image", "Image is invalid").isURL().optional(),
];

export const loginValidator = [
  body("email", "Email is invalid").isEmail(),
  body("password", "Password should be at least 8 characters long").isLength({
    min: 8,
  }),
];
