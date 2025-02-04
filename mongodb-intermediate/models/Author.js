const mongoose = require("mongoose");

const AuthorSchema = mongoose.Schema({
  name: String,
  bio: String,
});

module.exports = mongoose.model("Author", AuthorSchema);
