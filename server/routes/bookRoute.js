import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// post new book
router.post("/", async (req, res) => {
    try {
      if (!req.body.title || !req.body.author || !req.body.publishYear) {
        return res.status(400).send({
          message: "Send all required fields:title, author, publishYear",
        });
      }
      const newBook = {
        title: req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear,
      };
      const book = await Book.create(newBook);
      return res.status(201).send(book);
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  });
  //get all books
  router.get("/", async (req, res) => {
    try {
      const books = await Book.find({});
      return res.status(201).json({
        count: books.length,
        data: books,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  });
  
  //get one book
  router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const book = await Book.findById(id);
      return res.status(201).json(book);
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  });
  
  //update book
  router.put("/:id", async (req, res) => {
    try {
      if (!req.body.title || !req.body.author || !req.body.publishYear) {
        return res.status(400).send({
          message: "Send all required fields:title, author, publishYear",
        });
      }
      const { id } = req.params;
      const results = await Book.findByIdAndUpdate(id, req.body);
      if (!results) {
        return res.status(404).json({ message: "Book not found" });
      }
      return res.status(200).send({ message: "Book Succesfully updated" });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  });
  
  // Delete a Book
  router.delete("/:id", async (req,res) => {
    try {
      const {id} = req.params;
       const results = await Book.findByIdAndDelete(id);
       if (!results) {
        return res.status(404).json({ message: "Book not found" });
      }
      return res.status(200).send({ message: "Book Succesfully Deleted" });
      
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  });

  export default router;