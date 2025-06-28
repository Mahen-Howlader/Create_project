import { Router } from "express";
import bookRouter from "../book/book.routes";

const router = Router();


router.use("/api", bookRouter);

export default router;