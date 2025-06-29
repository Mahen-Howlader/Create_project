import { Request, Response } from "express";
import Book from "../book/book.model";
import Borrow from "./borrow.model";

const borrowCreate = async (req: Request, res: Response) => {
    try {
        const { book: bookId, quantity, dueDate } = req.body;

        const book = await Book.findById(bookId);
        console.log(book)
        if (!book) {
            res.status(404).json({ message: "Book not found" });
            return;
        }
        if (book.copies < quantity) {
            res.status(400).json({ message: "Not enough copies available" });
            return;
        }

        book.copies -= quantity;
        await Book.updateAvailability(bookId, book.copies);

        await book.save();

        const borrowRecord = await Borrow.create({
            book: bookId,
            quantity,
            dueDate
        });

        res.status(201).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            borrow: borrowRecord
        });

    } catch (error) {
        res.status(201).json({
            success: true,
            message: "Borrowed error",
            error: error
        });
    }
}

const borrowGet = async (req: Request, res: Response) => {
    try {
        const summary = await Borrow.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" }
                }
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookDetails"
                }
            },
            { $unwind: "$bookDetails" },

            {
                $project: {
                    _id: 0,
                    totalQuantity: 1,
                    book: {
                        title: "$bookDetails.title",
                        isbn: "$bookDetails.isbn"
                    }
                }
            }

        ]);

        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: summary
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error
        });
    }
};


export {
    borrowCreate,
    borrowGet
}