import { Router } from "express";
import {
  addUserValidation,
  loginVallidation,
} from "../middlewares/validation/login.vallidation";
import { adduser, logIn } from "../controllers/user";
const router = Router();
router.route("/").post(loginVallidation, logIn);
router.post("/adduser", addUserValidation, adduser);

export default router;
