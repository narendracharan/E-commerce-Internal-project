const {S3Client} = require("@aws-sdk/client-s3");
const  config = require("config");
const multer = require("multer");
const multerS3 = require("multer-s3");
 
const s3 = new  S3Client({
  region:config.get("region"),
  credentials: {
    accessKeyId:config.get("aws_access_key_id"),
    secretAccessKey:config.get("aws_secret_access_key"),
  },
  s3ForcePathStyle: true,
  signatureVersion: "v4",
  sslEnabled: false, 
});
const s3upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "ecommercemedia",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
      console.log( "filedname",{ fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now() + "--" + file.originalname);
   console.log("img====>",file.originalname);
    },
  }),
});

console.log(s3upload);
module.exports = {s3upload}

