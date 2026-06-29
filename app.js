import express from "express";
import pdfRoutes from "./routes/pdf.routes.js";

const app = express();

//deserialiser
app.use(express.json());

// subroute
app.use("/api/v1", pdfRoutes);



export default app;