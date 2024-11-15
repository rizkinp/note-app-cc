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
const sequelize_1 = require("sequelize");
const noteModel_1 = __importDefault(require("../models/noteModel"));
class NoteService {
    // Create Note
    createNote(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data.categoryId) {
                throw new Error("categoryId is required.");
            }
            return yield noteModel_1.default.create(data);
        });
    }
    // Get All Notes
    getAllNotes(limit, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            const notes = yield noteModel_1.default.findAll({
                where: { is_deleted: false },
                order: [["createdAt", "DESC"]],
                limit,
                offset,
            });
            const totalCount = yield noteModel_1.default.count({
                where: { is_deleted: false },
            });
            return { notes, totalCount };
        });
    }
    // Get Note by ID
    getNoteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield noteModel_1.default.findByPk(id);
        });
    }
    // Get Notes by Category
    getNotesByCategory(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield noteModel_1.default.findAll({
                where: { categoryId, is_deleted: false },
                order: [["createdAt", "DESC"]],
            });
        });
    }
    // Search Notes
    searchNotes(query, startDate, endDate, sortOrder, categoryId // Menambahkan filter berdasarkan kategori, opsional
    ) {
        return __awaiter(this, void 0, void 0, function* () {
            const whereCondition = { is_deleted: false };
            // Filter berdasarkan kata kunci di title dan content
            if (query) {
                whereCondition[sequelize_1.Op.or] = [
                    { title: { [sequelize_1.Op.like]: `%${query}%` } },
                    { content: { [sequelize_1.Op.like]: `%${query}%` } },
                ];
            }
            // Filter berdasarkan tanggal (startDate dan endDate)
            if (startDate && !isNaN(Date.parse(startDate))) {
                whereCondition.createdAt = {
                    [sequelize_1.Op.gte]: new Date(startDate), // Tanggal mulai
                };
            }
            if (endDate && !isNaN(Date.parse(endDate))) {
                whereCondition.createdAt = {
                    [sequelize_1.Op.lte]: new Date(endDate), // Tanggal sampai
                };
            }
            // Filter berdasarkan kategori (jika ada)
            if (categoryId) {
                whereCondition.categoryId = categoryId;
            }
            // Mencari data berdasarkan kondisi
            return yield noteModel_1.default.findAll({
                where: whereCondition,
                order: [['createdAt', sortOrder]], // Urutkan berdasarkan createdAt sesuai sortOrder
            });
        });
    }
    // Update Note
    updateNote(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const [affectedRows] = yield noteModel_1.default.update(data, { where: { id } });
            if (affectedRows === 0) {
                throw new Error("Note not found or not updated.");
            }
            return { affectedRows };
        });
    }
    // Soft Delete Note
    deleteNote(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield noteModel_1.default.update({ is_deleted: true }, { where: { id } });
        });
    }
    // Pin or Unpin Note
    pinNote(id, isPinned) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield noteModel_1.default.update({ is_pinned: isPinned }, { where: { id } });
            }
            catch (error) {
                throw new Error("Error pinning or unpinning the note.");
            }
        });
    }
}
exports.default = new NoteService();
