import { Router } from "express";
import {
  CGetUserData,
  CRefreshToken,
  CUserLogin,
  CUserRegister,
} from "../controller/auth.controller";
import { MAuthUser } from "../middleware/auth.middleware";

const router = Router();

router.post("/login", CUserLogin);

router.post("/register", CUserRegister);

router.get("/me", MAuthUser(), CGetUserData);

router.post("/refresh", CRefreshToken);

export default router;
