import { NextFunction, Request, Response } from "express";

function wrapper(fn: Function) {
  return async function name(req: Request, res: Response, next: NextFunction) {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

export default wrapper;
