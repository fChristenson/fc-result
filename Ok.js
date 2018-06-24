class Ok {
  constructor(value) {
    this.value = value;
  }

  inspect() {
    return `Ok(${this.value})`;
  }

  isOk() {
    return true;
  }
}

module.exports = Ok;
