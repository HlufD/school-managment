import { Router } from "express";
import {
  createStudent_Course,
  getAllStudent_Course,
  editStudent_Course,
  removeStudent_Course,
} from "../controllers/student_course";

const router = Router();

router.route("/").post(createStudent_Course).get(getAllStudent_Course);
router.route("/:id").patch(editStudent_Course).delete(removeStudent_Course);

export default router;
