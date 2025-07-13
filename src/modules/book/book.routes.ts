import { Router } from "express";
import { allBook, createBook, deleteBook,  singleBook, updateBook } from "./book.controller";

const bookRouter = Router()

bookRouter.post("/books", createBook);
bookRouter.get("/books", allBook);
bookRouter.get("/books/:bookId", singleBook);
bookRouter.put("/books/:bookId", updateBook);
bookRouter.delete("/books/:bookId", deleteBook);

export default bookRouter;