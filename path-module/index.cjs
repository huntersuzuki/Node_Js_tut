const path = require("path");
console.log("Directory name: ", path.dirname(__filename));
console.log("File name: ", path.basename(__filename));
console.log("File Extension: ", path.extname(__filename));
const joinPath = path.join("/user", "document", "appdata", "pranay", "node_js");
console.log(joinPath);
