const eventEmmiter = require("events");

class myCustomEmmiter extends eventEmmiter {
  constructor() {
    super();
    this.greeting = "Hello";
  }
  greet(name) {
    this.emit("greeting", `${this.greeting},${name}`);
  }
}
const MyCustomEmmiter = new myCustomEmmiter();
MyCustomEmmiter.on("greeting", (input) => {
  console.log(`Greeting event ${input}`);
});
MyCustomEmmiter.greet("Pranay Bhoir");
