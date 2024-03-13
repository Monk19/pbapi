const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const StorageModel = sequelize.define("storage", {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    total_storage: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    used_space: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    stroage_space_left: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });
  return StorageModel;
};
