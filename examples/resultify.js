const { Result, Ok, Fail } = require("../");

class MyClass {
  sum(a, b) {
    return a + b;
  }

  fail() {
    throw new Error("fail");
  }
}

const myObject = Result.resultify(new MyClass());

[myObject.sum(1, 1), myObject.fail()].forEach(result => {
  switch (result.constructor) {
    case Ok:
      console.log("This was a OK", result);
      console.log("--------------------------");
      break;

    case Fail:
      console.log("This was a Fail", result);
      console.log("--------------------------");
      break;

    default:
      console.log("wtf");
      console.log("--------------------------");
      break;
  }
});
