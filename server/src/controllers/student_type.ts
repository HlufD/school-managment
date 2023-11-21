import { Request, Response, NextFunction } from "express";
import wrapper from "../utils/asyncWrapper";
import {
  creatingServices,
  deletingDocumentService,
  getSingleDocumentService,
  retrivingAllFromDb_Service,
  updatingDocumentService,
} from "../services/service";
import { prisma } from "../../script";
import { CustomError } from "../middlewares/error/customError";

const createStudent_Type = wrapper(async (req: Request, res: Response) => {
  const { type_name, type_code } = req.body;
  const program = await creatingServices(
    prisma.student_Type,
    {
      type_code,
      type_name,
    },
    { type_code }
  );
  res.status(201).json({ message: "Program Added", success: true, program });
});

const getAllStudent_Types = wrapper(async (req: Request, res: Response) => {
  const student_Types = await retrivingAllFromDb_Service(
    prisma.student_Type,
    {}
  );
  res.status(200).json({ success: true, student_Types });
});

const getStudent_Type = wrapper(async (req: Request, res: Response) => {
  const { id } = req.params;
  const student_Type = await getSingleDocumentService(prisma.student_Type, id);
  return res.status(200).json({ success: true, student_Type });
});

const editStudent_Type = wrapper(async (req: Request, res: Response) => {
  const { id } = req.params;
  const student_Type = await getSingleDocumentService(prisma.student_Type, id);
  if (!student_Type) {
    throw new CustomError("invalid id", 403, "Not Exsiting");
  }
  const updatesStudent_Type = await updatingDocumentService(
    prisma.student_Type,
    req.body,
    id
  );
  return res.status(200).json({
    message: "Program Updated",
    success: true,
    program: updatesStudent_Type,
  });
});

const removeStudent_Type = wrapper(async (req: Request, res: Response) => {
  const { id } = req.params;
  const student_Type = await getSingleDocumentService(prisma.student_Type, id);
  if (!student_Type) {
    throw new CustomError("invalid id", 403, "Not Exsiting");
  }
  const response = await deletingDocumentService(prisma.student_Type, id);
  return res
    .status(200)
    .json({ message: "Program Removed", success: true, response });
});

export {
  createStudent_Type,
  getAllStudent_Types,
  getStudent_Type,
  editStudent_Type,
  removeStudent_Type,
};
