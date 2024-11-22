import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db";
import User from "./userModel"; // Import the User model

class Category extends Model {
  public id!: number;
  public name!: string;
  public is_deleted!: boolean;
  public is_pinned!: boolean;
  public userId!: number;  // Add userId field for the foreign key
  public createdAt!: Date;
  public updatedAt!: Date;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,  // userId is required
      references: {
        model: "users",  // Link to users table
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
    tableName: "categories",
  }
);

// Define relationship
Category.belongsTo(User, { foreignKey: "userId" });

export default Category;
