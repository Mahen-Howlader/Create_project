import { Schema, model } from "mongoose";
import { Book } from "./book.service";

enum Genre {
  FICTION = "FICTION",
  NON_FICTION = "NON_FICTION",
  SCIENCE = "SCIENCE",
  HISTORY = "HISTORY",
  BIOGRAPHY = "BIOGRAPHY",
  FANTASY = "FANTASY"
}

const bookSchema = new Schema<Book>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, enum: Object.values(Genre), required: true },
  isbn: { type: String, required: true, unique: true },
  description: { type: String },
  copies: { type: Number, required: true, min: 0 },
  available: { type: Boolean, default: true },
}, {
  versionKey: false,
  timestamps: true
});

const Book = model<Book>("Book", bookSchema);
export default Book;