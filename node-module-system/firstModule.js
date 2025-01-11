function add(a, b) {
  return a + b;
}
function sub(a, b) {
  return a - b;
}
function division(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by 0");
  }
  return a / b;
}

module.exports = {
  add,
  division,
  sub,
};
