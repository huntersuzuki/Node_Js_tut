const express = require("express");
const {
  createBook,
  createAuthor,
  getBookWithAuthor,
} = require("../controllers/bookController");

const router = express.Router();

router.post("/author", createAuthor);
router.post("/book", createBook);
router.get("/getbook/:id", getBookWithAuthor);

module.exports = router;
