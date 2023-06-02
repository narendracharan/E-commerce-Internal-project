const aws = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");
 
const s3 = new aws.S3({
  credentials: {
    accessKeyId:process.env.aws_access_key_id,
    secretAccessKey: process.env.aws_secret_access_key
  },
  sslEnabled: false,
   region:process.env.region
});
const s3upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "ecommercemedia",
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now() + "--" + file.originalname);
    },
  }),
});
module.exports = {s3upload}

