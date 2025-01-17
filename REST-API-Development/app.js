const express = require("express");
const app = express();

// using middleware
app.use(express.json());

let books = [
  {
    id: 1,
    title: "Book 1",
  },
  {
    id: 2,
    title: "Book 2",
  },
  {
    id: 3,
    title: "Book 3",
  },
];

//Intro route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to our BookStore",
  });
});
//get all routes
app.get("/getbooks", (req, res) => {
  res.json(books);
});
// get a specific book
app.get("/getbook/:id", (req, res) => {
  const book = books.find((item) => Number(item.id) === Number(req.params.id));
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({
      message: "Book not found",
    });
  }
});
// add new book
app.post("/add", (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: `Book ${books.length + 1}`,
  };
  books.push(newBook);
  res.status(200).json({
    data: newBook,
    message: "Book added",
  });
});
// update a book
app.put("/update/:id", (req, res) => {
  const findCurrentBook = books.find(
    (bookItem) => Number(bookItem.id) === Number(req.params.id),
  );
  // console.log(findCurrentBook.id);
  // console.log(req.params.id);
  if (findCurrentBook) {
    findCurrentBook.title = req.body.title || findCurrentBook.title;
    res.status(200).json({
      message: "Book updated",
    });
  } else {
    res.status(404).json({
      message: "Book not found",
    });
  }
});
// delete book
app.delete("/delete/:id", (req, res) => {
  const currentBookIndex = books.findIndex(
    (item) => Number(item.id) === Number(req.params.id),
  );
  if (currentBookIndex !== -1) {
    const deletedBook = books.splice(currentBookIndex, 1);
    res.status(200).json({
      data: deletedBook,
      message: "Book deleted",
    });
  } else {
    res.status(404).json({
      message: "Book not found",
    });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
