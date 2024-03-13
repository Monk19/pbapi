const AWS = require("aws-sdk");
// endpoint ---> j2g0.or.idrivee2-78.com
// Create an S3 client for IDrive Cloud
const fs = require("fs");
const endpoint = new AWS.Endpoint("j2g0.or.idrivee2-78.com");
const config = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_S3_REGION,
};
let S3 = new AWS.S3(config);
const s3 = new AWS.S3({ endpoint: endpoint });

const createbucket = (req, res) => {
  const { bucketName } = req.body;
  const params = {
    Bucket: "my-bucket",
  };
  s3.createBucket(params, function (err, data) {
    if (err) {
      console.log("Error:", err);
    } else {
      console.log("Success:", data);
      // Success: {
      //   Location: "/";
      // }
    }
  });
  console.log("Create bucket");
};
const createObject = (req, res) => {
  console.log(__dirname + "/uploads/" + req.file.filename);
  const params = {
    Bucket: "my-bucket", //bucketName
    // Key: "my-object", //FIle Name
    // Body: new fs.createReadStream("uploads/" + req.file.filename),
  };
  //   s3.putObject(params, function (err, data) {
  //     if (err) {
  //       console.log("Error:", err);
  //     } else {
  //       console.log("Success:", data);
  //     //    {
  //     //      ETag: '"4346de93feb2de061f978d0baa079316"';
  //     //    }
  //     }
  //   });
  s3.headBucket(params, function (err, data) {
    if (err) {
      console.log("Error:", err);
    } else {
      console.log("Success:", data);
    }
  });
};
module.exports = {
  createbucket,
  createObject,
};
