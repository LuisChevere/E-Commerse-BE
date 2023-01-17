const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init(
  {
    // defines columns
    id: {
      type: DataTypes.INTEGER,
      allowNULL: false,
      primaryKey: true,
      autoIncrement: true
    },
    Category_name: {
      type: DataTypes.STRING,
      allowNULL: false
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
