const lodash = require("lodash");

const arr = ["pranay", "mia", "ares", "sanjay"];
const capitalize = lodash.map(arr, lodash.capitalize);
console.log(capitalize);
