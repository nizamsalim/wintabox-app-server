"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const verifyEmailToken_1 = require("../Helpers/verifyEmailToken");
const UserModel_1 = __importDefault(require("../Models/UserModel"));
const validateSignup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const emailToken = req.headers["email-token"];
    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            error: {
                statusCode: 400,
                code: "val/inv-inp",
                message: "Invalid input",
            },
        });
    }
    if (!emailToken) {
        return res.status(401).json({
            success: false,
            error: {
                statusCode: 401,
                code: "auth/tkn-abs",
                message: "Email token is missing",
            },
        });
    }
    // validation checks
    const emailExists = yield UserModel_1.default.findOne({ email: email });
    const emailIsValid = validateEmail(email);
    const passwordIsValid = password.length >= 6 ? true : false;
    const emailIsVerified = (0, verifyEmailToken_1.verifyEmailToken)(email, emailToken, res);
    function validateEmail(emailInput) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(emailInput.toLowerCase());
    }
    // function validatePhone(phoneInput: string) {
    //   const re = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
    //   return re.test(phoneInput);
    // }
    // if (usernameExists) {
    //   return res.status(400).json({
    //     success: false,
    //     error: {
    //       statusCode: 400,
    //       code: "val/un-tkn",
    //       message: "Username is already taken",
    //     },
    //   });
    // }
    if (emailExists) {
        return res.status(400).json({
            success: false,
            error: {
                statusCode: 400,
                code: "val/em-ex",
                message: "Email already exists",
            },
        });
    }
    if (!emailIsValid) {
        return res.status(400).json({
            success: false,
            error: {
                statusCode: 400,
                code: "val/em-inv",
                message: "Email is invalid",
            },
        });
    }
    if (!passwordIsValid) {
        return res.status(400).json({
            success: false,
            error: {
                statusCode: 400,
                code: "val/pwd-len",
                message: "Password should be atleast 6 characters long",
            },
        });
    }
    if (!emailIsVerified) {
        return res.status(401).json({
            success: false,
            error: {
                statusCode: 401,
                code: "auth/em-nv",
                message: "Email is not verified",
            },
        });
    }
    // if (!phoneIsValid) {
    //   return res.status(400).json({
    //     success: false,
    //     error: {
    //       statusCode: 400,
    //       code: "val/ph-inv",
    //       message: "Phone is in invalid format",
    //     },
    //   });
    // }
    next();
});
exports.default = validateSignup;
