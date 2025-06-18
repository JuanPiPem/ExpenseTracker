import { body, validationResult, param } from "express-validator";

export const validateExpense = [
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ max: 100 })
    .withMessage("Description must be under 100 characters"),
  body("amount")
    .notEmpty()
    .withMessage("Amount is required")
    .isNumeric()
    .withMessage("Amount must be a number"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array().map((e) => ({
          field: e.param,
          message: e.msg,
        })),
      });
    }
    next();
  },
];

export const validateIncome = [
  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ max: 100 })
    .withMessage("Description is too long"),
  body("amount")
    .isNumeric()
    .withMessage("Amount must be a number")
    .custom((value) => value >= 0)
    .withMessage("Amount must be positive"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array().map((e) => ({
          field: e.param,
          message: e.msg,
        })),
      });
    }
    next();
  },
];

export const validateMongoId = [
  param("id").isMongoId().withMessage("Invalid ID format"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array().map((e) => ({
          field: e.param,
          message: e.msg,
        })),
      });
    }
    next();
  },
];
