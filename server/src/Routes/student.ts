import { Router } from "express";
import {} from "../controllers/level";
import {
  createStudent,
  editStudent,
  getAllStudent,
  getStudent,
  removeStudent,
} from "../controllers/student";

const router = Router();
router.route("/").post([createStudent]).get(getAllStudent);
router.route("/:id").get(getStudent).patch(editStudent).delete(removeStudent);
export default router;
