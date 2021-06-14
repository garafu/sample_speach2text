const s3 = require("./aws/s3.js");
const transcription = require("./aws/transcription.js");
const WebClient = require("./net/webclient.js");

var execute = async function(filepath){
  var location = await s3.upload(filepath);
  var fileUri = await transcription.execute(location);
  var data = await WebClient.getAsync(fileUri);
  return data.results.transcripts[0].transcript;
};

module.exports = {
  execute
};