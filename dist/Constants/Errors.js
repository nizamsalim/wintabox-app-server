"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncorrectOtpError = exports.OtpExpiredError = exports.InvalidLoginError = exports.IdTokenMissingError = exports.IncorrectPasswordError = exports.InvalidInputError = exports.UserExistsError = exports.UserDoesNotExistError = exports.InternalServerError = void 0;
exports.InternalServerError = {
    success: false,
    error: {
        code: "server",
        message: "Internal server error.",
        statusCode: 500,
    },
};
exports.UserDoesNotExistError = {
    success: false,
    error: {
        code: "auth/em-nf",
        message: "User does not exist",
        statusCode: 404,
    },
};
exports.UserExistsError = {
    success: false,
    error: {
        code: "auth/em-ex",
        message: "Email already exists",
        statusCode: 400,
    },
};
exports.InvalidInputError = {
    success: false,
    error: {
        statusCode: 400,
        code: "val/inv-inp",
        message: "Invalid input",
    },
};
exports.IncorrectPasswordError = {
    success: false,
    error: {
        code: "auth/pwd-inc",
        message: "Password is incorrect",
        statusCode: 400,
    },
};
exports.IdTokenMissingError = {
    success: false,
    error: {
        code: "auth/idtkn-abs",
        message: "Id token is missing in the request body",
        statusCode: 404,
    },
};
exports.InvalidLoginError = {
    success: false,
    error: {
        code: "auth/log-inv",
        message: "Invalid login. User is signed in through google/facebook",
        statusCode: 400,
    },
};
exports.OtpExpiredError = {
    success: false,
    error: {
        code: "auth/otp-exp",
        message: "OTP expired",
        statusCode: 400,
    },
};
exports.IncorrectOtpError = {
    success: false,
    error: {
        code: "auth/otp-inc",
        message: "Incorrect OTP",
        statusCode: 400,
    },
};
