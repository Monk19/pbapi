const express = require("express");
const jwt = require("jsonwebtoken");
var bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const multer = require("multer");

const app = express();
const port = process.env.PORT || 3402;
const cors = require("cors");
const saltRounds = 10;
const { User } = require("./models/sqlConnection");
const folderManagementRoutes = require("./routes/folderManagementRoute");
// const {User} = require("./models/UserModel");
const buckHandlimgRoutes = require("./routes/bucketHandelingRoutes");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
// multer
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

// parse application/json
app.use("/folder", folderManagementRoutes);
app.use("/bucket", buckHandlimgRoutes);
app.get("/", (req, res) => {
  res.send({ message: "server request received" });
});
app.post("/api/login", async (req, res) => {
  console.log("data", req.body);
  const { userName, password } = req.body;
  const checkUser = await User.findOne({
    where: { email: userName },
  });
  console.log("login details of user-->", checkUser);
  const checkMatch = await bcrypt.compare(password, checkUser.password);
  console.log("check password", checkMatch);
  let payload = {
    userId: checkUser.user_id,
    userName: checkUser.email,
  };
  if (checkMatch) {
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: 120,
    });

    res.setHeader("Authorization", `Barer ${token}`);

    res.send({
      message: "request for login",
      accessToken: token,
      uId: checkUser.user_id,
      email: checkUser.email,
      name: checkUser.username,
    });
  }
});
app.get("/checkauth", (req, res) => {
  const token = req.header("authorization").split(" ")[1];
  console.log("verifying auth token", token);
  try {
    const verify = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("jwt verification time check-->", verify);
    if (!verify) {
      res.status(504).send({ message: "Your session has timed out" });
    } else {
      res.status(200).send({ message: "Authorized" });
    }
  } catch (err) {
    console.log(err);
    res.send({ message: err, status: false });
  }
  res.send({ message: "fail" });
});
app.post("/register", async (req, res) => {
  console.log(req.body);
  const {
    email,
    password,
    user_type_id,
    mobile,
    first_name,
    last_name,
    whatsappNotification,
  } = req.body;
  const checkUser = await User.findOne({
    where: { email: email },
  });
  console.log("Does user request---->", checkUser);
  // User.drop();
  if (checkUser) {
    res.status(504).send({ message: "User already exists" });
  } else {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      console.log("Hased password--->", hash);
      User.create({
        username: first_name + last_name,
        first_name,
        last_name,
        email,
        mobile,
        password: hash,
        whatsappNotification,
      })
        .then((result) => {
          console.log("created tabel==>", result);
          res.send({ message: "user created" }).status(200);
        })
        .catch((err) => {
          console.log(err);
          res.send({ message: "User already exists" }).status(200);
        });
    });
  }
  const users = await User.findAll();
  console.log(users.every((user) => user instanceof User)); // true
  console.log("All users:", JSON.stringify(users, null, 2));
  // await newUser
  //   .save()
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  // res.send({ message: "request for login" });
  // res.send({ message: JSON.stringify(users, null, 2) });
});
app.get("/mystorage", (req, res) => {
  console.log("get My storage---->", req.body);
});
app.listen(3402, () => {
  console.log(`Server at http://localhost:${port}`);
});
