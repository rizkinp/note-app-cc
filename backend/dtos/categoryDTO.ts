import { CreationAttributes } from "sequelize";
import Note from "../models/noteModel";

export interface CreateCategoryDTO extends CreationAttributes<Note> {
    name: string;
}
export interface CategoriesResponseDTO {
    id: number;
    name: string;
    createdAt: Date;
}