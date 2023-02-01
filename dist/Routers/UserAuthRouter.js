"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ValidateSignupData_1 = __importDefault(require("../Middlewares/ValidateSignupData"));
const UserAuthController_1 = require("../Controllers/UserAuthController");
const RouteNames_1 = require("../Constants/RouteNames");
const router = (0, express_1.Router)();
router.post(RouteNames_1.UserEmailVerificationInitiateRoute, UserAuthController_1.initiateVerifyUserEmail);
router.post(RouteNames_1.UserEmailVerificationVerifyRoute, UserAuthController_1.verifyUserEmail);
router.post(RouteNames_1.UserEmailSignupRoute, ValidateSignupData_1.default, UserAuthController_1.signUpWithEmailAndPassword);
router.post(RouteNames_1.UserEmailLoginRoute, UserAuthController_1.loginWithEmailAndPassword);
router.post(RouteNames_1.UserProviderLoginRoute, UserAuthController_1.loginWithProvider);
router.post(RouteNames_1.UserPasswordResetRoute, UserAuthController_1.resetUserPassword);
exports.default = router;
