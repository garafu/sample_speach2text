const { profile, region } = require("../../config/app.config.js").aws;
const AWS = require("aws-sdk");
AWS.config.update({
  credentials: new AWS.SharedIniFileCredentials({ profile }),
  region
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