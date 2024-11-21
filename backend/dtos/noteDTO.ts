import { CreationAttributes } from 'sequelize';
import Note from '../models/noteModel';

export interface CreateNoteDTO extends CreationAttributes<Note> {
  title: string;
  content: string;
  categoryId: number;
  is_pinned?: boolean;
  is_archived?: boolean;
}

export interface UpdateNoteDTO {
  title: string;
  content: string;
  categoryId: number;
  is_pinned?: boolean;
  is_archived?: boolean;
}

export interface NoteResponseDTO {
  id: number;
  title: string;
  content: string;
  is_pinned: boolean;
  is_archived: boolean;
  createdAt: Date;
}
