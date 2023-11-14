import { Router } from "express";
import { loginVallidation } from "../middlewares/validation/login.vallidation";
import {
  getUser,
  login,
  refreshToken,
  verifiyToken,
} from "../controllers/user";

const router = Router();
router.post("/login", loginVallidation, login);
router.get("/user", [verifiyToken, getUser]);
router.get("/refresh_token", [refreshToken, verifiyToken, getUser]);
export default router;
