import { Op } from "sequelize";
import { CreateNoteDTO, UpdateNoteDTO } from "../dtos/noteDTO";
import Note from "../models/noteModel";

class NoteService {
  // Create Note
  async createNote(data: CreateNoteDTO) {
    if (!data.categoryId) {
      throw new Error("categoryId is required.");
    }
    return await Note.create(data);
  }

  // Get All Notes
  async getAllNotes() {
    const notes = await Note.findAll({
      where: { is_deleted: false, is_archived: false },
      order: [["createdAt", "DESC"]],
    });

    return { notes };
  }

  //Get Note by Category
  async getNotesByCategory(categoryId: number) {
    return await Note.findAll({
      where: { categoryId,is_archived: false, is_deleted: false },
      order: [["createdAt", "DESC"]],
    });
  }

  // Get Note by ID
  async getNoteById(id: number) {
    return await Note.findByPk(id);
  }

  //Get Notes by isPinned
  async getNotesByIsPinned() {
    return await Note.findAll({
      where: { is_pinned : true, is_deleted: false },
      order: [["createdAt", "DESC"]],
    });
  }

  async getNotesByIsArchived() {
    return await Note.findAll({
      where: { is_archived : true, is_deleted: false },
      order: [["createdAt", "DESC"]],
    });
  }

  // Search Notes
  async searchNotes(
    query: string,
    sortOrder: 'ASC' | 'DESC',
    dateFilter?: 'newest' | 'oldest'
  ) {
    const whereCondition: any = { is_deleted: false, is_archived: false };
    if (query) {
      whereCondition[Op.or] = [
        { title: { [Op.like]: `%${query}%` } },
        { content: { [Op.like]: `%${query}%` } },
      ];
    }
    let order: [string, string][] = [];
    
    if (dateFilter === 'newest') {
      order.push(['createdAt', 'DESC']);
    } else if (dateFilter === 'oldest') {
      order.push(['createdAt', 'ASC']);
    } else {
      order.push(['title', sortOrder]);
    }
  
    return await Note.findAll({
      where: whereCondition,
      order: order,
    });
  }

  // Update Note
  async updateNote(id: number, data: UpdateNoteDTO) {
    const [affectedRows] = await Note.update(data, { where: { id } });
    if (affectedRows === 0) {
      throw new Error("Note not found or not updated.");
    }
    return { affectedRows };
  }

  // Soft Delete Note by ID
  async deleteNote(id: number) {
    return await Note.update({ is_deleted: true }, { 
      where: { id, is_archived: true },
    });
  }

  //Soft delete Notes ALL
  async deleteAllNotes() {
    return await Note.update({ is_deleted: true }, { where: { is_archived: true } });
  }

  // Pin or Unpin Note
  async pinNote(id: number, isPinned: boolean) {
    try {
      return await Note.update({ is_pinned: isPinned }, { where: { id } });
    } catch (error) {
      throw new Error("Error pinning or unpinning the note.");
    }
  }

  // Archive or Unarchive Note
  async archiveNote(id: number, isArchived: boolean) {
    try {
      return await Note.update({ is_archived: isArchived, is_pinned: false }, { where: { id } });
    } catch (error) {
      throw new Error("Error archiving or unarchiving the note.");
    }
  }
}

export default new NoteService();
