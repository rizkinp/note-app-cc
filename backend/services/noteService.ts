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
  async getAllNotes(limit: number, offset: number) {
    const notes = await Note.findAll({
      where: { is_deleted: false },
      order: [["createdAt", "DESC"]],
      limit,
      offset,
    });

    const totalCount = await Note.count({
      where: { is_deleted: false },
    });

    return { notes, totalCount };
  }

  // Get Note by ID
  async getNoteById(id: number) {
    return await Note.findByPk(id);
  }

  // Get Notes by Category
  async getNotesByCategory(categoryId: number) {
    return await Note.findAll({
      where: { categoryId, is_deleted: false },
      order: [["createdAt", "DESC"]],
    });
  }

  // Search Notes
  async searchNotes(
    query: string,
    startDate: string,
    endDate: string,
    sortOrder: 'ASC' | 'DESC',
    categoryId?: number // Menambahkan filter berdasarkan kategori, opsional
  ) {
    const whereCondition: any = { is_deleted: false };
  
    // Filter berdasarkan kata kunci di title dan content
    if (query) {
      whereCondition[Op.or] = [
        { title: { [Op.like]: `%${query}%` } },
        { content: { [Op.like]: `%${query}%` } },
      ];
    }
  
    // Filter berdasarkan tanggal (startDate dan endDate)
    if (startDate && !isNaN(Date.parse(startDate))) {
      whereCondition.createdAt = {
        [Op.gte]: new Date(startDate), // Tanggal mulai
      };
    }
    if (endDate && !isNaN(Date.parse(endDate))) {
      whereCondition.createdAt = {
        [Op.lte]: new Date(endDate), // Tanggal sampai
      };
    }
  
    // Filter berdasarkan kategori (jika ada)
    if (categoryId) {
      whereCondition.categoryId = categoryId;
    }
  
    // Mencari data berdasarkan kondisi
    return await Note.findAll({
      where: whereCondition,
      order: [['createdAt', sortOrder]], // Urutkan berdasarkan createdAt sesuai sortOrder
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

  // Soft Delete Note
  async deleteNote(id: number) {
    return await Note.update({ is_deleted: true }, { where: { id } });
  }

  // Pin or Unpin Note
  async pinNote(id: number, isPinned: boolean) {
    try {
      return await Note.update({ is_pinned: isPinned }, { where: { id } });
    } catch (error) {
      throw new Error("Error pinning or unpinning the note.");
    }
  }
}

export default new NoteService();
