const Sequelize = require("sequelize");
const { db } = require("../../config.js");

const sequelize = new Sequelize(
  `postgres://${db.user}:${db.password}@${db.host}:${db.port}/${db.database}`,
  {
    logging: false,
  }
);

module.exports = sequelize;
