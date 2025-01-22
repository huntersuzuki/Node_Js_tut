const express = require("express");
const {
  getAllBooks,
  getBookById,
  addNewBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController.js");
//creating express router
const router = express.Router();

// creating routes for book
router.get("/books", getAllBooks);
router.get("/book/:id", getBookById);
router.post("/add", addNewBook);
router.put("/update/:id", updateBook);
router.delete("/delete/:id", deleteBook);

module.exports = router;
