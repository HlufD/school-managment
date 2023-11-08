import prisma from "../../script";
import { adduserService } from "../services/auth.service";
import wrapper from "../utils/asyncWrapper";
import { Request, Response, NextFunction } from "express";

const logIn = wrapper(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(req.body);

  return res.json("login");
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
