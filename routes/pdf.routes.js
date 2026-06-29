import express from "express";
import { handlePdfGeneration } from "../controllers/pdf.controllers.js";

const router = express.Router();

//router endpoint
router.post("/pdfcode", handlePdfGeneration);

export default router;