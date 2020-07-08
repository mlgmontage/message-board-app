const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "../db/messagesDB.sqlite",
});

module.exports = sequelize;
