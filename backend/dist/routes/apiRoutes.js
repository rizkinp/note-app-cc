"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/apiRoutes.js
const express_1 = __importDefault(require("express"));
const noteRoutes_1 = __importDefault(require("./noteRoutes"));
const categoryRoutes_1 = __importDefault(require("./categoryRoutes"));
const router = express_1.default.Router();
// Gabungkan semua route di dalam satu grup /api
router.use('/notes', noteRoutes_1.default); // Route untuk notes
router.use('/category', categoryRoutes_1.default); // Route untuk kategori
exports.default = router;
