import { Router } from "express";
import validateSignup from "../Middlewares/ValidateSignupData";

import {
  signUpWithEmailAndPassword,
  loginWithEmailAndPassword,
  loginWithProvider,
} from "../Controllers/AuthController";

const router: Router = Router();

router.post("/signup/email", validateSignup, signUpWithEmailAndPassword);

router.post("/login/email", loginWithEmailAndPassword);

router.post("/login/provider", loginWithProvider);

export default router;
