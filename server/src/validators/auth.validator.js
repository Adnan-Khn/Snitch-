import { body, validationResult } from "express-validator";

export const registerValidator = [
  body("email")
    .trim()
    .exists()
    .withMessage("Email is Required")
    .bail()
    .notEmpty()
    .withMessage("Email cannot be Empty")
    .bail()
    .isEmail()
    .withMessage("Invalid Email Address")
    .bail()
    .normalizeEmail(),

  body("name")
    .trim()
    .exists()
    .withMessage("Name is Required")
    .bail()
    .notEmpty()
    .withMessage("Name cannot be Empty")
    .bail()
    .isString()
    .withMessage("Name must be a String")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name should be between 2 and 50 characters"),

  body("password")
    .exists()
    .withMessage("Password is Required")
    .bail()
    .isString()
    .withMessage("Password must be a String")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid Request",
        errors: errors.array(),
      });
    }
    next();
  },
];

export const loginValidator = [
  body("email")
    .trim()
    .exists()
    .withMessage("Email is Required")
    .bail()
    .notEmpty()
    .withMessage("Email cannot be Empty")
    .bail()
    .isEmail()
    .withMessage("Invalid Email Address")
    .bail()
    .normalizeEmail(),
  body("password")
    .exists()
    .withMessage("Password is Required")
    .bail()
    .isString()
    .withMessage("Password must be a String")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid Request",
        errors: errors.array(),
      });
    }
    next();
  },
];
