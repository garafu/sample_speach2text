
var execute = function (items) {
  for (let item of items) {
    console.log(`index:${item.index}\tword:"${item.word}"\twindow:"${item.window}"`);
  }
};

module.exports = {
  execute
};