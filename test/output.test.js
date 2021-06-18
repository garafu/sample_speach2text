const output = require("../src/lib/output.js");

describe("output module", () => {
  var data;

  beforeEach(() => {
    global.console.log = jest.fn();
    data = [
      { index: 0, word: "あ", window: "あああ" },
      { index: 1, word: "う", window: "ううう" }
    ]
  });

  it("write stdout", () => {
    output.execute(data);

    var calls = console.log.mock.calls;
    expect(calls[0][0]).toBe(`index: 0\tword: "あ"\twindow: "あああ"`);
  });
});