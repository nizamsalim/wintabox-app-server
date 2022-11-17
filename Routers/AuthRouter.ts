import { Router } from "express";
import validateSignup from "../Middlewares/ValidateSignupData";

import {
  signUpWithEmailAndPassword,
  loginWithEmailAndPassword,
  loginWithProvider,
} from "../Controllers/AuthController";
import {
  UserEmailLoginRoute,
  UserEmailSignupRoute,
  UserProviderLoginRoute,
} from "../Constants/RouteNames";

const router: Router = Router();

router.post(UserEmailSignupRoute, validateSignup, signUpWithEmailAndPassword);

router.post(UserEmailLoginRoute, loginWithEmailAndPassword);

router.post(UserProviderLoginRoute, loginWithProvider);

export default router;
