"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const Database_1 = __importDefault(require("./config/Database"));
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
(0, Database_1.default)();
app_1.default.listen(PORT, () => console.log(`server is live at http://localhost:${PORT}`));
//# sourceMappingURL=server.js.map