const { Sequelize } = require("sequelize");
// const User = require("./UserModel.js");
require("dotenv").config();
const sequelize = new Sequelize(
  process.env.DEV_SQL_DBNAME,
  process.env.DEV_SQL_USERNAME,
  process.env.DEV_SQL_PASSWORD,
  {
    host: process.env.DEV_SQL_HOSTNAME,
    dialect: "sqlite",
    define: {
      timestamps: false,
      freezeTableName: true,
    },
  }
);
async function mainConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
(async () => {
  await sequelize.sync();
  // Code here
})();
const User = require("./UserModel.js")(sequelize, Sequelize);
const Folder = require("./folderModel.js")(sequelize, Sequelize);
const StorageModel = require("./storageModel.js")(sequelize, Sequelize);
// User.hasMany(Folder, { foreignKey: "created_by" });
// Folder.belongsTo(User, { foreignKey: "created_by" });
mainConnection();
module.exports = { User, Folder, StorageModel };
