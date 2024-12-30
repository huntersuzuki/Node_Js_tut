// // this was the old way to import the http object or custom files
// // const myName = require("./features");
// // const http = require("http"); // http is an object which has various functions such as creating a server etc.
// import http from "http";
// import myName, { generateMarks } from "./features.js";
// import * as fs from "node:fs";
// console.log(http);
//
// console.log(myName);
// console.log(generateMarks());
// // const server = http.createServer((req, res) => {
// //   res.end("<h1>Nice</h1>"); // return html to the browser
// // });
// const home = fs.readFileSync("./index.html");
//
// const server = http.createServer((req, res) => {
//   if (req.url === "/about") {
//     res.end(`<h1>Marks are ${generateMarks()}</h1>`);
//   } else if (req.url === "/") {
//     // fs.readFile("./index.html", (err, home) => {
//     //   res.end(home);
//     // }); //this function is asynchronous.
//     res.end(home);
//   } else if (req.url === "/contact") {
//     res.end("<h1>Contact page</h1>");
//   } else {
//     res.end("<h1>Page not found</h1>");
//   }
// });
//
// server.listen(5000, () => {
//   console.log("Server started");
// });

import express from "express";
import path from "path";
const app = express();
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
mongoose
  .connect("mongodb://localhost:27017", {
    dbName: "backendtut",
  })
  .then(() => console.log("Database connected"))
  .catch((e) => console.log(e));

// const dataSchema = new mongoose.Schema({
//   name: String,
//   email: String,
// });
// const Data = mongoose.model("Data", dataSchema);

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
const User = mongoose.model("User", userSchema);

// app.get("/getproducts", (req, res) => {
//   // res.send("Hello"); // used to send data to the client
//   // res.sendStatus(500); // used to send status code to the client side.
//   // res.json({
//   //   success: true,
//   //   products: [],
//   // }); // used to send json data to the client.
//   // res.status(400).send("My name is Pranay Bhoir");// we can send status code and data by chaining.
//   // const pathLocation = path.resolve(); // this helps us to extract paths.
//   // res.sendFile(path.join(pathLocation, "./index.html")); // this is the way we can send a file to the client.
//
//
//Using middlewares
//Middleware is a function that acts as an intermediary between a client's request and the server's response. It's placed between layers of software and can process, modify, or augment requests.
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// const user = [];

// API with GET method
// app.get("/", (req, res) => {
//   res.render("index.ejs", { name: "Pranay Bhoir" });
// });

const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const decode = jwt.verify(token, "fd87sdhfn9s8ufsdfhsub98fyd8syab98dyfy");
    req.user = await User.findById(decode._id);
    next();
  } else {
    res.render("login.ejs");
  }
};

// app.get("/success", (req, res) => {
//   res.render("success.ejs");
// });

// app.get("/", (req, res) => {
//   res.render("login.ejs");
// });

// app.get("/add", async (req, res) => {
//   await Data.create({ name: "pranay1", email: "pranay1@gmail.com" });
//   res.send("Nice");
// });

// API with POST method
// app.post("/", (req, res) => {
//   // console.log(req.body);
//   user.push({ userName: req.body.name, email: req.body.email });
//   res.redirect("/success");
// });

app.get("/", isAuthenticated, (req, res) => {
  // console.log(req.cookies);
  res.render("logout.ejs", { name: req.user.name });
});

app.get("/logout", (req, res) => {
  res.cookie("token", null, {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.redirect("/");
});
// app.get("/login", (req, res) => {
//   res.render("login.ejs");
// });
app.get("/register", (req, res) => {
  res.render("register.ejs");
});
app.post("/login", async (req, res) => {
  const { email, password } = req.user;
  let user = await User.findOne({ email });
  if (!user) {
    return res.redirect("/register");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.render("login", { message: "incorrect password" });
  }
});
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });
  if (user) {
    return res.redirect("/login");
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  user = await User.create({
    name: name,
    email: email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    { _id: user._id },
    "fd87sdhfn9s8ufsdfhsub98fyd8syab98dyfy",
  );

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 1000),
  });
  res.redirect("/");
});

// app.post("/add", async (req, res) => {
//   // const userData = { username: req.body.name, email: req.body.email };
//   // console.log(userData);
//   const { name, email } = req.body;
//   await Data.create({ name: name, email: email });
//   res.redirect("/success");
// });

// sent json data to the client side
// app.get("/users", (req, res) => {
//   res.json({
//     user,
//   });
// });

app.listen(5000, () => {
  console.log("Server is working");
});
