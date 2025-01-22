require("dotenv").config();
const express = require("express");
const connectDB = require("./database/db.js");
const bookRoutes = require("./routes/bookRoutes.js");
const app = express();
const PORT = process.env.PORT || 3000;

//connect to database
connectDB();
//middleware -> express.json
app.use(express.json());
//routes here
app.use("/api/books", bookRoutes);
//run the server
app.listen(PORT, () => {
  console.log("Server is running at port", PORT);
});
