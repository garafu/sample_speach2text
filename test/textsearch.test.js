const textsearch = require("../src/lib/textsearch.js");

describe("textsearch module", () => {
  var text, words;

  beforeEach(() => {
    text = "吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。";
    words = ["。", "無い", "吾輩"];
  });

  it("can serach specified words", () => {
    var results = textsearch.execute(text, words);
    expect(results.length).toBe(5);

    expect(results[0].index).toBe(0);
    expect(results[0].word).toBe("吾輩");
    expect(results[0].window).toBe("吾輩は猫である");

    expect(results[2].index).toBe(13);
    expect(results[2].word).toBe("無い");
    expect(results[2].window).toBe("名前はまだ無い。どこで生");

    expect(results[4].index).toBe(32);
    expect(results[4].word).toBe("。");
    expect(results[4].window).toBe("当がつかぬ。");
  });
});
