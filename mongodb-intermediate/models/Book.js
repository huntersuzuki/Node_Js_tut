const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({
  title: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
  },
});
module.exports = mongoose.model("Book", BookSchema);
