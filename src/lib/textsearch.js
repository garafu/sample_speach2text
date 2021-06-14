const WINDOW_MARGIN = 5;

var getWindow = function (text, index, width, margin) {
  var max = text.length;
  var from = index - margin >= 0 ? index - margin : 0;
  var to = index + width + margin <= max ? index + width + margin : max;
  return (text || "").slice(from, to);
};

var search = function (text, word) {
  var current = 0;
  var founds = [];

  while ((current = text.indexOf(word, current)) >= 0) {
    founds[founds.length] = {
      index: current,
      word,
      window: getWindow(text, current, word.length, WINDOW_MARGIN)
    };
    current++;
  }

  return founds;
};

var execute = function (text, words) {
  var founds = [];

  for (let word of words) {
    founds = founds.concat(search(text, word));
  }

  founds.sort((a, b) => {
    if (a.index < b.index) {
      return -1;
    }
    return 1;
  });

  return founds;
};

module.exports = {
  execute
};