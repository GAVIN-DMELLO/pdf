import express from "express";
import { handlePdfGeneration } from "../controllers/pdf.controller.js";

const router = express.Router();

//router endpoint
router.post("/pdfcode", handlePdfGeneration);

export default router;