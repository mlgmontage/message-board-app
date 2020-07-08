const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./db");

const Messages = sequelize.define(
  "Messages",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Messages",
  }
);

module.exports = Messages;
