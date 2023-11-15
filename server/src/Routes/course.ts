import { Router } from "express";
import {
  createCourse,
  editCourse,
  getAllCourses,
  getCourse,
  removeCourse,
} from "../controllers/course";

const router = Router();
router.route("/").post([createCourse]).get(getAllCourses);
router.route("/:id").get(getCourse).patch(editCourse).delete(removeCourse);
export default router;
