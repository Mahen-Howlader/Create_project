import { Router } from "express";
import { borrowCreate, borrowGet } from "./borrow.controller";

const borrowRoute = Router();

borrowRoute.post("/borrow", borrowCreate)
borrowRoute.get("/borrow", borrowGet)

export default borrowRoute;