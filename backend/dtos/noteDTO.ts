import { CreationAttributes } from 'sequelize';
import Note from '../models/noteModel';

export interface CreateNoteDTO extends CreationAttributes<Note> {
  title: string;
  content: string;
  categoryId: number;
}

export interface UpdateNoteDTO {
  title: string;
  content: string;
}

export interface NoteResponseDTO {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
}
