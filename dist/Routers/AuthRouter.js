"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ValidateSignupData_1 = __importDefault(require("../Middlewares/ValidateSignupData"));
const AuthController_1 = require("../Controllers/AuthController");
const RouteNames_1 = require("../Constants/RouteNames");
const router = (0, express_1.Router)();
router.post(RouteNames_1.UserEmailSignupRoute, ValidateSignupData_1.default, AuthController_1.signUpWithEmailAndPassword);
router.post(RouteNames_1.UserEmailLoginRoute, AuthController_1.loginWithEmailAndPassword);
router.post(RouteNames_1.UserProviderLoginRoute, AuthController_1.loginWithProvider);
exports.default = router;
