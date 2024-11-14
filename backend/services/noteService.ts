import Note from "../models/noteModel";

class NoteService {
  async createNote(data: { title: string; content: string }) {
    return await Note.create(data);
  }

  async getAllNotes() {
    return await Note.findAll({
      where: { is_deleted: false },
      order: [["createdAt", "DESC"]],
    });
  }

  async getNoteById(id: number) {
    return await Note.findByPk(id);
  }

  async updateNote(id: number, data: { title: string; content: string }) {
    return await Note.update(data, { where: { id } });
  }

  async deleteNote(id: number) {
    return await Note.update({ is_deleted: true }, { where: { id } });
  }
}

export default new NoteService();
