"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmailToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
function verifyEmailToken(email, emailToken, res) {
    try {
        const payload = (0, jsonwebtoken_1.verify)(emailToken, process.env.JWT_SECRET);
        return payload.email == email;
    }
    catch (error) {
        res.status(400).json({
            success: false,
            error: {
                code: "auth/emtkn-cr",
                message: "Email token is corrupted",
                statusCode: 400,
            },
        });
    }
}
exports.verifyEmailToken = verifyEmailToken;
