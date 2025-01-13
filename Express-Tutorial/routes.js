const express = require("express");

const app = express();

// root route
app.get("/", (req, res) => {
  res.send("Welcome to our home page");
});

// route to get all products
app.get("/products", (req, res) => {
  let products = [
    {
      id: 1,
      title: "Product 1",
    },
    {
      id: 2,
      title: "Product 3",
    },
    {
      id: 3,
      title: "Product 3",
    },
  ];
  res.json(products);
});

// dynamic route for finding a specific product.
app.get("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  let products = [
    {
      id: 1,
      title: "Product 1",
    },
    {
      id: 2,
      title: "Product 2",
    },
    {
      id: 3,
      title: "Product 3",
    },
  ];
  const getProduct = products.find((product) => product.id === productId);

  if (getProduct) {
    res.json(getProduct);
  } else {
    res.status(404).send("Product not found!!");
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
