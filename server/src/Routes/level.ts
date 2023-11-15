import { Router } from "express";
import {
  createLevel,
  editLevel,
  getAllLevels,
  getLevel,
  removeLevel,
} from "../controllers/level";

const router = Router();
router.route("/").post([createLevel]).get(getAllLevels);
router.route("/:id").get(getLevel).patch(editLevel).delete(removeLevel);
export default router;
