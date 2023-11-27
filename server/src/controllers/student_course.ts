import { Request, Response, NextFunction } from "express";
import wrapper from "../utils/asyncWrapper";
import { retrivingAllFromDb_Service } from "../services/service";

import { prisma } from "../../script";
import { CustomError } from "../middlewares/error/customError";

const createStudent_Course = wrapper(async (req: Request, res: Response) => {
  const { studentId, courseId } = req.body;

  const student_course = await prisma.student_Course.create({
    data: { studentId, courseId },
  });
  res.status(201).json({
    message: "Course added to Student's course list",
    success: true,
    student_course,
  });
});

const getAllStudent_Course = wrapper(async (req: Request, res: Response) => {
  const students_course = await retrivingAllFromDb_Service(
    prisma.student_Course,
    {
      include: {
        course: {
          select: { course_name: true },
        },
      },
    }
  );
  res.status(200).json({ success: true, students_course });
});

const editStudent_Course = wrapper(async (req: Request, res: Response) => {
  const { id } = req.params;
  const cid = Number(id);
  const student_Course = await prisma.student_Course.findFirst({
    where: { id: cid },
  });
  if (!student_Course) {
    throw new CustomError("invalid id", 403, "Not Exsiting");
  }

  const updatedStudent_course = await prisma.student_Course.update({
    where: { id: cid },
    data: req.body,
  });

  return res.status(200).json({
    message: "student_Course updated",
    success: true,
    student: updatedStudent_course,
  });
});

const removeStudent_Course = wrapper(async (req: Request, res: Response) => {
  const { id } = req.params;
  const cid = Number(id);
  const student_Course = await prisma.student_Course.findFirst({
    where: { id: cid },
  });
  if (!student_Course) {
    throw new CustomError("invalid id", 403, "Not Exsiting");
  }
  const response = await prisma.student_Course.delete({ where: { id: cid } });

  return res.status(200).json({
    message: "Course removed from Student's course list",
    success: true,
    response,
  });
});

export {
  createStudent_Course,
  getAllStudent_Course,
  editStudent_Course,
  removeStudent_Course,
};
