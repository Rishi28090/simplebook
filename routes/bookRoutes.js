const express = require("express");
const router = express.Router();
const Book = require("../models/Book.js");
const Author = require("../models/Author.js");
const { emailQueue } = require("../jobs/emailQueue");

router.post("/author", async (req, res) => {
  const { name, email } = req.body;
  try {
    const author = await Author.create({ name, email });

    // Add email job to queue
    await emailQueue.add("welcomeEmail", { name, email });

    res.status(201).json(author);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Create book
router.post("/", async (req, res) => {
  const { title, genre, author } = req.body;
  try {
    const book = await Book.create({ title, genre, author });
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get books with author populated
router.get("/", async (req, res) => {
  try {
    const books = await Book.find().populate("author", "name email");
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/stats",async(req,res)=>{
    try{
      const result  = await Book.aggregate([
          {
              $group: {
                  _id: "$author",
                  totalbooks: { $sum: 1 }
              }
          },
          // Optionally, you can unwind or lookup author details here if needed
          
      ])
        res.json(result);
    }
    catch (err) {
    res.status(500).json({ error: err.message });
  }
})



module.exports = router;