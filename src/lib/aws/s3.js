const { AWS_S3_BUCKET_NAME } = require("../../config/app.config.js");
const fs = require("fs");
const path = require("path");
const aws = require("./aws.js");

/**
 * Upload specified file to S3 bucket.
 * @param {string} filepath 
 * @returns {Promise}
 */
var upload = async function (filepath) {
  return new Promise((resolve, reject) => {
    var reader = fs.createReadStream(filepath);
    reader.on("error", (err) => {
      console.log("File Error", err);
      reject(err);
    });

    var s3 = aws.createS3Instance();

    var params = {
      Bucket: AWS_S3_BUCKET_NAME,
      Key: path.basename(filepath),
      Body: reader
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.log("Error", err);
        reject(err);
        return;
      }
      var location = data.Location;
      console.log("Upload success", data.Location);
      resolve(location);
    });
  });
};

module.exports = {
  upload
};