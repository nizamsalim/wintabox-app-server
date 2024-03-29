import { Router } from "express";
import validateSignup from "../Middlewares/ValidateSignupData";
import { createTransport, Transporter, createTestAccount } from "nodemailer";

import {
  signUpWithEmailAndPassword,
  loginWithEmailAndPassword,
  loginWithProvider,
  initiateVerifyUserEmail,
  verifyUserEmail,
  resetUserPassword,
} from "../Controllers/UserAuthController";
import {
  UserEmailLoginRoute,
  UserEmailSignupRoute,
  UserEmailVerificationInitiateRoute,
  UserEmailVerificationVerifyRoute,
  UserPasswordResetRoute,
  UserProviderLoginRoute,
} from "../Constants/RouteNames";

const router: Router = Router();

router.post(UserEmailVerificationInitiateRoute, initiateVerifyUserEmail);

router.post(UserEmailVerificationVerifyRoute, verifyUserEmail);

router.post(UserEmailSignupRoute, validateSignup, signUpWithEmailAndPassword);

router.post(UserEmailLoginRoute, loginWithEmailAndPassword);

router.post(UserProviderLoginRoute, loginWithProvider);

router.post(UserPasswordResetRoute, resetUserPassword);

export default router;
