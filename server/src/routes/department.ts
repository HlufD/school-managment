import { Router } from "express";
import {
  createDepartment,
  deleteDepartment,
  editDepartment,
  getAllDepartments,
  getDepartment,
} from "../controllers/department";

const router = Router();

router.route("/").get(getAllDepartments).post(createDepartment);
router
  .route("/:id")
  .get(getDepartment)
  .patch(editDepartment)
  .delete(deleteDepartment);

export default router;
