const SEPARATOR = ",";
const EXT_NAME = ".csv";
const StreamWriter = require("./io/streamwriter.js");
const ConsoleWriter = require("./io/consolewriter.js");
const logger = require("./log/logger.js");
const moment = require("moment");

class Writer {
  constructor(filepath) {
    this.writers = [
      new ConsoleWriter(),
      new StreamWriter(filepath, "shift_jis")
    ];
  }
  writeLine(text) {
    for (let writer of this.writers) {
      writer.writeLine(text);
    }
  }
  close() {
    for (let writer of this.writers) {
      writer.close();
    }
  }
}

var createFileName = function () {
  var base = require("../../package.json").name;
  var datetime = moment().format("YYYYMMDDHHmmss");

  return `${base}-${datetime}${EXT_NAME}`;
};

var execute = function (input, words, items) {
  var filepath = createFileName();
  var writer = new Writer(filepath);

  logger.info("--- Start output ----------------------------------");

  // Output input information.
  writer.writeLine("[Input]");
  writer.writeLine(input);

  // Output keywords information.
  writer.writeLine("[Keywords]");
  writer.writeLine((words || []).join(SEPARATOR));

  // Output detected information.
  writer.writeLine("[Detected]");
  writer.writeLine(["index", "word", "window"].join(SEPARATOR));
  for (let item of items) {
    writer.writeLine([item.index, item.word, item.window].join(SEPARATOR));
  }

  // Flush output data.
  writer.close();

  logger.info("--- End output ------------------------------------");

  return filepath;
};

module.exports = {
  execute
};