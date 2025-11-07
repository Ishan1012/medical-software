"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const AuthRoutes_1 = __importDefault(require("./routes/AuthRoutes"));
const AppointmentRoutes_1 = __importDefault(require("./routes/AppointmentRoutes"));
const ConsultRoutes_1 = __importDefault(require("./routes/ConsultRoutes"));
const ArticleRoutes_1 = __importDefault(require("./routes/ArticleRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const allowedOrigins = [
    "http://localhost:3000",
];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));
app.use(express_1.default.json());
app.use("/api/v1/auth", AuthRoutes_1.default);
app.use("/api/v1/appointment", AppointmentRoutes_1.default);
app.use("/api/v1/consult", ConsultRoutes_1.default);
app.use("/api/v1/article", ArticleRoutes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map