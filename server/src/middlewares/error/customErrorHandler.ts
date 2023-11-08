import { Request, Response, NextFunction } from "express";
import { CustomError } from "./customError";

const customErrorHandler = function (
  err: CustomError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof CustomError) {
    return res
      .status(err.statusCode)
      .json({ message: err.message, errorType: err.errortype });
  } else {
    return res
      .status(500)
      .json({ message: err.message, errorType: "Internal server Error" });
  }
};

export default customErrorHandler;
