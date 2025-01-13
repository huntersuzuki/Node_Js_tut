const express = require("express");
const app = express();

const myFirstMiddleWare = (req, res, next) => {
  console.log("The first middleware will run on every request");
  next();
};
app.use(myFirstMiddleWare);
app.get("/", (req, res) => {
  res.send("Home page");
});
app.get("/aboutus", (req, res) => {
  res.send("About us page");
});

app.listen(3000, () => {
  console.log("Server working on port 3000");
});
