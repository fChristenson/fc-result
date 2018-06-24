class Fail {
  constructor(value) {
    this.value = value;
  }

  inspect() {
    if (this.value instanceof Error) {
      return `Fail(${this.value.message})`;
    } else {
      return `Fail(${this.value})`;
    }
  }

  isOk() {
    return false;
  }
}

module.exports = Fail;
