import { Schema, model } from "mongoose";
import { Book, IBookModel } from "./book.service";

enum Genre {
  FICTION = "FICTION",
  NON_FICTION = "NON_FICTION",
  SCIENCE = "SCIENCE",
  HISTORY = "HISTORY",
  BIOGRAPHY = "BIOGRAPHY",
  FANTASY = "FANTASY"
}

const bookSchema = new Schema<Book, IBookModel>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, enum: Object.values(Genre), required: true },
  isbn: { type: String, required: true, unique: [true, "Give Unique Value"] },
  description: { type: String },
  copies: { type: Number, required: true, min: [0, "Copies must be a positive number"] },
  available: { type: Boolean, default: true },
}, {
  versionKey: false,
  timestamps: true
});

bookSchema.static('updateAvailability', async function (bookId: string, copies: number) {
  if (copies === 0) {
    await this.findByIdAndUpdate(bookId, { available: false });
  }
});

const Book = model<Book, IBookModel>("Book", bookSchema);
export default Book;