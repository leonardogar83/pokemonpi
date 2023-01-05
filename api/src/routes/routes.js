const { Router } = require("express");
const axios = require("axios");
const {
  getPokemons,
  getTypes,
  getPokemonId,
  postPokemon,
  deletePokemon,
  updatePokemon,
} = require("../controllers/controllers");

const routes = Router();

routes.get("/pokemons", getPokemons);

routes.get("/pokemons/:idPokemon", getPokemonId);

routes.delete("/pokemons/:idPokemon", deletePokemon);

routes.put("/pokemons/:idPokemon", updatePokemon);
routes.get("/types", getTypes);

routes.post("/pokemons", postPokemon);

module.exports = routes;
