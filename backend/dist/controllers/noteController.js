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
exports.pinNote = exports.deleteNote = exports.updateNote = exports.searchNotes = exports.getNoteById = exports.getAllNotes = exports.createNote = void 0;
const noteService_1 = __importDefault(require("../services/noteService"));
const responseHelper_1 = require("../utils/responseHelper");
// Create Note
const createNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        // Validasi input categoryId
        if (!data.categoryId) {
            return (0, responseHelper_1.errorResponse)(res, "categoryId is required.", 400);
        }
        const note = yield noteService_1.default.createNote(data);
        (0, responseHelper_1.successResponse)(res, note, "Note created successfully.");
    }
    catch (error) {
        (0, responseHelper_1.errorResponse)(res, error.message);
    }
});
exports.createNote = createNote;
// Get All Notes with Pagination
const getAllNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const { notes, totalCount } = yield noteService_1.default.getAllNotes(limit, offset);
        const totalPages = Math.ceil(totalCount / limit);
        (0, responseHelper_1.successResponse)(res, { notes, totalPages, currentPage: page, totalCount }, "Notes fetched successfully.");
    }
    catch (error) {
        (0, responseHelper_1.errorResponse)(res, error.message);
    }
});
exports.getAllNotes = getAllNotes;
// Get Note By ID
const getNoteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const note = yield noteService_1.default.getNoteById(Number(req.params.id));
        if (!note) {
            return (0, responseHelper_1.errorResponse)(res, "Note not found.");
        }
        const responseNote = {
            id: note.id,
            title: note.title,
            content: note.content,
            createdAt: note.createdAt,
        };
        (0, responseHelper_1.successResponse)(res, responseNote, "Note fetched successfully.");
    }
    catch (error) {
        (0, responseHelper_1.errorResponse)(res, error.message);
    }
});
exports.getNoteById = getNoteById;
// Search Notes
// Search Notes
const searchNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const query = req.query.search || ''; // kata kunci pencarian
        const startDate = req.query.startDate || ''; // tanggal mulai
        const endDate = req.query.endDate || ''; // tanggal akhir
        const sortOrder = (_a = req.query.sort) !== null && _a !== void 0 ? _a : 'DESC'; // urutan sort (ASC / DESC)
        const categoryId = req.query.categoryId ? Number(req.query.categoryId) : undefined; // kategori (opsional)
        // Pencarian catatan
        const notes = yield noteService_1.default.searchNotes(query, startDate, endDate, sortOrder, categoryId);
        if (notes.length === 0) {
            return (0, responseHelper_1.errorResponse)(res, 'No notes found.', 404);
        }
        (0, responseHelper_1.successResponse)(res, notes, 'Notes fetched successfully.');
    }
    catch (error) {
        (0, responseHelper_1.errorResponse)(res, error.message);
    }
});
exports.searchNotes = searchNotes;
// Update Note
const updateNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const { affectedRows } = yield noteService_1.default.updateNote(Number(req.params.id), data);
        (0, responseHelper_1.successResponse)(res, { affectedRows }, "Note updated successfully.");
    }
    catch (error) {
        (0, responseHelper_1.errorResponse)(res, error.message);
    }
});
exports.updateNote = updateNote;
// Delete Note
const deleteNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const note = yield noteService_1.default.deleteNote(Number(req.params.id));
        (0, responseHelper_1.successResponse)(res, note, "Note deleted successfully.");
    }
    catch (error) {
        (0, responseHelper_1.errorResponse)(res, error.message);
    }
});
exports.deleteNote = deleteNote;
// Pin or Unpin Note
const pinNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { is_pinned } = req.body;
        // Validasi is_pinned
        if (typeof is_pinned !== "boolean") {
            return (0, responseHelper_1.errorResponse)(res, "is_pinned must be a boolean value.", 400);
        }
        // Update status pinning
        const note = yield noteService_1.default.pinNote(Number(req.params.id), is_pinned);
        (0, responseHelper_1.successResponse)(res, note, `Note ${is_pinned ? "pinned" : "unpinned"} successfully.`);
    }
    catch (error) {
        (0, responseHelper_1.errorResponse)(res, error.message);
    }
});
exports.pinNote = pinNote;
