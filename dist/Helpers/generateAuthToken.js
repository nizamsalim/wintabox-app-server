"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAuthToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const JWT_SECRET_KEY = process.env.JWT_SECRET;
const generateAuthToken = (payload) => {
    const authToken = (0, jsonwebtoken_1.sign)(payload, JWT_SECRET_KEY);
    return authToken;
};
exports.generateAuthToken = generateAuthToken;
