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

const createCourse = wrapper(async (req: Request, res: Response) => {
  const { course_name, course_code, credit_hour } = req.body;
  const course = await creatingServices(
    prisma.course,
    {
      course_code,
      course_name,
      credit_hour,
    },
    { course_code }
  );
  return res
    .status(201)
    .json({ message: "Course added", success: true, course });
});

const getAllCourses = wrapper(async (req: Request, res: Response) => {
  const courses = await retrivingAllFromDb_Service(prisma.course, {});
  res.status(200).json({ success: true, courses });
});

const getCourse = wrapper(async (req: Request, res: Response) => {
  const { id } = req.params;
  const course = await getSingleDocumentService(prisma.course, id);
  return res.status(200).json({ success: true, course });
});

const editCourse = wrapper(async (req: Request, res: Response) => {
  const { id } = req.params;
  const course = await getSingleDocumentService(prisma.course, id);
  if (!course) {
    throw new CustomError("invalid id", 403, "Not Exsiting");
  }
  const updatedCourse = await updatingDocumentService(
    prisma.course,
    req.body,
    id
  );
  return res
    .status(200)
    .json({ message: "Course updated!", success: true, course: updatedCourse });
});

const removeCourse = wrapper(async (req: Request, res: Response) => {
  const { id } = req.params;
  const course = await getSingleDocumentService(prisma.course, id);
  if (!course) {
    throw new CustomError("invalid id", 403, "Not Exsiting");
  }
  const response = await deletingDocumentService(prisma.course, id);
  return res
    .status(200)
    .json({ message: "Course Removed", success: true, response });
});

export { createCourse, getAllCourses, getCourse, editCourse, removeCourse };
