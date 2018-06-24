const Ok = require("./Ok");
const Fail = require("./Fail");

function Result(func) {
  return function() {
    try {
      return new Ok(func.call(this, ...arguments));
    } catch (error) {
      return new Fail(error);
    }
  };
}

const replaceFunctions = (keys, object) => {
  keys.forEach(key => {
    const maybeFunction = object[key];

    if (typeof maybeFunction === "function" && key !== "constructor") {
      object[key] = Result(maybeFunction);
    }
  });
};

Result.resultify = object => {
  let proto = Object.getPrototypeOf(object);
  const protoKeys = Object.keys(proto);

  if (protoKeys.length === 0) {
    const keys = Object.keys(object);
    replaceFunctions(keys, object);
  }

  while (proto) {
    let keys = Object.getOwnPropertyNames(proto);
    replaceFunctions(keys, object);
    proto = Object.getPrototypeOf(proto);
  }

  return object;
};

Result.ok = value => {
  return new Ok(value);
};

Result.fail = value => {
  return new Fail(value);
};

module.exports = Result;
