"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAuthToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const JWT_SECRET_KEY = "abcdefghijklmnopqrstuvwxyz123456789";
const generateAuthToken = (_id) => {
    const authToken = (0, jsonwebtoken_1.sign)({
        _id,
    }, JWT_SECRET_KEY);
    return authToken;
};
exports.generateAuthToken = generateAuthToken;
