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
const nodemailer_1 = require("nodemailer");
const OtpModel_1 = __importDefault(require("../Models/OtpModel"));
const otp_generator_1 = require("otp-generator");
function sendEmailVerificationOtp(email) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const transporter = (0, nodemailer_1.createTransport)({
                service: "gmail",
                host: "smtp.gmail.com",
                auth: {
                    user: process.env.SENDER_EMAIL,
                    pass: process.env.SENDER_EMAIL_PASSWORD,
                },
            });
            const otp = yield generateOtp(email);
            transporter.sendMail({
                from: process.env.SENDER_EMAIL,
                to: email,
                subject: "Otp for Wintabox App",
                text: `Hello!,\n${otp} is your otp for Wintabox App email verification. This code is valid for 10 minutes.\n\nThank you\nTeam Wintabox`,
            }, (err, info) => {
                if (err) {
                    reject(false);
                }
                else {
                    resolve(true);
                }
            });
        }
        catch (error) {
            reject(false);
        }
    }));
}
exports.default = sendEmailVerificationOtp;
function generateOtp(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const otpExists = yield OtpModel_1.default.findOne({ email });
        if (otpExists) {
            yield OtpModel_1.default.deleteOne({ email });
        }
        const expiry = new Date(Date.now() + 60 * 60 * 1000);
        const code = (0, otp_generator_1.generate)(6, {
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
            digits: true,
        });
        const otp = yield OtpModel_1.default.create({
            otp: code,
            expiry,
            email,
        });
        return code;
    });
}
