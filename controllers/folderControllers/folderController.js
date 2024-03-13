const { json } = require("body-parser");
const { Folder } = require("../../models/sqlConnection");
const createFolder = async (req, res) => {
  console.log("Folder Creation requestDetails", req.body);
  const { folderName, createdBy, size } = req.body;
  try {
    Folder.create({
      folder_name: folderName,
      folder_createby: createdBy,
      folder_size: size,
    })
      .then((result) => {
        console.log("created tabel==>", result);
        //  res.send({ message: "user created" }).status(200);
      })
      .catch((err) => {
        console.log(err);
        //  res.send({ message: "User already exists" }).status(200);
      });
    // Folder.drop();

    const folders = await Folder.findAll();
    console.log(folders.every((user) => user instanceof Folder)); // true
    console.log("folders:", JSON.stringify(folders, null, 2));
    res.send({ message: "Space created", status: "ok" });
  } catch (err) {
    res.send({ message: "Space not created", status: "fail" });

    console.log(err);
  } finally {
    // const folders = Folder.findAll({});
    // console.log(folders);
  }
};
const getMyFolders = async (req, res) => {
  console.log("get my folders", req.body);
  const folders = await Folder.findAll({
    where: { folder_createby: req.body.id, folder_shared_to: 0 },
  });
  const shared = await Folder.findAll({
    where: { folder_shared_to: req.body.id },
  });
  res.send({
    message: "completd get my",
    data: { myFolders: folders, shareFolder: shared },
  });
};
const shareFolder = async (req, res) => {
  console.log("share folder", req.body);
  const { sharedTo, folderId, sharedby } = req.body;
  await Folder.update(
    { folder_shared_to: sharedTo },
    {
      where: { folder_createby: sharedby, folder_id: folderId },
    }
  );
  res.send({ message: "You are sharing your folder--->", bdy: req.body });
};

module.exports = {
  createFolder,
  shareFolder,
  getMyFolders,
};
