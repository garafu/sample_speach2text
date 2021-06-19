class ConsoleWriter {
  write(text) { }
  writeLine(text) {
    console.log(text);
  }
  flush() { }
  close() { }
}

module.exports = ConsoleWriter;