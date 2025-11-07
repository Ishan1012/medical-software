"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtService = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
if (!process.env.JWT_SECRET_KEY) {
    throw new Error("JWT_SECRET_KEY environment veriable is not set");
}
if (!process.env.JWT_TIMEOUT) {
    throw new Error("JWT_TIMEOUT environment veriable is not set");
}
const jwtSecretKey = process.env.JWT_SECRET_KEY;
const jwtExpiration = process.env.JWT_TIMEOUT;
class JwtService {
    constructor() { }
    generateToken(email, role, userId) {
        return jsonwebtoken_1.default.sign({ email, role, userId }, jwtSecretKey, {
            expiresIn: jwtExpiration,
        });
    }
}
exports.JwtService = JwtService;
//# sourceMappingURL=JwtService.js.map