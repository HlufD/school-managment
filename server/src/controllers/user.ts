import prisma from "../../script";
import { CustomError } from "../middlewares/error/customError";
import { adduserService, loginServive } from "../services/auth.service";
import wrapper from "../utils/asyncWrapper";
import { Request, Response, NextFunction } from "express";
import { generateToke } from "../utils/generateToke";

const logIn = wrapper(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = await prisma.user.findUnique({
    where: { username: req.body.username },
  });
  if (user) {
    const [isMatched, token] = await loginServive(req.body, user);
    if (isMatched) {
      return res.status(201).json({ user, token });
    } else
      throw new CustomError(
        "username or password is incorrect",
        402,
        "Authentication"
      );
  }

  throw new CustomError(
    "username or password is incorrect",
    402,
    "Authentication"
  );
});

const adduser = wrapper(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = await adduserService(req.body);
  return res.status(200).json(user);
});

export { logIn, adduser };
