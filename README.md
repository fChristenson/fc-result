# fc-result

## Description

`npm install fc-result`

fc-result wraps your function and returns a function that will return
a `Result` when called.

A result can be either `Ok` or `Fail`.

To get the return value of the function call simply extract the value using the `value`
property, `result.value`.

A result function will return `Ok` if the function was called without throwing
an `Error` and it will return `Fail` if the function threw an `Error`

This will allow for code such as:

```
  const { Result, Ok, Fail } = require("fc-result");

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
```

## Result API

### Result

```
  const sum = (a, b) => a + b;
  const sumResult = Result(sum);
  const mySum = sumResult(1, 1).value;
```

### Result.ok / Result.fail

```
  const myFunc = val => {
    if (val === 1) {
      return Result.ok(val);
    } else {
      return Result.fail(new Error("val was not 1"));
    }
  };
```

### Result.resultify

```
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
```

### result.isOk

```
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
```
