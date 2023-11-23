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
import * as path from "path";
const currentDir = path.resolve(__dirname);

const createStudent = wrapper(async (req: Request, res: Response) => {
  const {
    first_name,
    last_name,
    age,
    sex,
    phone_number,
    student_TypeId,
    departmentId,
  } = req.body;

  const studentImages = Array.isArray(req.files?.picture)
    ? req.files?.picture
    : [req.files?.picture];

  if (!studentImages || studentImages.length === 0) {
    return res
      .status(400)
      .json({ success: false, errorType: "No file or files uploaded" });
  }
  const imagePath = path.join(
    currentDir,
    "../../public/uploads/" + `${studentImages[0]?.name}`
  );

  await studentImages[0]?.mv(imagePath);
  const pictureUrl = `http://localhost:5000/uploads/${studentImages[0]?.name}`;

  const student = await creatingServices(
    prisma.student,
    {
      first_name,
      last_name,
      age: Number(age),
      sex,
      phone_number,
      picture: pictureUrl,
      student_TypeId,
      departmentId,
    },
    { phone_number: phone_number }
  );

  res.status(201).json({ message: "Student Added", success: true, student });
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
  return res
    .status(200)
    .json({
      message: "Student updated",
      success: true,
      student: updatedStudent,
    });
});

const removeStudent = wrapper(async (req: Request, res: Response) => {
  const { id } = req.params;
  const student = await getSingleDocumentService(prisma.student, id);
  if (!student) {
    throw new CustomError("invalid id", 403, "Not Exsiting");
  }
  const response = await deletingDocumentService(prisma.student, id);
  return res
    .status(200)
    .json({ message: "Student Removed", success: true, response });
});

export { createStudent, getAllStudent, getStudent, editStudent, removeStudent };
