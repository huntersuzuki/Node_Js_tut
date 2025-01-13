const express = require("express");
const app = express();

const requestTimeStampLogger = (req, res, next) => {
  const timeStamp = new Date().toISOString();
  console.log(`${timeStamp} from ${req.method} to ${req.url}`);
  next();
};
app.use(requestTimeStampLogger);

app.get("/", (req, res) => {
  res.send("Home page");
});
app.get("/aboutus", (req, res) => {
  res.send("About us page");
});

app.listen(3000, () => {
  console.log("Server working on port 3000");
});
