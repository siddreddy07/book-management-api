# 📚 Book Management REST API 🌟

Dive into the **Book Management REST API**, a snappy tool to manage your book collection! Built with **Node.js**, **Express**, **MongoDB**, and a splash of **TypeScript** (just in the `controllers/` folder), it handles books with style. With manual data checks, CSV imports, and error handling, it’s both fun and reliable! 📖

## 🚀 Features

- 📚 Add, update, delete, or fetch books
- 📥 Import books via CSV with smart validation
- ✅ Check fields like UUID and published year
- 🧪 TypeScript in controllers for clean code
- 🛡️ Catch errors for bad data or requests
- 🧹 Auto-cleanup of uploaded CSV files

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Validation**: Manual logic (no extra libraries)
- **Upload Handling**: Multer
- **CSV Parsing**: csv-parse
- **Logging**: Morgan
- **Type Safety (Controllers)**: TypeScript

## 📁 Project Structure

```
book-management-api/
├── controllers/        # TypeScript logic for routes
├── models/             # Mongoose schemas
├── routes/             # Express routes
├── uploads/            # Temporary CSV storage
├── utils/              # Utility functions (e.g., dbConnect)
├── index.js            # Main server file (JavaScript)
├── tsconfig.json       # TypeScript config
├── .gitignore          # Git ignore rules
└── README.md           # This guide
```

## 📦 Installation & Running

### What You Need
- Node.js (version 16 or higher)
- MongoDB (local or MongoDB Atlas)
- A code editor (like VS Code)
- A terminal

### Steps
1. Clone the repo:
   ```bash
   git clone https://github.com/siddreddy07/book-management-api.git
   cd book-management-api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```
   Get a MongoDB link from MongoDB Atlas (free signup!).
4. Compile TypeScript controllers:
   ```bash
   npx tsc
   ```
   Ensure `tsconfig.json` compiles only `controllers/` or outputs to `./controllers`.
5. Run the server:
   ```bash
   node index.js
   ```
   Or use the dev shortcut:
   ```bash
   npm run dev
   ```

Your API will be live at `http://localhost:5000`! 🌈

## 📤 CSV Import Format

Upload a CSV with these headers:
```csv
id,title,author,publishedYear
```

### Example Valid Row
```csv
550e8400-e29b-41d4-a716-446655440000,The Great Gatsby,F. Scott Fitzgerald,1925
```

### Invalid Cases Handled
- Missing fields
- Invalid UUID (must be version 4)
- Invalid publishedYear (non-numeric or malformed)

## 📜 API Endpoints

| Method | Route              | Description            |
|--------|--------------------|------------------------|
| GET    | `/api/books`       | Get all books         |
| POST   | `/api/books`       | Add a new book        |
| PUT    | `/api/books/:id`   | Update a book         |
| DELETE | `/api/books/:id`   | Delete a book         |
| POST   | `/api/import`      | Import books via CSV  |

Test these with Postman or curl! 🛠️

## 🧾 Scripts

In `package.json`:
```json
{
  "scripts": {
    "build": "tsc",
    "start": "node index.js",
    "dev": "npm run build && node index.js"
  }
}
```

- `npm run build`: Compiles TypeScript
- `npm start`: Runs the server
- `npm run dev`: Builds and runs

## 🙋‍♂️ Author

- **Name**: N. Siddharth Reddy
- **GitHub**: [siddreddy07](https://github.com/siddreddy07)
- **LinkedIn**: [n-siddharth-reddy](https://linkedin.com/in/n-siddharth-reddy)

## 📄 License

This project is open source under the **MIT License**. Use, copy, or share it freely, keeping the license and copyright notice.

## 🆘 Troubleshooting

If things go wrong:
- Ensure MongoDB is running and `MONGO_URI` is correct
- Rerun `npm install`
- Check terminal errors
- Reach out on GitHub for help! 😊
