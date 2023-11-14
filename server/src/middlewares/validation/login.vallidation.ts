import { Request, Response, NextFunction } from "express";
import userchema from "./login.schema";
import wrapper from "../../utils/asyncWrapper";
import { CustomError } from "../error/customError";
const loginVallidation = wrapper(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { username, password } = req.body;
  const { error } = userchema.user.validate({ username, password });
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
  const { first_name, last_name, username, picture, Role, password } = req.body;
  const { error } = userchema.userTobeAdded.validate({
    first_name,
    last_name,
    username,
    picture,
    Role,
    password,
  });
  if (error) {
    throw new CustomError(error.details[0].message, 422, "validation");
  } else {
    next();
  }
});

export { loginVallidation, addUserValidation };
