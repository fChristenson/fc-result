const { Result, Ok, Fail } = require("../");

const sum = (a, b) => a + b;

const fail = () => {
  throw new Error("fail");
};

const sumResult = Result(sum);
const failResult = Result(fail);

[sumResult(1, 1), failResult()].forEach(result => {
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
