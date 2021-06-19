const output = require("../src/lib/output.js");

describe("output module", () => {
  var input, words, data;

  beforeEach(() => {
    global.console.log = jest.fn();
    input = "吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。";
    words = ["名前", "猫"]
    data = [
      { index: 3, word: "猫", window: "吾輩は猫である。名" },
      { index: 8, word: "名前", window: "猫である。名前はまだ無い" }
    ]
  });

  it("write stdout", () => {
    output.execute(input, words, data);

    var calls = console.log.mock.calls;
    expect(calls[0][0]).toBe(`[Input]`);
    expect(calls[1][0]).toBe(`吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。`);
    expect(calls[2][0]).toBe(`[Keywords]`);
    expect(calls[3][0]).toBe(`名前,猫`);
    expect(calls[4][0]).toBe(`[Detected]`);
    expect(calls[5][0]).toBe(`index,word,window`);
    expect(calls[6][0]).toBe(`3,猫,吾輩は猫である。名`);
    expect(calls[7][0]).toBe(`8,名前,猫である。名前はまだ無い`);
  });
});