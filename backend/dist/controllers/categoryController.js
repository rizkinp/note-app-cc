"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.getCategoryByName = exports.getAllCategories = exports.createCategory = void 0;
const categoryService_1 = __importDefault(require("../services/categoryService"));
const responseHelper_1 = require("../utils/responseHelper");
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const category = yield categoryService_1.default.createCategory(data);
        (0, responseHelper_1.successResponse)(res, category, "Category created successfully.");
    }
    catch (error) {
        (0, responseHelper_1.errorResponse)(res, error.message);
    }
});
exports.createCategory = createCategory;
const getAllCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield categoryService_1.default.getAllCategories();
        (0, responseHelper_1.successResponse)(res, categories, "Categories fetched successfully.");
    }
    catch (error) {
        (0, responseHelper_1.errorResponse)(res, error.message);
    }
});
exports.getAllCategories = getAllCategories;
const getCategoryByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.params.name;
    try {
        const category = yield categoryService_1.default.getCategoryByName(name);
        (0, responseHelper_1.successResponse)(res, category, "Category fetched successfully.");
    }
    catch (error) {
        (0, responseHelper_1.errorResponse)(res, error.message);
    }
});
exports.getCategoryByName = getCategoryByName;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const category = yield categoryService_1.default.updateCategory(Number(req.params.id), data);
        (0, responseHelper_1.successResponse)(res, category, "Category updated successfully.");
    }
    catch (error) {
        (0, responseHelper_1.errorResponse)(res, error.message);
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield categoryService_1.default.deleteCategory(Number(req.params.id));
        (0, responseHelper_1.successResponse)(res, category, "Category deleted successfully.");
    }
    catch (error) {
        (0, responseHelper_1.errorResponse)(res, error.message);
    }
});
exports.deleteCategory = deleteCategory;
