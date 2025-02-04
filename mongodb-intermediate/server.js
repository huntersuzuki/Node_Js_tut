require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");
const bookRoutes = require("./routes/bookRoutes");
const app = express();

mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "mongodb-intermediate",
  })
  .then(() => console.log("Database Connected successfully"))
  .catch(() => console.error("Database connection failed"));

app.use(express.json());
app.use("/api/products", productRoutes);
app.use("/api/books", bookRoutes);
app.listen(process.env.PORT, () => {
  console.log("Server is now running on port", process.env.PORT);
});
