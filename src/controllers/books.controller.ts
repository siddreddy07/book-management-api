import { Request, Response } from 'express';
import fs from 'fs';
import { parse } from 'csv-parse';
import { v4 as uuidv4 } from 'uuid';

// @ts-ignore
import Book from '../models/Book.js';

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find();
    res.status(200).json({ success: true, books });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Something went wrong', error: err });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findOne({ id: bookId });

    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }

    res.status(200).json({ success: true, book });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

export const addBook = async (req: Request, res: Response) => {
  try {
    const { title, author, publishedYear } = req.body;

    if (!title || !author || !publishedYear) {
      return res.status(400).json({ success: false, message: 'Please provide all fields' });
    }

    const newBook = new Book({
      id: uuidv4(),
      title,
      author,
      publishedYear,
    });

    await newBook.save();

    res.status(201).json({ success: true, book: newBook });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const updates: any = {};

    if (req.body.title !== undefined) {
      updates.title = req.body.title;
    }

    if (req.body.author !== undefined) {
      updates.author = req.body.author;
    }

    if (req.body.publishedYear !== undefined) {
      updates.publishedYear = req.body.publishedYear;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ success: false, message: 'Send at least one field to update' });
    }

    const updatedBook = await Book.findOneAndUpdate(
      { id: bookId },
      updates,
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }

    res.status(200).json({ success: true, book: updatedBook });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const deletedBook = await Book.findOneAndDelete({ id: bookId });

    if (!deletedBook) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }

    res.status(200).json({ success: true, message: 'Book deleted', book: deletedBook });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};


export const importcsv = async (req: Request, res: Response) => {
  const { file } = req as any;

  if (!file) {
    return res.status(400).json({ success: false, message: 'CSV file is required' });
  }

  const filePath = file.path;
  let failedRows: { cellNumber: number; error: string }[] = [];
  let addedCount = 0;

  try {
    const content = fs.readFileSync(filePath, 'utf-8');

    parse(content, { columns: true, trim: true }, async (error, records) => {
      if (error) {
        fs.unlinkSync(filePath);
        return res.status(400).json({ success: false, message: 'CSV parse error', error: error.message });
      }

      let cellNumber = 1;

      for (const record of records) {
        cellNumber++;

        const { id, title, author, publishedYear } = record;

        if (!id || !title || !author || !publishedYear) {
          failedRows.push({ cellNumber, error: 'Missing field(s)' });
          continue;
        }

        const yearNum = Number(publishedYear);
        const yearRegex = /^\s*(\d{1,4})\s*(BC|BCE|AD|CE)?\s*$/i
;

        if (isNaN(yearNum) || !yearRegex.test(publishedYear)) {
          failedRows.push({ cellNumber, error: 'Invalid year format' });
          continue;
        }

        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

        if (!uuidRegex.test(id)) {
          failedRows.push({ cellNumber, error: 'Invalid UUID' });
          continue;
        }

        const newBook = new Book({
          id,
          title,
          author,
          publishedYear: yearNum,
        });

        try {
          await newBook.save();
          addedCount++;
        } catch (err) {
          failedRows.push({ cellNumber, error: 'Database save error' });
        }
      }

      fs.unlinkSync(filePath);


      return res.status(200).json({
        success: true,
        addedCount,
        failedRows,
      });
    });

  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

