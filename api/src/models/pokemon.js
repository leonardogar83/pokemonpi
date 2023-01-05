const { DataTypes } = require("sequelize");
const sequelize = require("../database/db.js");

const pokemondata = sequelize.define(
  "pokemon_data",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = pokemondata;
