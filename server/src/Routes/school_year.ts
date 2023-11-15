import { Router } from "express";
import {} from "../controllers/level";
import {
  createSchool_Year,
  editSchool_Year,
  getAllSchool_Years,
  getSchool_Year,
  removeSchool_Year,
} from "../controllers/school_year";

const router = Router();
router.route("/").post([createSchool_Year]).get(getAllSchool_Years);
router
  .route("/:id")
  .get(getSchool_Year)
  .patch(editSchool_Year)
  .delete(removeSchool_Year);
export default router;
