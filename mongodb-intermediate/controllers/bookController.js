const Author = require("../models/Author");
const Book = require("../models/Book");

const createAuthor = async (req, res) => {
  try {
    const author = new Author(req.body);
    await author.save();

    res.status(201).json({
      success: true,
      message: "Author created successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred.",
    });
  }
};

const createBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();

    res.status(201).json({
      success: true,
      message: "Book added successfully",
      data: book,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred.",
    });
  }
};

const getBookWithAuthor = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("author");
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found.",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Book found",
        data: book,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred.",
    });
  }
};
module.exports = { createAuthor, createBook, getBookWithAuthor };
