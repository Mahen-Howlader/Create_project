import { Router } from "express";
import { allBook, createBook, singleBook } from "./book.controller";

const bookRouter = Router()

bookRouter.post("/book", createBook);
bookRouter.get("/books", allBook);
bookRouter.get("/books/:bookId", singleBook);

export default bookRouter;