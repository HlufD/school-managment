import { Response } from "express";
const sendCookie = (res: Response, id: string, token: string) => {
  res.cookie(id, token, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    expires: new Date(Date.now() + 1000 * 60 * 15),
  });
};

export { sendCookie };
