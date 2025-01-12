const fs = require("fs");
// normal callback working
function person(name, callBackFunction) {
  console.log(`Hii ${name}`);
  callBackFunction();
}
function address() {
  console.log("India, MH");
}
person("Pranay", address);

//File reading using async function

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file");
    return;
  }
  console.log(data);
});
