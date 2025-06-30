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
    } catch (error: any) {
        // General fallback
        res.status(500).json({
            message: "Validation failed",
            success: false,
            error: {
                name: error.name,
                errors: error.errors || [],
            },
        });
    }

}


const allBook = async (req: Request, res: Response) => {
    try {
        let data;
        const filter = req.query.filter as string || "";
        const sortBy = req.query.sortBy as string || "createdAt";
        const sortParams = req.query.sort?.toString().toLowerCase();
        const sort = sortParams === "desc" ? -1 : sortParams === "asc" ? 1 : "desc";
        const limit = parseInt(req.query.limit as string) || 10;
        const query = filter ? { genre: filter } : {};


        data = await Book.find(query).sort({ [sortBy]: sort }).limit(limit);

        res.send({
            success: true,
            message: "Books retrieved successfully",
            data
        })
    } catch (error) {
        res.send({
            message: "All Data Get Failed",
            success: false,
            error: error
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
const updateBook = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const id = req.params.bookId;
        const data = await Book.findByIdAndUpdate(id, body, { new: true });


        res.send({
            success: true,
            message: "Book updated successfully",
            data
        })
    } catch (error) {
        res.send({
            "message": "Book updated Validation failed",
            "success": false,
            "error": error
        })
    }


}
const deleteBook = async (req: Request, res: Response) => {
    try {
        const id = req.params.bookId;
        await Book.findByIdAndDelete(id);
        res.send({
            success: true,
            message: "Book deleted successfully",
            data: null
        });
    } catch (error) {
        res.send({
            "message": "Book updated Validation failed",
            "success": false,
            "error": error
        })
    }
}

export {
    createBook,
    allBook,
    singleBook,
    updateBook,
    deleteBook
}