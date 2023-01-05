const { DataTypes } = require("sequelize");
const sequelize = require("../database/db.js");

const pokemonTypes = sequelize.define(
  "pokemon_types",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    type_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = pokemonTypes;
