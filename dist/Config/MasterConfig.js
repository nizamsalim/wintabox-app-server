"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const DatabaseConfig_1 = __importDefault(require("./DatabaseConfig"));
const FirebaseConfig_1 = __importDefault(require("./FirebaseConfig"));
function MasterConfig() {
    (0, dotenv_1.config)();
    (0, DatabaseConfig_1.default)(process.env.DB_URI);
    (0, FirebaseConfig_1.default)();
}
exports.default = MasterConfig;
