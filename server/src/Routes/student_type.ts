import { Router } from "express";
import {} from "../controllers/level";
import {
  createStudent_Type,
  editStudent_Type,
  getAllStudent_Types,
  getStudent_Type,
  removeStudent_Type,
} from "../controllers/student_type";

const router = Router();
router.route("/").post([createStudent_Type]).get(getAllStudent_Types);
router
  .route("/:id")
  .get(getStudent_Type)
  .patch(editStudent_Type)
  .delete(removeStudent_Type);
export default router;
