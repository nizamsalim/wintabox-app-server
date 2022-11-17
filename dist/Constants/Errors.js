"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidLoginError = exports.IdTokenMissingError = exports.IncorrectPasswordError = exports.UserExistsError = exports.UserDoesNotExistError = exports.InternalServerError = void 0;
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
