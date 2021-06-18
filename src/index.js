const transcription = require("./lib/transcript.js");
const textsearch = require("./lib/textsearch.js");
const output = require("./lib/output.js");

// Read arguments
var filepath = process.argv[2];
var words = process.argv.splice(3);

// Execute main
(async () => {
  var text = await transcription.execute(filepath);
  var founds = textsearch.execute(text, words);
  output.execute(founds);
})();

