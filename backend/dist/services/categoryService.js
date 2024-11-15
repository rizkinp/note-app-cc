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
const categoryModel_1 = __importDefault(require("../models/categoryModel"));
class CategoryService {
    // Get All Categories
    getAllCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield categoryModel_1.default.findAll({
                where: { is_deleted: false }
            });
        });
    }
    //Get All Category 
    getCategoryById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield categoryModel_1.default.findAll({
                where: { is_deleted: false }
            });
        });
    }
    //Get Category By Name
    getCategoryByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield categoryModel_1.default.findAll({
                where: { name }
            });
        });
    }
    // Create Category
    createCategory(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield categoryModel_1.default.create(data);
        });
    }
    //Update Category
    updateCategory(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield categoryModel_1.default.update(data, { where: { id } });
        });
    }
    // Soft Delete Category
    deleteCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield categoryModel_1.default.update({ is_deleted: true }, { where: { id } });
        });
    }
}
exports.default = new CategoryService();
