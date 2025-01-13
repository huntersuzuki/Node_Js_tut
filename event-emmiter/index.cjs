const eventEmitter = require("events");

const myFirstEventEmitter = new eventEmitter();

myFirstEventEmitter.on("greet", (name) => {
  console.log(`Hello ${name}`);
});

myFirstEventEmitter.emit("greet", "Pranay");
