import { Request, Response } from "express";

export const NotFound = function (req: Request, res: Response) {
  return res.status(404).json({ message: "404 Not Found!" });
};
