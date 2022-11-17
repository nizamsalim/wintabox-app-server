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
exports.loginWithProvider = exports.loginWithEmailAndPassword = exports.signUpWithEmailAndPassword = void 0;
const bcrypt_1 = require("bcrypt");
const UserModel_1 = __importDefault(require("../Models/UserModel"));
const firebase_admin_1 = require("firebase-admin");
const AuthToken_1 = require("../Middlewares/AuthToken");
const Errors_1 = require("../Constants/Errors");
const signUpWithEmailAndPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, dateOfBirth } = req.body;
        const user = yield UserModel_1.default.findOne({ email });
        if (user) {
            return res.status(400).json(Errors_1.UserExistsError);
        }
        const passwordHash = (0, bcrypt_1.hashSync)(password, 10);
        const newUser = yield UserModel_1.default.create({
            name,
            dateOfBirth,
            email,
            password: passwordHash,
        });
        const authToken = (0, AuthToken_1.generateAuthToken)(newUser._id);
        const responseUser = yield UserModel_1.default.findById(newUser._id).select("-password");
        res.json({ success: true, user: responseUser, authToken });
    }
    catch (error) {
        return res.status(500).json(Errors_1.InternalServerError);
    }
});
exports.signUpWithEmailAndPassword = signUpWithEmailAndPassword;
const loginWithEmailAndPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const authToken = (0, AuthToken_1.generateAuthToken)(user._id);
    const responseUser = yield UserModel_1.default.findById(user._id).select("-password");
    return res.json({
        success: true,
        user: responseUser,
        authToken,
    });
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
            response.authToken = (0, AuthToken_1.generateAuthToken)(userExists._id);
        }
        else {
            const user = yield UserModel_1.default.create({
                email: decodedData.email,
                dateOfBirth,
                name: decodedData.name,
            });
            response.user = user;
            response.authToken = (0, AuthToken_1.generateAuthToken)(user._id);
        }
        res.json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(Errors_1.InternalServerError);
    }
});
exports.loginWithProvider = loginWithProvider;
