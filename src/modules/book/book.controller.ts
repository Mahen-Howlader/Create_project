import { Request, Response } from "express"
import Book from "./book.model";

const createBook = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const bodyData = new Book(body);
        const data = await bodyData.save();
        res.send({
            success: true,
            message: "Book created successfully",
            data
        })
    } catch (error) {
        res.send({
            "message": "Validation failed",
            "success": false,
            "error": error
        })
    }
}
const allBook = async (req: Request, res: Response) => {
    try {
        const data = await Book.find();
        res.send({
            success: true,
            message: "Books retrieved successfully",
            data
        })
    } catch (error) {
        res.send({
            "message": "Validation failed",
            "success": false,
            "error": error
        })
    }
}
const singleBook = async (req: Request, res: Response) => {
    try {
        const id = req.params.bookId;
        console.log("id", id)
        const data = await Book.findById(id);
        res.send({
            success: true,
            message: "Books retrieved successfully",
            data
        })
    } catch (error) {
        res.send({
            "message": "Validation failed",
            "success": false,
            "error": error
        })
    }


}

export {
    createBook,
    allBook,
    singleBook
}