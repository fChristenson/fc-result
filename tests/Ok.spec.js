const Ok = require("../Ok");

describe("Ok", () => {
  it("has a module", () => {
    expect(Ok).toBeDefined();
  });

  describe("ok.isOk", () => {
    it("returns true", () => {
      const expected = true;
      const actual = new Ok().isOk();
      expect(expected).toEqual(actual);
    });
  });

  describe("ok.inspect", () => {
    it("returns a formatted string", () => {
      const expected = "Ok(0)";
      const actual = new Ok(0).inspect();
      expect(expected).toEqual(actual);
    });
  });
});
