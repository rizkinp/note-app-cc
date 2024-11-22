import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db";
import Category from "./categoryModel"; // Import Category model
import User from "./userModel"; // Import User model

class Note extends Model {
  public id!: number;
  public title!: string;
  public content!: string;
  public is_deleted!: boolean;
  public is_pinned!: boolean;
  public is_archived!: boolean;
  public categoryId!: number;  // Foreign key for Category
  public userId!: number;  // Foreign key for User
  public createdAt!: Date;
  public updatedAt!: Date;
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
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "categories",
        key: "id",
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",  // Foreign key to users table
        key: "id",
      },
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
  },
  {
    sequelize,
    tableName: "notes",
  }
);

// Define relationships
Note.belongsTo(Category, { foreignKey: "categoryId" });
Note.belongsTo(User, { foreignKey: "userId" });

export default Note;
