"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ValidateSignupData_1 = __importDefault(require("../Middlewares/ValidateSignupData"));
const AuthController_1 = require("../Controllers/AuthController");
const router = (0, express_1.Router)();
router.post("/signup/email", ValidateSignupData_1.default, AuthController_1.signUpWithEmailAndPassword);
router.post("/login/email", AuthController_1.loginWithEmailAndPassword);
router.post("/login/provider", AuthController_1.loginWithProvider);
exports.default = router;
