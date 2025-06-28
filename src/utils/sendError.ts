import { Response } from "express";

export const sendErrorResponse = (res: Response, error: any, message = "Validation failed") => {
  let errors: string[] = [];

  if (error?.name === "ValidationError") {
    for (const field in error.errors) {
      if (error.errors[field]?.message) {
        errors.push(error.errors[field].message);
      }
    }
  }

  res.status(400).json({
    message,
    success: false,
    error: errors.length > 0 ? errors : error,
  });
};
