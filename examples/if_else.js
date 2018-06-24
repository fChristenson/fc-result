const { Result } = require("../");

const sum = (a, b) => a + b;

const fail = () => {
  throw new Error("fail");
};

const sumResult = Result(sum);
const failResult = Result(fail);

[sumResult(1, 1), failResult()].forEach(result => {
  if (result.isOk()) {
    console.log("This was a OK", result);
    console.log("--------------------------");
  } else {
    console.log("This was a Fail", result);
    console.log("--------------------------");
  }
});
