"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_routes_1 = __importDefault(require("../book/book.routes"));
const borrow_routes_1 = __importDefault(require("../borrow/borrow.routes"));
const router = (0, express_1.Router)();
router.use("/api", book_routes_1.default);
router.use("/api", borrow_routes_1.default);
exports.default = router;
