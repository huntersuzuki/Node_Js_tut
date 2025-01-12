const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file", err);
    return;
  }
  const modify = data.toUpperCase();

  fs.writeFile("output.txt", modify, (err) => {
    if (err) {
      console.error("Error writing file", err);
      return;
    }
    console.log("Data written to the new file");

    fs.readFile("output.txt", "utf8", (err, data) => {
      if (err) {
        console.error("Error reading file", err);
        return;
      }
      console.log(data);
    });
  });
});
