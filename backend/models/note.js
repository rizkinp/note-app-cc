'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Note.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    is_deleted: DataTypes.BOOLEAN,
    is_pinned: DataTypes.BOOLEAN,
    is_archived: DataTypes.BOOLEAN,
    categoryId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Note',
  });
  return Note;
};