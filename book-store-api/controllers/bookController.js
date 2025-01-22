const Books = require("../models/book.js");
const getAllBooks = async (req, res) => {
  try {
    const allBooks = await Books.find({});
    if (allBooks?.length > 0) {
      res.status(200).json({
        success: true,
        message: "Books fetched successfully.",
        data: allBooks,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No books present.",
      });
    }
  } catch (e) {
    console.error("Something went wrong", e);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
const getBookById = async (req, res) => {
  const bookId = req.params.id;
  const currentBook = await Books.findById(bookId);
  if (!currentBook) {
    res.status(404).json({
      success: false,
      message: "Book not found, please try with different book",
    });
  } else {
    res.status(200).json({
      success: true,
      message: "Book found",
      data: currentBook,
    });
  }
};
const addNewBook = async (req, res) => {
  try {
    const bookFormData = req.body;
    const newlyCreatedBook = await Books.create(bookFormData);

    if (newlyCreatedBook) {
      return res.status(201).json({
        success: true,
        message: "Book added successfully",
        data: newlyCreatedBook,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Failed to add book",
      });
    }
  } catch (e) {
    console.error("Error occurred", e);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: e.message,
    });
  }
};

const updateBook = async (req, res) => {
  try {
    const updatedBookData = req.body;
    const bookBeingUpdatedId = req.params.id;
    const currentBookBeingUpdated = await Books.findByIdAndUpdate(
      bookBeingUpdatedId,
      updatedBookData,
      {
        new: true,
      },
    );
    if (!currentBookBeingUpdated) {
      res.status(404).json({
        success: false,
        message: "Book not found, please try with different book",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Book updated successfully",
        data: currentBookBeingUpdated,
      });
    }
  } catch (e) {
    console.error("Error occurred", e);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: e.message,
    });
  }
};
const deleteBook = async (req, res) => {
  try {
    const currentBookID = req.params.id;
    const bookToBeDeleted = await Books.findByIdAndDelete(currentBookID);
    if (!bookToBeDeleted) {
      res.status(404).json({
        success: false,
        message: "Book not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Book deleted successfully",
        data: bookToBeDeleted,
      });
    }
  } catch (e) {
    console.error("Error occurred", e);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: e.message,
    });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  addNewBook,
  updateBook,
  deleteBook,
};
