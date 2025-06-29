import { Router } from "express";
import bookRouter from "../book/book.routes";
import borrowRoute from "../borrow/borrow.routes";

const router = Router();


router.use("/api", bookRouter);
router.use("/api", borrowRoute);

export default router;