import { Request, Response } from "express";
import noteService from "../services/noteService";
import { successResponse, errorResponse } from "../utils/responseHelper";
import { CreateNoteDTO, UpdateNoteDTO, NoteResponseDTO } from "../dtos/noteDTO";
import exp from "constants";

// Create Note
export const createNote = async (req: Request, res: Response) => {
  try {
    const data: CreateNoteDTO = req.body;
    const userId = req.userId;

    if (!userId) {
      return errorResponse(res, "User not authenticated.");
    }

    // Buat catatan baru
    const note = await noteService.createNote(userId, data);

    // Ambil semua catatan pengguna setelah catatan baru dibuat
    const { notes } = await noteService.getAllNotes(userId);

    // Kirimkan respons dengan data gabungan
    successResponse(
      res,
      { createdNote: note, allNotes: notes },
      "Note created and all notes fetched successfully."
    );
  } catch (error) {
    errorResponse(res, (error as Error).message);
  }
};

//Get All Notes
export const getAllNotes = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;  
    if (!userId) {
      return errorResponse(res, "User not authenticated.");
    }
    const notes = await noteService.getAllNotes(userId);
    successResponse(res, notes, "Notes fetched successfully.");
  } catch (error) {
    errorResponse(res, (error as Error).message);
  }
}

// Get Note By ID
export const getNoteById = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return errorResponse(res, "User not authenticated.");
    }
    const note = await noteService.getNoteById(userId, Number(req.params.id));
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

// Get Notes By Category
export const getNotesByCategory = async (req: Request, res: Response) => {
  try {
    const userId = req.userId; 
    if (!userId) {
      return errorResponse(res, "User not authenticated.");
    }
    const notes = await noteService.getNotesByCategory(userId, Number(req.params.id));
    successResponse(res, notes, "Notes fetched successfully.");
  } catch (error) {
    errorResponse(res, (error as Error).message);
  }
};

// Get Notes by isPinned
export const getNotesByIsPinned = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return errorResponse(res, "User not authenticated.");
    }
    const notes = await noteService.getNotesByIsPinned(userId);
    successResponse(res, notes, "Notes fetched successfully.");
  } catch (error) {
    errorResponse(res, (error as Error).message);
  }
};

// Get Notes by isArchived
export const getNotesByIsArchived = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return errorResponse(res, "User not authenticated.");
    }
    const notes = await noteService.getNotesByIsArchived(userId);
    successResponse(res, notes, "Notes fetched successfully.");
  } catch (error) {
    errorResponse(res, (error as Error).message);
  }
};

// Search Notes
export const searchNotes = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;  
    if (!userId) {
      return errorResponse(res, "User not authenticated.");
    }
    const query = req.query.search as string || ''; // Kata kunci pencarian
    const sortOrder = (req.query.sortOrder as 'ASC' | 'DESC') || 'DESC'; // Urutan sort (ASC/DESC)
    const dateFilter = req.query.dateFilter as 'newest' | 'oldest' | undefined; // Filter berdasarkan tanggal

    // Memanggil fungsi searchNotes dari service
    const notes = await noteService.searchNotes(userId, query, sortOrder, dateFilter);

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
    const userId = req.userId;
    if (!userId) {
      return errorResponse(res, "User not authenticated.");
    }
    const data: UpdateNoteDTO = req.body;
    const { affectedRows } = await noteService.updateNote(userId, Number(req.params.id), data);
    successResponse(res, { affectedRows }, "Note updated successfully.");
  } catch (error) {
    errorResponse(res, (error as Error).message);
  }
};

// Delete Note
export const deleteNote = async (req: Request, res: Response) => {
  try {
    const userId = req.userId; 
    if (!userId) {
      return errorResponse(res, "User not authenticated.");
    }
    const note = await noteService.deleteNote(userId, Number(req.params.id));
    successResponse(res, note, "Note deleted successfully.");
  } catch (error) {
    errorResponse(res, (error as Error).message);
  }
};

// Delete All Notes
export const deleteAllNotes = async (req: Request, res: Response) => {
  try {
    const userId = req.userId; 
    if (!userId) {
      return errorResponse(res, "User not authenticated.");
    }
    const notes = await noteService.deleteAllNotes(userId);
    successResponse(res, notes, "All notes deleted successfully.");
  } catch (error) {
    errorResponse(res, (error as Error).message);
  }
};

// Pin or Unpin Note
export const pinNote = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return errorResponse(res, "User not authenticated.");
    }
    const { is_pinned } = req.body;

    // Validasi is_pinned
    if (typeof is_pinned !== "boolean") {
      return errorResponse(res, "is_pinned must be a boolean value.", 400);
    }

    // Update status pinning
    const note = await noteService.pinNote(userId, Number(req.params.id), is_pinned);
    successResponse(res, note, `Note ${is_pinned ? "pinned" : "unpinned"} successfully.`);
  } catch (error) {
    errorResponse(res, (error as Error).message);
  }
};

// Archive or Unarchive Note
export const archiveNote = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return errorResponse(res, "User not authenticated.");
    }
    const { is_archived } = req.body;

    // Validasi is_archived
    if (typeof is_archived !== "boolean") {
      return errorResponse(res, "is_archived must be a boolean value.", 400);
    }

    // Update status arsip
    const note = await noteService.archiveNote(userId, Number(req.params.id), is_archived);
    successResponse(res, note, `Note ${is_archived ? "archived" : "unarchived"} successfully.`);
  } catch (error) {
    errorResponse(res, (error as Error).message);
  }
};
