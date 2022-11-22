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
exports.loginWithProvider = exports.loginWithEmailAndPassword = exports.verifyUserEmail = exports.initiateVerifyUserEmail = exports.signUpWithEmailAndPassword = void 0;
const bcrypt_1 = require("bcrypt");
const UserModel_1 = __importDefault(require("../Models/UserModel"));
const firebase_admin_1 = require("firebase-admin");
const generateAuthToken_1 = require("../Helpers/generateAuthToken");
const Errors_1 = require("../Constants/Errors");
const sendEmailVerificationOtp_1 = __importDefault(require("../Helpers/sendEmailVerificationOtp"));
const verifyOtp_1 = __importDefault(require("../Helpers/verifyOtp"));
const signUpWithEmailAndPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, dateOfBirth } = req.body;
        const passwordHash = (0, bcrypt_1.hashSync)(password, 10);
        const newUser = yield UserModel_1.default.create({
            name,
            dateOfBirth,
            email,
            password: passwordHash,
        });
        const authToken = (0, generateAuthToken_1.generateAuthToken)({ _id: newUser._id });
        const responseUser = yield UserModel_1.default.findById(newUser._id).select("-password");
        res.json({ success: true, user: responseUser, authToken });
    }
    catch (error) {
        return res.status(500).json(Errors_1.InternalServerError);
    }
});
exports.signUpWithEmailAndPassword = signUpWithEmailAndPassword;
const initiateVerifyUserEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        if (!email) {
            return res.json(Errors_1.InvalidInputError).status(400);
        }
        const user = yield UserModel_1.default.findOne({ email });
        if (user) {
            return res.status(400).json(Errors_1.UserExistsError);
        }
        (0, sendEmailVerificationOtp_1.default)(email)
            .then((success) => {
            if (success) {
                res.status(200).end();
            }
        })
            .catch((err) => {
            return res.status(500).json(Errors_1.InternalServerError);
        });
    }
    catch (error) {
        return res.status(500).json(Errors_1.InternalServerError);
    }
});
exports.initiateVerifyUserEmail = initiateVerifyUserEmail;
const verifyUserEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { otp, email } = req.body;
        if (!(otp && email)) {
            return res.status(400).json(Errors_1.InvalidInputError);
        }
        (0, verifyOtp_1.default)(otp, email)
            .then((emailToken) => {
            res.json({ success: true, emailToken });
        })
            .catch((err) => {
            res.status(400).json(err);
        });
    }
    catch (error) {
        return res.status(500).json(Errors_1.InternalServerError);
    }
});
exports.verifyUserEmail = verifyUserEmail;
const loginWithEmailAndPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield UserModel_1.default.findOne({
            email,
        });
        if (!user) {
            return res.status(404).json(Errors_1.UserDoesNotExistError);
        }
        if (!user.password) {
            return res.status(400).json(Errors_1.InvalidLoginError);
        }
        const passwordMatches = yield (0, bcrypt_1.compare)(password, user.password);
        if (!passwordMatches) {
            return res.status(400).json(Errors_1.IncorrectPasswordError);
        }
        const authToken = (0, generateAuthToken_1.generateAuthToken)({ _id: user._id });
        const responseUser = yield UserModel_1.default.findById(user._id).select("-password");
        return res.json({
            success: true,
            user: responseUser,
            authToken,
        });
    }
    catch (error) {
        return res.status(500).json(Errors_1.InternalServerError);
    }
});
exports.loginWithEmailAndPassword = loginWithEmailAndPassword;
const loginWithProvider = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idToken, dateOfBirth } = req.body;
    if (!idToken) {
        return res.status(404).json(Errors_1.IdTokenMissingError);
    }
    try {
        const decodedData = yield (0, firebase_admin_1.auth)().verifyIdToken(idToken);
        const userExists = yield UserModel_1.default.findOne({
            email: decodedData.email,
        });
        let response = {
            success: true,
            user: {},
            authToken: "",
        };
        if (userExists) {
            response.user = userExists;
            response.authToken = (0, generateAuthToken_1.generateAuthToken)({ _id: userExists._id });
        }
        else {
            const user = yield UserModel_1.default.create({
                email: decodedData.email,
                dateOfBirth,
                name: decodedData.name,
            });
            response.user = user;
            response.authToken = (0, generateAuthToken_1.generateAuthToken)({ _id: user._id });
        }
        res.json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(Errors_1.InternalServerError);
    }
});
exports.loginWithProvider = loginWithProvider;
