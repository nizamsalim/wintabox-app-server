"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserAuthRouter_1 = __importDefault(require("../Routers/UserAuthRouter"));
const ArtistAuthRouter_1 = __importDefault(require("../Routers/ArtistAuthRouter"));
function RouterConfig(app) {
    app.use("/auth", UserAuthRouter_1.default);
    app.use("/artist/auth", ArtistAuthRouter_1.default);
}
exports.default = RouterConfig;
