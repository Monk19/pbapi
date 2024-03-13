const express = require("express");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("image file in storege-->", file);
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    console.log(file.originalname.split(".")[1]);
    cb(
      null,
      file.fieldname +
        "-" +
        uniqueSuffix +
        "." +
        file.originalname.split(".")[1]
    );
  },
});
const upload = multer({ storage: storage });

const {
  createbucket,
  createObject,
} = require("../controllers/s3bucketcreationControllers/bucketController");
const router = express.Router();
router.post("/", upload.single("myfile"), createbucket);
router.post("/uploadfile", upload.single("myfile"), createObject);
module.exports = router;
