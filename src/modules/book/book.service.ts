import { Model } from "mongoose";

export interface Book {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}

export interface IBookModel extends Model<Book> {
  updateAvailability(bookId: string, copies: number): Promise<void>;
}