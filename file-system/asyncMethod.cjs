const fs = require("fs");
const path = require("path");

// Define the folder and file paths
const dataFolder = path.join(__dirname, "data");
const filePath = path.join(dataFolder, "example.txt");

// Step 1: Create a folder asynchronously
fs.mkdir(dataFolder, { recursive: true }, (err) => {
  if (err) {
    return console.error("Error creating folder:", err);
  }
  console.log("Folder created successfully");

  // Step 2: Write to a file asynchronously
  fs.writeFile(filePath, "Hello world my brothers", (err) => {
    if (err) {
      return console.error("Error writing to file:", err);
    }
    console.log("File created successfully");

    // Step 3: Read from the file asynchronously
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return console.error("Error reading file:", err);
      }
      console.log("File content:", data);

      // Step 4: Append to the file asynchronously
      fs.appendFile(
        filePath,
        "\nThis is the new changes to the file",
        (err) => {
          if (err) {
            return console.error("Error appending to file:", err);
          }
          console.log("New changes added");

          // Step 5: Read the updated file content
          fs.readFile(filePath, "utf8", (err, updatedData) => {
            if (err) {
              return console.error("Error reading updated file:", err);
            }
            console.log("Updated file content:", updatedData);
          });
        },
      );
    });
  });
});
