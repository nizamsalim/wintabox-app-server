"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const connectDatabase = (DB_URI) => {
    (0, mongoose_1.connect)(DB_URI, (err) => {
        if (err)
            throw err;
    });
};
exports.default = connectDatabase;
