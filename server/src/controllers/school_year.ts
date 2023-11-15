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

const createSchool_Year = wrapper(async (req: Request, res: Response) => {
  const { startring_date, end_date, year_name } = req.body;
  const school_Year = await creatingServices(
    prisma.school_Year,
    {
      startring_date,
      end_date,
      year_name,
    },
    { year_name }
  );
  res.status(201).json({ success: true, school_Year });
});

const getAllSchool_Years = wrapper(async (req: Request, res: Response) => {
  const school_Years = await retrivingAllFromDb_Service(prisma.school_Year, {});
  res.status(200).json({ success: true, school_Years });
});

const getSchool_Year = wrapper(async (req: Request, res: Response) => {
  const { id } = req.params;
  const school_Year = await getSingleDocumentService(prisma.school_Year, id);
  return res.status(200).json({ success: true, school_Year });
});

const editSchool_Year = wrapper(async (req: Request, res: Response) => {
  const { id } = req.params;
  const school_Year = await getSingleDocumentService(prisma.school_Year, id);
  if (!school_Year) {
    throw new CustomError("invalid id", 403, "Not Exsiting");
  }
  const updatedSchool_Year = await updatingDocumentService(
    prisma.school_Year,
    req.body,
    id
  );
  return res
    .status(200)
    .json({ success: true, school_Year: updatedSchool_Year });
});

const removeSchool_Year = wrapper(async (req: Request, res: Response) => {
  const { id } = req.params;
  const school_Year = await getSingleDocumentService(prisma.school_Year, id);
  if (!school_Year) {
    throw new CustomError("invalid id", 403, "Not Exsiting");
  }
  const response = await deletingDocumentService(prisma.school_Year, id);
  return res.status(200).json({ success: true, response });
});

export {
  createSchool_Year,
  getAllSchool_Years,
  getSchool_Year,
  editSchool_Year,
  removeSchool_Year,
};
