import { Request, Response } from "express";
import noteService from "../services/noteService";
import { successResponse, errorResponse } from "../utils/responseHelper";
import { CreateNoteDTO, UpdateNoteDTO, NoteResponseDTO } from "../dtos/noteDTO";

// Create Note
export const createNote = async (req: Request, res: Response) => {
  try {
    const data: CreateNoteDTO = req.body;

    // Validasi input categoryId
    if (!data.categoryId) {
      return errorResponse(res, "categoryId is required.", 400);
    }

    const note = await noteService.createNote(data);
    successResponse(res, note, "Note created successfully.");
  } catch (error) {
    errorResponse(res, (error as Error).message);
  }
};

// Get All Notes with Pagination
export const getAllNotes = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;

    const { notes, totalCount } = await noteService.getAllNotes(limit, offset);

    const totalPages = Math.ceil(totalCount / limit);

    successResponse(
      res,
      { notes, totalPages, currentPage: page, totalCount },
      "Notes fetched successfully."
    );
  } catch (error) {
    errorResponse(res, (error as Error).message);
  }
};

// Get Note By ID
export const getNoteById = async (req: Request, res: Response) => {
  try {
    const note = await noteService.getNoteById(Number(req.params.id));
    if (!note) {
      return errorResponse(res, "Note not found.");
    }
    const responseNote: NoteResponseDTO = {
      id: note.id,
      title: note.title,
      content: note.content,
      createdAt: note.createdAt,
    };
    successResponse(res, responseNote, "Note fetched successfully.");
  } catch (error) {
    errorResponse(res, (error as Error).message);
  }
};

// Search Notes
// Search Notes
export const searchNotes = async (req: Request, res: Response) => {
  try {
    const query = req.query.search as string || ''; // kata kunci pencarian
    const startDate = req.query.startDate as string || ''; // tanggal mulai
    const endDate = req.query.endDate as string || ''; // tanggal akhir
    const sortOrder = (req.query.sort as 'ASC' | 'DESC') ?? 'DESC'; // urutan sort (ASC / DESC)
    const categoryId = req.query.categoryId ? Number(req.query.categoryId) : undefined; // kategori (opsional)

    // Pencarian catatan
    const notes = await noteService.searchNotes(query, startDate, endDate, sortOrder, categoryId);

    if (notes.length === 0) {
      return errorResponse(res, 'No notes found.', 404);
    }

    successResponse(res, notes, 'Notes fetched successfully.');
  } catch (error) {
    errorResponse(res, (error as Error).message);
  }
};


// Update Note
export const updateNote = async (req: Request, res: Response) => {
  try {
    const data: UpdateNoteDTO = req.body;
    const { affectedRows } = await noteService.updateNote(
      Number(req.params.id),
      data
    );
    successResponse(res, { affectedRows }, "Note updated successfully.");
  } catch (error) {
    errorResponse(res, (error as Error).message);
  }
};

// Delete Note
export const deleteNote = async (req: Request, res: Response) => {
  try {
    const note = await noteService.deleteNote(Number(req.params.id));
    successResponse(res, note, "Note deleted successfully.");
  } catch (error) {
    errorResponse(res, (error as Error).message);
  }
};

// Pin or Unpin Note
export const pinNote = async (req: Request, res: Response) => {
  try {
    const { is_pinned } = req.body;

    // Validasi is_pinned
    if (typeof is_pinned !== "boolean") {
      return errorResponse(res, "is_pinned must be a boolean value.", 400);
    }

    // Update status pinning
    const note = await noteService.pinNote(Number(req.params.id), is_pinned);
    successResponse(
      res,
      note,
      `Note ${is_pinned ? "pinned" : "unpinned"} successfully.`
    );
  } catch (error) {
    errorResponse(res, (error as Error).message);
  }
};
