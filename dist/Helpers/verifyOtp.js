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
const Errors_1 = require("../Constants/Errors");
const OtpModel_1 = __importDefault(require("../Models/OtpModel"));
const generateAuthToken_1 = require("./generateAuthToken");
function verifyOtp(otp, email) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        const otpExists = yield OtpModel_1.default.findOne({ otp });
        if (!otpExists || otpExists.email != email) {
            return reject(Errors_1.IncorrectOtpError);
        }
        if (Date.now() > otpExists.expiry) {
            return reject(Errors_1.OtpExpiredError);
        }
        yield OtpModel_1.default.deleteOne({ otp });
        const emailToken = (0, generateAuthToken_1.generateAuthToken)({ email });
        resolve(emailToken);
    }));
}
exports.default = verifyOtp;
