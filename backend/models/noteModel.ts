import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

interface NoteAttributes {
  id?: number;
  title: string;
  content: string;
  is_deleted?: boolean;
}

class Note extends Model<NoteAttributes> {}

Note.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'Note',
    tableName: 'notes',
    timestamps: true,
  }
);

export default Note;
