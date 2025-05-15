import express from 'express';

import { 
  getAllBooks, 
  getBookById, 
  addBook, 
  updateBook, 
  deleteBook, 
  importcsv 
} from '../../dist/controllers/books.controller.js';

import upload from '../middlewares/multer.js';  // import multer instance here

const router = express.Router();

router.get('/books', getAllBooks);
router.get('/books/:id', getBookById);
router.post('/books', addBook);
router.put('/books/:id', updateBook);
router.delete('/books/:id', deleteBook);
router.post('/books/import', upload.single('file'), importcsv);

export default router;
