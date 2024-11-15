"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./cmd/server");
const db_1 = require("./config/db");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
(0, server_1.startServer)().then(() => {
    server_1.app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
        db_1.sequelize.sync({ alter: true });
    });
});
