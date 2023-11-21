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

const createLevel = wrapper(async (req: Request, res: Response) => {
  const { level } = req.body;
  const Level = await creatingServices(
    prisma.level,
    {
      level,
    },
    { level }
  );
  res.status(201).json({ message: "level Added", success: true, Level });
});

const getAllLevels = wrapper(async (req: Request, res: Response) => {
  const leveles = await retrivingAllFromDb_Service(prisma.level, {});
  res.status(200).json({ success: true, leveles });
});

const getLevel = wrapper(async (req: Request, res: Response) => {
  const { id } = req.params;
  const level = await getSingleDocumentService(prisma.level, id);
  return res.status(200).json({ success: true, level });
});

const editLevel = wrapper(async (req: Request, res: Response) => {
  const { id } = req.params;
  const level = await getSingleDocumentService(prisma.level, id);
  if (!level) {
    throw new CustomError("invalid id", 403, "Not Exsiting");
  }
  const updatedlevel = await updatingDocumentService(
    prisma.level,
    req.body,
    id
  );
  return res
    .status(200)
    .json({ message: "level updated", success: true, level: updatedlevel });
});

const removeLevel = wrapper(async (req: Request, res: Response) => {
  const { id } = req.params;
  const level = await getSingleDocumentService(prisma.level, id);
  if (!level) {
    throw new CustomError("invalid id", 403, "Not Exsiting");
  }
  const response = await deletingDocumentService(prisma.level, id);
  return res
    .status(200)
    .json({ message: "level Removed", success: true, response });
});

export { createLevel, getAllLevels, getLevel, editLevel, removeLevel };
