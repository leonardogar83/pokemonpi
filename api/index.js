const sequelize = require("./src/database/db.js");
const app = require("./app.js");
require("./src/models/pokemon.js");
require("./src/models/types.js");
require("./src/models/newpokemons.js");
require("./src/routes/routes.js");
const PORT = 4000;

async function main() {
  try {
    await sequelize
      .authenticate()
      .then(() => console.log("conexion OK"))
      .catch((e) => e.message);
    await sequelize.sync({ force: true });
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
}

main();
