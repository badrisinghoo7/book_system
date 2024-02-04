const express = require("express");
const bookRouter = express.Router();
const { auth } = require("../middleware/auth.middleware");
const { access } = require("../middleware/access.middleware");
const { bookModel } = require("../models/book.model");

bookRouter.post("/", auth, access("CREATOR"), async (req, res) => {
  const { title, body } = req.body;
  try {
    const newBook = new bookModel({ title, body });
    await newBook.save();
    res.status(200).json(newBook);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

bookRouter.get("/", auth, access("CREATOR"), async (req, res) => {
  try {
    const allBooks = await bookModel.find();
    res.json(allBooks);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

bookRouter.delete("/:id", auth, access("CREATOR"), async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBook = await bookModel.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

bookRouter.get("/OldBooks", async (req, res) => {
  if (req.query.old === "1") {
    try {
      const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
      const oldBooks = await bookModel.find({
        createdAt: { $lte: tenMinutesAgo },
      });
      res.json(oldBooks);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(400).json({ error: "Invalid request" });
  }
});

bookRouter.get("/NewBook", auth, async (req, res) => {
  if (req.query.new === "1") {
    try {
      const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
      const newBooks = await bookModel.find({
        createdAt: { $gte: tenMinutesAgo },
      });
      res.json(newBooks);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(400).json({ error: "Invalid request" });
  }
});

module.exports = { bookRouter };
