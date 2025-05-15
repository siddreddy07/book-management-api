import mongoose from "mongoose";

import { v4 as uuidv4 } from 'uuid';

const bookSchema = new mongoose.Schema({
    id: {
    type: String,
    default: uuidv4,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  publishedYear: {
    type: Number,
    required: true
  }
})

const Book = mongoose.model('Book',bookSchema)

export default Book;