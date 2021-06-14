const fs = require("fs");
const path = require("path");
const AWS = require("aws-sdk");
AWS.config.update({
  credentials: new AWS.SharedIniFileCredentials({ profile: "default" }),
  region: "ap-northeast-1"
});

/**
 * 
 * @param {string} filepath 
 * @returns {Promise}
 */
var upload = async function (filepath) {
  return new Promise((resolve, reject) => {
    // var filepath = "../tmp/mozila/clips/common_voice_ja_19482491.mp3";
    var reader = fs.createReadStream(filepath);
    reader.on("error", (err) => {
      console.log("File Error", err);
      reject(err);
    });

    var s3 = new AWS.S3({ apiVersion: "2006-03-01" });

    var params = {
      Bucket: "abc-speach2text-poc-voice-data-bucket",
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