const textsearch = require("../src/lib/textsearch.js");

describe("textsearch module", () => {
  var text, words;

  beforeEach(() => {
    text = "音声認識の現状について教えていただけないでしょうかはい最近では音声認識";
    words = ["音声", "認識", "教えて"];
  });

  it("can serach specified words", () => {
    var results = textsearch.execute(text, words);
    expect(results.length).toBe(5);

    expect(results[0].index).toBe(0);
    expect(results[0].word).toBe("音声");
    expect(results[0].window).toBe("音声認識の現状");

    expect(results[2].index).toBe(11);
    expect(results[2].word).toBe("教えて");
    expect(results[2].window).toBe("状について教えていただけな");

    expect(results[4].index).toBe(33);
    expect(results[4].word).toBe("認識");
    expect(results[4].window).toBe("近では音声認識");
  });
});
