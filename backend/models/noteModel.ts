import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import Category from './categoryModel'; 

class Note extends Model {
  public id!: number;
  public title!: string;
  public content!: string;
  public is_deleted!: boolean;
  public is_pinned!: boolean;
  public is_archived!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;
  public categoryId!: number; 
}

Note.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    is_pinned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_archived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull:false,
      references: {
        model: 'categories',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'notes',
  }
);

Note.belongsTo(Category, { foreignKey: 'categoryId' });

export default Note;
