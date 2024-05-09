"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, { foreignKey: "user_id" });
      Order.belongsTo(models.Book, { foreignKey: "book_id" });
    }
  }
  Order.init(
    {
      user_id: DataTypes.INTEGER,
      book_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      order_date: DataTypes.DATEONLY,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
