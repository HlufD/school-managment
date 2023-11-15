import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { CustomError } from "../error/customError";

const schema = {
  deraprtment: Joi.object({
    dep_name: Joi.string().required().min(3).max(40),
    dep_code: Joi.string().required().max(40).min(3),
  }),
};

export const createDepartmentValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { dep_name, dep_code } = req.body;
  const { error } = schema.deraprtment.validate({ dep_name, dep_code });
  if (error) {
    throw new CustomError(error.details[0].message, 422, "validation");
  } else {
    next();
  }
};
