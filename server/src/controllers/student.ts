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

const createStudent = wrapper(async (req: Request, res: Response) => {
  const {
    first_name,
    last_name,
    age,
    sex,
    phone_number,
    picture,
    student_TypeId,
    departmentId,
  } = req.body;
  const student = await creatingServices(
    prisma.student,
    {
      first_name,
      last_name,
      age,
      sex,
      phone_number,
      picture,
      student_TypeId,
      departmentId,
    },
    { phone_number }
  );
  res.status(201).json({ success: true, student });
});

const getAllStudent = wrapper(async (req: Request, res: Response) => {
  const students = await retrivingAllFromDb_Service(prisma.student, {});
  res.status(200).json({ success: true, students });
});

const getStudent = wrapper(async (req: Request, res: Response) => {
  const { id } = req.params;
  const student = await getSingleDocumentService(prisma.student, id);
  return res.status(200).json({ success: true, student });
});

const editStudent = wrapper(async (req: Request, res: Response) => {
  const { id } = req.params;
  const student = await getSingleDocumentService(prisma.student, id);
  if (!student) {
    throw new CustomError("invalid id", 403, "Not Exsiting");
  }
  const updatedStudent = await updatingDocumentService(
    prisma.student,
    req.body,
    id
  );
  return res.status(200).json({ success: true, student: updatedStudent });
});

const removeStudent = wrapper(async (req: Request, res: Response) => {
  const { id } = req.params;
  const student = await getSingleDocumentService(prisma.student, id);
  if (!student) {
    throw new CustomError("invalid id", 403, "Not Exsiting");
  }
  const response = await deletingDocumentService(prisma.student, id);
  return res.status(200).json({ success: true, response });
});

export { createStudent, getAllStudent, getStudent, editStudent, removeStudent };
