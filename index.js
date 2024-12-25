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
// //   res.end("<h1>Noice</h1>"); // return html to the browser
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
app.get("/", (req, res) => {
  res.render("index.ejs", { name: "pranay" });
});

app.listen(5000, () => {
  console.log("Server is working");
});
