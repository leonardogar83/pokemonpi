const axios = require("axios");
const newPokemon = require("../models/newpokemons.js");
const pokemonTypes = require("../models/types.js");
const sequelize = require("sequelize");

const getPokemons = async (req, res) => {
  let pokeName = req.query.name;
  let height, id, name, sprites, stats, types, weight;
  let pokemones = [];
  let pokemon = [];

  try {
    if (pokeName) {
      let dbexits = await newPokemon.findAll({ where: { name: pokeName } });
      if (dbexits.length !== 0) {
        height = dbexits[0].dataValues.height;
        id = dbexits[0].dataValues.id;
        name = dbexits[0].dataValues.name;
        sprites = dbexits[0].dataValues.img;
        stats = {
          attack: dbexits[0].dataValues.attack,
          defense: dbexits[0].dataValues.defense,
          speed: dbexits[0].dataValues.speed,
        };
        if (dbexits[0].dataValues.type2) {
          types = {
            type1: dbexits[0].dataValues.type1,
            type2: dbexits[0].dataValues.type2,
          };
        } else {
          types = { type1: dbexits[0].dataValues.type1 };
        }
        weight = dbexits[0].dataValues.weight;
        pokemon.push({ height, id, name, sprites, stats, types, weight });
        setTimeout(() => res.json(pokemon), 2000);
      } else {
        await axios
          .get(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
          .then((resp) => {
            height = resp.data.height;
            id = resp.data.id;
            name = resp.data.name;
            sprites = resp.data.sprites.other.home.front_default;
            stats = {
              attack: resp.data.stats[1].base_stat,
              defense: resp.data.stats[2].base_stat,
              speed: resp.data.stats[5].base_stat,
            };
            if (resp.data.types.length === 2) {
              types = {
                type1: resp.data.types[0].type.name,
                type2: resp.data.types[1].type.name,
              };
            } else {
              types = { type1: resp.data.types[0].type.name };
            }
            weight = resp.data.weight;
            console.log({ height, id, name, sprites, stats, types, weight });
            pokemon.push({ height, id, name, sprites, stats, types, weight });
            setTimeout(() => res.json(pokemon), 1000);
          })
          .catch((err) => {
            res
              .status(404)
              .json({ message: `No existe el pokemon con nombre ${pokeName}` });
          });
      }
    } else {
      let DATA;
      let DATADB = await newPokemon.findAll();
      await axios
        .get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=40")
        .then((response) => {
          DATA = response.data.results;
          console.log(DATA);
        })
        .then(() => {
          DATA.forEach(async function (element) {
            await axios.get(element.url).then((resp) => {
              //height = resp.data.height;
              id = resp.data.id;
              name = resp.data.name;
              sprites = resp.data.sprites.other.home.front_default;
              //stats = {
              //attack: resp.data.stats[1].base_stat,
              //defense: resp.data.stats[2].base_stat,
              //speed: resp.data.stats[5].base_stat,
              //};
              if (resp.data.types.length === 2) {
                types = {
                  type1: resp.data.types[0].type.name,
                  type2: resp.data.types[1].type.name,
                };
              } else {
                types = { type1: resp.data.types[0].type.name };
              }
              //weight = resp.data.weight;

              console.log({ id, name, sprites, types });
              pokemones.push({ id, name, sprites, types });
            });
          });
        })

        .then(() => {
          if (DATADB.length !== 0) {
            DATADB.forEach(function (elem) {
              //height = DATADB[0].dataValues.height;
              id = elem.dataValues.id;
              name = elem.dataValues.name;
              sprites = elem.dataValues.sprites;
              //stats = {
              //attack: dbexits[0].dataValues.attack,
              //            defense: dbexits[0].dataValues.defense,
              //          speed: dbexits[0].dataValues.speed,
              //      };
              if (elem.type2) {
                types = {
                  type1: elem.dataValues.type1,
                  type2: elem.dataValues.type2,
                };
              } else {
                types = { type1: elem.dataValues.type1 };
              }
              //weight = dbexits[0].dataValues.weight;
              pokemones.push({ id, name, sprites, types });
            });
          }
        });

      setTimeout(() => res.json(pokemones), 3000);
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getId = async (URL) => {
  let resp;
  await axios.get(URL).then((response) => {
    console.log(response.data.id);
    resp = { id: response.data.id, name: response.data.name };
  });
  return resp;
};

const getTypes = async (req, res) => {
  let typesGet = await pokemonTypes.findAll({ order: ["id"] });
  console.log(typesGet);
  console.log(typesGet.length);
  if (typesGet.length === 0) {
    const URLTypes = "https://pokeapi.co/api/v2/type";
    let datosTipos;

    await axios.get(URLTypes).then((response) => {
      datosTipos = response.data.results;
    });
    console.log(datosTipos);

    let name;
    let id;
    let respuesta = [];

    datosTipos.map(async ({ name, url }) => {
      //let URL = element.url
      let respLoop;

      await getId(url).then((response) => {
        console.log("respuesta del getID ", response);
        ({ id, name } = response);
        respLoop = { id: id, type_name: name };
        pokemonTypes.create({ id: id, type_name: name });
      });
    });
    setTimeout(async () => {
      respuesta = await pokemonTypes.findAll({ order: ["id"] });
      res.json(respuesta);
    }, 1000);
  } else {
    res.json(typesGet);
  }
};
const getPokemonId = async (req, res) => {
  let height, id, name, sprites, stats, types, weight;
  let pokeBase;
  let pokemon = [];

  const idPokemon = req.params.idPokemon;
  try {
    if (idPokemon[0] === "A") {
      pokeBase = await newPokemon.findAll({ where: { id: idPokemon } });
      if (pokeBase.length !== 0) {
        console.log(pokeBase);
        height = pokeBase[0].dataValues.height;
        console.log(height);
        id = pokeBase[0].dataValues.id;
        name = pokeBase[0].dataValues.name;
        sprites = pokeBase[0].dataValues.sprites;
        stats = {
          attack: pokeBase[0].dataValues.attack,
          defense: pokeBase[0].dataValues.defense,
          speed: pokeBase[0].dataValues.speed,
        };
        if (pokeBase[0].dataValues.type2) {
          types = {
            type1: pokeBase[0].dataValues.type1,
            type2: pokeBase[0].dataValues.type2,
          };
        } else {
          types = { type1: pokeBase[0].dataValues.type1 };
        }
        weight = pokeBase[0].dataValues.weight;

        pokemon.push({ height, id, name, sprites, stats, types, weight });
        setTimeout(() => res.json(pokemon), 2000);
      }
    } else {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)
        .then((resp) => {
          height = resp.data.height;
          id = resp.data.id;
          name = resp.data.name;
          sprites = resp.data.sprites.other.home.front_default;
          stats = {
            attack: resp.data.stats[1].base_stat,
            defense: resp.data.stats[2].base_stat,
            speed: resp.data.stats[5].base_stat,
          };
          if (resp.data.types.length === 2) {
            types = {
              type1: resp.data.types[0].type.name,
              type2: resp.data.types[1].type.name,
            };
          } else {
            types = { type1: resp.data.types[0].type.name };
          }
          weight = resp.data.weight;

          pokemon.push({ height, id, name, sprites, stats, types, weight });
          setTimeout(() => res.json(pokemon), 1000);
        })
        .catch((err) => {
          res.json({ message: err.message });
        });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

const postPokemon = async (req, res) => {
  let {
    id,
    name,
    attack,
    defense,
    speed,
    height,
    weight,
    sprites,
    type1,
    type2,
  } = req.body;

  id = "A" + id;

  await newPokemon
    .create({
      id,
      name,
      attack,
      defense,
      speed,
      height,
      weight,
      sprites,
      type1,
      type2,
    })
    .then(() =>
      res.json({
        id,
        name,
        attack,
        defense,
        speed,
        height,
        weight,
        sprites,
        type1,
        type2,
      })
    )
    .catch((err) =>
      res.status(400).json({ message: "Ya existe el Pokemon con esa ID" })
    );
  // } catch (error) {
  //   res.status(400).json({ message: error.message });
  // }
};

const deletePokemon = async (req, res) => {
  try {
    const { idPokemon } = req.params;

    await newPokemon.destroy({
      where: { id: idPokemon },
    });

    res.json({ message: `Pokemon con ID ${idPokemon} ha sido borrado` });
  } catch (error) {
    res.json({ message: error.message });
  }
};

const updatePokemon = async (req, res) => {
  const { idPokemon } = req.params;

  const { name, attack, defense, speed, height, weight, type1, type2 } =
    req.body;

  const pokeUpdate = await newPokemon.findByPk(idPokemon);

  pokeUpdate.name = name;
  pokeUpdate.attack = attack;
  pokeUpdate.defense = defense;
  pokeUpdate.speed = speed;
  pokeUpdate.height = height;
  pokeUpdate.weight = weight;
  pokeUpdate.type1 = type1;
  pokeUpdate.type2 = type2;
  await pokeUpdate.save();

  res.json({ message: `Se actualizó el Pokemon con ID: ${idPokemon}` });
};

module.exports = {
  getPokemons,
  getTypes,
  getPokemonId,
  postPokemon,
  deletePokemon,
  updatePokemon,
};
