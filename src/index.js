const transcription = require("./lib/transcript.js");
const textsearch = require("./lib/textsearch.js");
const output = require("./lib/output.js");
const logger = require("./lib/logger");

// Read arguments
var filepath = process.argv[2];
var words = process.argv.splice(3);
logger.info(`Start process with ... input:"${filepath}", keywords:${JSON.stringify(words)}`);

// Execute main
(async () => {
  try {
    var text, founds;
    text = await transcription.execute(filepath);
    founds = textsearch.execute(text, words);
    output.execute(text, words, founds);
  } catch (err) {
    logger.error("Process exit with: ", err.message);
  }
})();

