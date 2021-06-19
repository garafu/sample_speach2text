const { AWS_CREDENTIALS_PROFILE, AWS_CREDENTIALS_REGION } = require("../../config/app.config.js");
const AWS = require("aws-sdk");
AWS.config.update({
  credentials: new AWS.SharedIniFileCredentials({ profile: AWS_CREDENTIALS_PROFILE }),
  region: AWS_CREDENTIALS_REGION
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