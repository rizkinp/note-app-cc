import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import Category from './categoryModel'; // Import Category model

class Note extends Model {
  public id!: number;
  public title!: string;
  public content!: string;
  public is_deleted!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;
  public categoryId!: number; // Optional: Link to Category
  public is_pinned!: boolean;
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
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull:false,
      references: {
        model: 'categories',
        key: 'id',
      },
    },
    is_pinned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: 'notes',
  }
);

Note.belongsTo(Category, { foreignKey: 'categoryId' }); // One-to-many relationship with Category

export default Note;
