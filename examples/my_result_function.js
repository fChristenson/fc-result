const { Result, Ok, Fail } = require("../");

const myFunc = val => {
  if (val === 1) {
    return Result.ok(val);
  } else {
    return Result.fail(new Error("val was not 1"));
  }
};

[myFunc(1), myFunc()].forEach(result => {
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
