const User = require("./UserModel");
module.exports = (sequilize, DataTypes) => {
  const Folder = sequilize.define("folder", {
    folder_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    folder_name: {
      type: DataTypes.STRING(255),
    },
    folder_size: {
      type: DataTypes.INTEGER,
    },
    folder_is_shared: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    folder_createby: {
      type: DataTypes.INTEGER,
    },
    folder_shared_to: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    folder_createdDate: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    folder_is_deletable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
  return Folder;
};
