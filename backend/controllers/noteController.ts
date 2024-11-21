import { Request, Response } from "express";
import noteService from "../services/noteService";
import { successResponse, errorResponse } from "../utils/responseHelper";
import { CreateNoteDTO, UpdateNoteDTO, NoteResponseDTO } from "../dtos/noteDTO";

// Create Note
export const createNote = async (req: Request, res: Response) => {
  try {
    const data: CreateNoteDTO = req.body;

    // Validation ID
    if (!data.categoryId) {
      return errorResponse(res, "categoryId is required.", 400);
    }

    const note = await noteService.createNote(data);
    successResponse(res, note, "Note created successfully.");
  } catch (error) {
    errorResponse(res, (error as Error).message);
  }
};

// Get All Notes
export const getAllNotes = async (req: Request, res: Response) => {
  try {

    const { notes } = await noteService.getAllNotes();

    successResponse(
      res,
      { notes },
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
      is_archived: note.is_archived,
      is_pinned: note.is_pinned,
      createdAt: note.createdAt,
    };
    successResponse(res, responseNote, "Note fetched successfully.");
  } catch (error) {
    errorResponse(res, (error as Error).message);
  }
};

//Get Note By Category
export const getNoteByCategory = async (req: Request, res: Response) => {
  try {
    const notes = await noteService.getNoteByCategory(Number(req.params.id));
    successResponse(res, notes, "Notes fetched successfully.");
  } catch (error) {
    errorResponse(res, (error as Error).message);
  }
}
//Get Notes by isPinned
export const getNotesByIsPinned = async (req: Request, res: Response) => {
  try {
    const notes = await noteService.getNotesByIsPinned();
    successResponse(res, notes, "Notes fetched successfully.");
  } catch (error) {
    errorResponse(res, (error as Error).message);
  }
}
// Search Notes
export const searchNotes = async (req: Request, res: Response) => {
  try {
    const query = req.query.search as string || ''; // kata kunci pencarian
    const startDate = req.query.startDate as string || ''; // tanggal mulai
    const endDate = req.query.endDate as string || ''; // tanggal akhir
    const sortOrder = (req.query.sort as 'ASC' | 'DESC') ?? 'DESC'; // urutan sort (ASC / DESC)
    const categoryId = req.query.categoryId ? Number(req.query.categoryId) : undefined; // kategori (opsional)

    
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

// Archive or Unarchive Note
export const archiveNote = async (req: Request, res: Response) => {
  try {
    const { is_archived } = req.body;

    // Validasi is_archived
    if (typeof is_archived !== "boolean") {
      return errorResponse(res, "is_archived must be a boolean value.", 400);
    }

    // Update status arsip
    const note = await noteService.archiveNote(Number(req.params.id), is_archived);
    successResponse(
      res,
      note,
      `Note ${is_archived ? "archived" : "unarchived"} successfully.`
    );
  } catch (error) {
    errorResponse(res, (error as Error).message);
  }
};
