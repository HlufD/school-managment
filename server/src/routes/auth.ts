import { Router } from "express";
import { adduser, logIn } from "../Authentication/user.auht";
import {
  addUserValidation,
  loginVallidation,
} from "../middlewares/validation/login.vallidation";
const router = Router();
router.route("/").post(loginVallidation, logIn);
router.post("/adduser", addUserValidation, adduser);

export default router;
