import { Request, Response } from "express";
import wrapper from "../utils/asyncWrapper";

const createDepartment = wrapper(async function (req: Request, res: Response) {
  return res.json("Creating Deps");
});

const getAllDepartments = wrapper(async function (req: Request, res: Response) {
  return res.json("Getting all Deps");
});

const getDepartment = wrapper(async function (req: Request, res: Response) {
  return res.json("Creating Deps");
});

const editDepartment = wrapper(async function (req: Request, res: Response) {
  return res.json("Editting a Dep");
});

const deleteDepartment = wrapper(async function (req: Request, res: Response) {
  return res.json("Deleting a Dep");
});

export {
  createDepartment,
  getAllDepartments,
  getDepartment,
  editDepartment,
  deleteDepartment,
};
