const path = require("path");
const transcription = require("./lib/transcript.js");

var filename = "common_voice_ja_19482498.mp3";
var filepath = path.join(__dirname, `../tmp/mozila/clips/${filename}`);

(async () => {
  var text = await transcription.execute(filepath);
  console.log(text);
})();
