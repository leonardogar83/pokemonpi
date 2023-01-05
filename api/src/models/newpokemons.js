const { DataTypes } = require("sequelize");
const sequelize = require("../database/db.js");

const newPokemon = sequelize.define(
  "new_pokemon",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    attack: {
      type: DataTypes.INTEGER,
    },

    defense: {
      type: DataTypes.INTEGER,
    },

    speed: {
      type: DataTypes.INTEGER,
    },

    height: {
      type: DataTypes.INTEGER,
    },

    weight: {
      type: DataTypes.INTEGER,
    },

    sprites: {
      type: DataTypes.STRING,
    },
    type1: {
      type: DataTypes.STRING,
    },
    type2: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = newPokemon;
