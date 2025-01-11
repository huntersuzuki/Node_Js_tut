const fs = require("fs");
const path = require("path");

// created a folder named data
const dataFolder = path.join(__dirname, "data");

if (!fs.existsSync(dataFolder)) {
  fs.mkdirSync(dataFolder);
  console.log("data folder created");
}

// creating a file in the data folder
const filePath = path.join(dataFolder, "example.txt");
// writing inside the file
fs.writeFileSync(filePath, "Hello world my brothers");
console.log("File created successfully");

// reading from the file
const readContentFromFile = fs.readFileSync(filePath, "utf8");
console.log("File content: ", readContentFromFile);
// writing changes to the file
fs.appendFileSync(filePath, "\n this is the new changes to the file");
console.log("new changes added");
