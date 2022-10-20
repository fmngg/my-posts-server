import { body } from "express-validator";

export const postValidator = [
  body("title", "Title should be at least 3 characters long")
    .isLength({
      min: 3,
    })
    .isString(),
  body("text", "Text should be at least 10 characters long")
    .isLength({
      min: 10,
    })
    .isString(),
  body("tags", "Invalid format").optional().isArray(),
  body("image", "Title should be at least 3 characters long")
    .optional()
    .isString(),
];
