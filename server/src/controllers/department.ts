import { Request, Response } from "express";
import { prisma } from "../../script";
import wrapper from "../utils/asyncWrapper";
import { CustomError } from "../middlewares/error/customError";
import {
  creatingServices,
  deletingDocumentService,
  getSingleDocumentService,
  retrivingAllFromDb_Service,
  updatingDocumentService,
} from "../services/service";

const createDepartment = wrapper(async (req: Request, res: Response) => {
  const department = await creatingServices(prisma.department, req.body);
  res.status(201).json({ success: true, department });
});

const getAllDepartments = wrapper(async (req: Request, res: Response) => {
  const departments = await retrivingAllFromDb_Service(prisma.department, {});
  res.status(200).json({ success: true, departments });
});

const getDepartment = wrapper(async (req: Request, res: Response) => {
  const { id } = req.params;
  const department = await getSingleDocumentService(prisma.department, id);
  return res.status(200).json({ success: true, department });
});

const editDepartment = wrapper(async (req: Request, res: Response) => {
  const { id } = req.params;
  const dep = await getSingleDocumentService(prisma.department, id);
  if (!dep) {
    throw new CustomError("invalid id", 403, "Not Exsiting");
  }
  const newDe = await updatingDocumentService(prisma.department, req.body, id);
  return res.status(200).json({ success: true, newDe });
});

const removeDepartment = wrapper(async (req: Request, res: Response) => {
  const { id } = req.params;
  const department = await getSingleDocumentService(prisma.department, id);
  if (!department) {
    throw new CustomError("invalid id", 403, "Not Exsiting");
  }
  const response = await deletingDocumentService(prisma.department, id);
  return res.status(200).json({ success: true, response });
});

export {
  createDepartment,
  getAllDepartments,
  getDepartment,
  editDepartment,
  removeDepartment,
};
