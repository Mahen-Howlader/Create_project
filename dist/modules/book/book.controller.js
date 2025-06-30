"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.singleBook = exports.allBook = exports.createBook = void 0;
const book_model_1 = __importDefault(require("./book.model"));
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const bodyData = new book_model_1.default(body);
        const data = yield bodyData.save();
        res.send({
            success: true,
            message: "Book created successfully",
            data
        });
    }
    catch (error) {
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
});
exports.createBook = createBook;
const allBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let data;
        const filter = req.query.filter || "";
        const sortBy = req.query.sortBy || "createdAt";
        const sortParams = (_a = req.query.sort) === null || _a === void 0 ? void 0 : _a.toString().toLowerCase();
        const sort = sortParams === "desc" ? -1 : sortParams === "asc" ? 1 : "desc";
        const limit = parseInt(req.query.limit) || 10;
        const query = filter ? { genre: filter } : {};
        data = yield book_model_1.default.find(query).sort({ [sortBy]: sort }).limit(limit);
        res.send({
            success: true,
            message: "Books retrieved successfully",
            data
        });
    }
    catch (error) {
        res.send({
            message: "All Data Get Failed",
            success: false,
            error: error
        });
    }
});
exports.allBook = allBook;
const singleBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        console.log("id", id);
        const data = yield book_model_1.default.findById(id);
        res.send({
            success: true,
            message: "Books retrieved successfully",
            data
        });
    }
    catch (error) {
        res.send({
            "message": "Validation failed",
            "success": false,
            "error": error
        });
    }
});
exports.singleBook = singleBook;
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const id = req.params.bookId;
        const data = yield book_model_1.default.findByIdAndUpdate(id, body, { new: true });
        res.send({
            success: true,
            message: "Book updated successfully",
            data
        });
    }
    catch (error) {
        res.send({
            "message": "Book updated Validation failed",
            "success": false,
            "error": error
        });
    }
});
exports.updateBook = updateBook;
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        yield book_model_1.default.findByIdAndDelete(id);
        res.send({
            success: true,
            message: "Book deleted successfully",
            data: null
        });
    }
    catch (error) {
        res.send({
            "message": "Book updated Validation failed",
            "success": false,
            "error": error
        });
    }
});
exports.deleteBook = deleteBook;
