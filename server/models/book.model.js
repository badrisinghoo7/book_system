const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const bookModel = mongoose.model("book", bookSchema);

module.exports = { bookModel };
