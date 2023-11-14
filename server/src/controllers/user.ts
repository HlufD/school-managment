import { Request, Response, NextFunction } from "express";
import wrapper from "../utils/asyncWrapper";
import { loginService } from "../services/user.service";
import { generateToken } from "../utils/generateToken";
import { sendCookie } from "../utils/sendCookie";
import { CustomError } from "../middlewares/error/customError";
import jwt, { Secret } from "jsonwebtoken";
import { throws } from "assert";

const login = wrapper(async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await loginService({ username, password });
  const tonken = generateToken({ username, id: user.id });
  sendCookie(res, user.id, tonken);
  res.status(200).json({
    success: true,
    user,
  });
});

const getUser = (req: Request, res: Response) => {
  res.send(req.body.user);
};

const verifiyToken = (req: Request, res: Response, next: NextFunction) => {
  const cookie = req.headers.cookie;
  if (!cookie) {
    throw new CustomError("no token was found", 404, "Authurization");
  }
  const token = cookie.split("=")[1];
  jwt.verify(token, process.env.jwt_sec as Secret, (err, user) => {
    if (err) {
      throw new CustomError("invalid token", 403, "Token validation");
    }
    req.body.user = user;
    next();
  });
};

const refreshToken = (req: Request, res: Response, next: NextFunction) => {
  const cookies = req.headers.cookie;
  if (!cookies) {
    throw new CustomError("no token found", 404, "Authurization");
  }
  const prevToken = cookies.split("=")[1];
  jwt.verify(prevToken, process.env.jwt_sec as Secret, (err, user) => {
    if (err) {
      throw new CustomError("invalid token", 403, "Token validation");
    }
    const { id, username } = user as { id: string; username: string };
    // clear existing cookie
    res.clearCookie(`${id}`);
    req.cookies[id] = "";
    // new token
    const token = generateToken({ id, username });
    sendCookie(res, id, token);
    req.body.user = { id, username };
    next();
  });
};

export { login, getUser, verifiyToken, refreshToken };
