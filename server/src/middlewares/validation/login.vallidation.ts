import { Request, Response, NextFunction } from "express";
import userchema from "./login.schema";
import wrapper from "../../utils/asyncWrapper";
import { CustomError } from "../error/customError";
const loginVallidation = wrapper(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error } = userchema.user.validate(req.body);
  if (error) {
    throw new CustomError(error.details[0].message, 422, "validation");
  } else {
    next();
  }
});

const addUserValidation = wrapper(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error } = userchema.userTobeAdded.validate(req.body);
  if (error) {
    throw new CustomError(error.details[0].message, 422, "validation");
  } else {
    next();
  }
});

export { loginVallidation, addUserValidation };
