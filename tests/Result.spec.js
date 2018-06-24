const Result = require("../Result");
const Ok = require("../Ok");
const Fail = require("../Fail");

describe("Result", () => {
  it("has a module", () => {
    expect(Result).toBeDefined();
  });

  it("returns a Ok for a working function", () => {
    const sum = (a, b) => a + b;
    const resultSum = Result(sum);
    const expected = true;
    const result = resultSum(1, 1);

    expect(result instanceof Ok).toEqual(expected);
  });

  it("returns a Fail for a function that throws an error", () => {
    const fail = () => {
      throw new Error("fail");
    };
    const resultFail = Result(fail);
    const result = resultFail();

    expect(result instanceof Fail).toEqual(true);
    expect(result.value instanceof Error).toEqual(true);
    expect(result.value.message).toEqual("fail");
  });

  it("returns a Fail for a function that makes a undefined reference", () => {
    const fail = obj => {
      return obj.foo;
    };
    const resultFail = Result(fail);
    const expected = true;
    const result = resultFail();

    expect(result instanceof Fail).toEqual(expected);
    expect(result.value instanceof Error).toEqual(true);
    expect(result.value.message).toEqual(
      "Cannot read property 'foo' of undefined"
    );
  });

  it("returns a Fail for a function that calls a missing function", () => {
    const fail = number => {
      return number.toCookies();
    };
    const resultFail = Result(fail);
    const expected = true;
    const result = resultFail(1);

    expect(result instanceof Fail).toEqual(expected);
    expect(result.value instanceof Error).toEqual(true);
    expect(result.value.message).toEqual("number.toCookies is not a function");
  });

  describe("Result.resultify", () => {
    it("returns a object with result methods", () => {
      const obj = {
        foo: () => {
          return "foo";
        },
        bar: () => {
          return "bar";
        }
      };

      const resultObj = Result.resultify(obj);
      let result = resultObj.foo();
      expect(result instanceof Ok).toEqual(true);
      expect(result.value).toEqual("foo");

      result = resultObj.bar();
      expect(result instanceof Ok).toEqual(true);
      expect(result.value).toEqual("bar");
    });

    it("overwrites the old methods of the object", () => {
      const obj = {
        foo: () => {
          return "foo";
        }
      };

      const resultObj = Result.resultify(obj);
      let result = resultObj.foo();
      expect(result instanceof Ok).toEqual(true);
      expect(result.value).toEqual("foo");

      result = obj.foo();
      expect(result instanceof Ok).toEqual(true);
      expect(result.value).toEqual("foo");
    });

    it("returns a class instance with result methods", () => {
      class Foo {
        foo() {
          return "foo";
        }

        bar() {
          return "bar";
        }
      }

      const foo = new Foo();
      const resultObj = Result.resultify(foo);
      let result = resultObj.foo();
      expect(result instanceof Ok).toEqual(true);
      expect(result.value).toEqual("foo");

      result = resultObj.bar();
      expect(result instanceof Ok).toEqual(true);
      expect(result.value).toEqual("bar");
    });

    it("does not break the this inheritance chain on a class instance", () => {
      class Foo {
        constructor(val) {
          this.val = val;
        }

        foo() {
          return this.val;
        }
      }

      const foo = new Foo("foo");
      const resultObj = Result.resultify(foo);
      const result = resultObj.foo();
      expect(result instanceof Ok).toEqual(true);
      expect(result.value).toEqual("foo");
    });

    it("does not break the this inheritance chain on a subclass", () => {
      class Foo {
        constructor(val) {
          this.val = val;
        }

        foo() {
          return this.val;
        }
      }

      class Bar extends Foo {
        bar() {
          return "bar";
        }
      }

      const bar = new Bar("foo");
      const resultObj = Result.resultify(bar);
      let result = resultObj.foo();
      expect(result instanceof Ok).toEqual(true);
      expect(result.value).toEqual("foo");

      result = resultObj.bar();
      expect(result instanceof Ok).toEqual(true);
      expect(result.value).toEqual("bar");
    });

    it("does not break the this inheritance chain on a function", () => {
      function Foo(val) {
        this.val = val;

        this.foo = function() {
          return this.val;
        };
      }

      const foo = new Foo("foo");
      const resultObj = Result.resultify(foo);
      const result = resultObj.foo();
      expect(result instanceof Ok).toEqual(true);
      expect(result.value).toEqual("foo");
    });
  });

  describe("Result.ok", () => {
    it("returns an instance of Ok", () => {
      const result = Result.ok(1);
      expect(result instanceof Ok).toEqual(true);
      expect(result.value).toEqual(1);
    });
  });

  describe("Result.fail", () => {
    it("returns an instance of Fail", () => {
      const result = Result.fail(0);
      expect(result instanceof Fail).toEqual(true);
      expect(result.value).toEqual(0);
    });
  });
});
