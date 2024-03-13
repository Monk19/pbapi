const express = require("express");
const router = express.Router();
const {
  createFolder,
  shareFolder,
  getMyFolders,
} = require("../controllers/folderControllers/folderController");
router.post("/", createFolder);
router.post("/share", shareFolder);
router.post("/myfolders", getMyFolders);
module.exports = router;
