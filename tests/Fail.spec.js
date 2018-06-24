const Fail = require("../Fail");

describe("Fail", () => {
  it("has a module", () => {
    expect(Fail).toBeDefined();
  });

  describe("fail.isOk", () => {
    it("returns false", () => {
      const expected = false;
      const actual = new Fail().isOk();
      expect(expected).toEqual(actual);
    });
  });

  describe("fail.inspect", () => {
    it("returns a formatted string", () => {
      const expected = "Fail(0)";
      const actual = new Fail(0).inspect();
      expect(expected).toEqual(actual);
    });

    it("extracts the error message from an error", () => {
      const expected = "Fail(fail)";
      const actual = new Fail(new Error("fail")).inspect();
      expect(expected).toEqual(actual);
    });
  });
});
