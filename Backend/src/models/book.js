"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book.hasMany(models.Order, { foreignKey: "book_id" });
      Book.hasMany(models.Review, { foreignKey: "book_id" });
    }
  }
  Book.init(
    {
      title: DataTypes.STRING,
      author: DataTypes.STRING,
      description: DataTypes.STRING,
      genre: DataTypes.STRING,
      release_date: DataTypes.DATEONLY,
      page_count: DataTypes.INTEGER,
      sold_count: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      image_url: DataTypes.BLOB,
    },
    {
      sequelize,
      modelName: "Book",
    }
  );
  return Book;
};
