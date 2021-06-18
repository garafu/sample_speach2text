const { CREDENTIALS, S3_BUCKET_NAME } = require("../../config/app.config.js");
const AWS = require("aws-sdk");
AWS.config.update({
  credentials: new AWS.SharedIniFileCredentials({ profile: CREDENTIALS.PROFILE }),
  region: CREDENTIALS.REGION
});

var createS3Instance = function () {
  return new AWS.S3({ apiVersion: "2006-03-01" });
};

var createTranscribeServiceInstance = function () {
  return new AWS.TranscribeService({ apiVersion: "2017-10-26" });
};

module.exports = {
  createS3Instance,
  createTranscribeServiceInstance
};