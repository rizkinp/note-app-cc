import { Op } from "sequelize";
import { CreateNoteDTO, UpdateNoteDTO } from "../dtos/noteDTO";
import Note from "../models/noteModel";

class NoteService {
  // Create Note
  async createNote(userId: number, data: CreateNoteDTO) {
    if (!data.categoryId) {
      throw new Error("categoryId is required.");
    }
    return await Note.create({
      ...data,
      userId,
    });
  }

  // Get All Notes
  async getAllNotes(userId: number) {
    const notes = await Note.findAll({
      where: { is_deleted: false, is_archived: false, userId },
      order: [["createdAt", "DESC"]],
    });

    return { notes };
  }

  //Get Note by Category
  async getNotesByCategory(userId: number, categoryId: number) {
    return await Note.findAll({
      where: { categoryId, is_archived: false, is_deleted: false, userId },
      order: [["createdAt", "DESC"]],
    });
  }

  // Get Note by ID
  async getNoteById(userId: number, id: number) {
    const note = await Note.findOne({
      where: { id, userId },
    });
    if (!note) {
      throw new Error("Note not found.");
    }
    return note;
  }

  //Get Notes by isPinned
  async getNotesByIsPinned(userId: number) {
    return await Note.findAll({
      where: { is_pinned: true, is_deleted: false, userId },
      order: [["createdAt", "DESC"]],
    });
  }

  async getNotesByIsArchived(userId: number) {
    return await Note.findAll({
      where: { is_archived: true, is_deleted: false, userId },
      order: [["createdAt", "DESC"]],
    });
  }

  // Search Notes
  async searchNotes(
    userId: number,
    query: string,
    sortOrder: "ASC" | "DESC",
    dateFilter?: "newest" | "oldest"
  ) {
    const whereCondition: any = {
      is_deleted: false,
      is_archived: false,
      userId,
    };
    if (query) {
      whereCondition[Op.or] = [
        { title: { [Op.like]: `%${query}%` } },
        { content: { [Op.like]: `%${query}%` } },
      ];
    }
    let order: [string, string][] = [];

    if (dateFilter === "newest") {
      order.push(["createdAt", "DESC"]);
    } else if (dateFilter === "oldest") {
      order.push(["createdAt", "ASC"]);
    } else {
      order.push(["title", sortOrder]);
    }

    return await Note.findAll({
      where: whereCondition,
      order: order,
    });
  }

  // Update Note
  async updateNote(userId: number, id: number, data: UpdateNoteDTO) {
    const [affectedRows] = await Note.update(data, { where: { id, userId } });
    if (affectedRows === 0) {
      throw new Error("Note not found or not updated.");
    }
    return { affectedRows };
  }

  // Soft Delete Note by ID
  async deleteNote(userId: number, id: number) {
    return await Note.update(
      { is_deleted: true, userId },
      {
        where: { id, is_archived: true },
      }
    );
  }

  //Soft delete Notes ALL
  async deleteAllNotes(userId: number) {
    return await Note.update(
      { is_deleted: true },
      { where: { is_archived: true, userId } }
    );
  }

  // Pin or Unpin Note
  async pinNote(userId: number, id: number, isPinned: boolean) {
    try {
      return await Note.update(
        { is_pinned: isPinned },
        { where: { id, userId } }
      );
    } catch (error) {
      throw new Error("Error pinning or unpinning the note.");
    }
  }

  // Archive or Unarchive Note
  async archiveNote(userId: number, id: number, isArchived: boolean) {
    try {
      return await Note.update(
        { is_archived: isArchived, is_pinned: false },
        { where: { id, userId } }
      );
    } catch (error) {
      throw new Error("Error archiving or unarchiving the note.");
    }
  }
}

export default new NoteService();
