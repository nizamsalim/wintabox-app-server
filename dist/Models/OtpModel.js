"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const optSchema = new mongoose_1.Schema({
    otp: String,
    expiry: Date,
    email: String,
});
exports.default = (0, mongoose_1.model)("otp", optSchema);
