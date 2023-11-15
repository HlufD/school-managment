import { Router } from "express";
import {
  createDepartment,
  editDepartment,
  getAllDepartments,
  getDepartment,
  removeDepartment,
} from "../controllers/department";
import { createDepartmentValidation } from "../middlewares/validation/department.schema";

const router = Router();
router
  .route("/")
  .post([createDepartmentValidation, createDepartment])
  .get(getAllDepartments);
router
  .route("/:id")
  .get(getDepartment)
  .patch(editDepartment)
  .delete(removeDepartment);

export default router;
