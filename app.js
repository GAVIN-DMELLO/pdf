import express from "express";
import pdfRoutes from "./routes/pdf.routes.js";

const app = express();

//deserialiser
app.use(express.json());

// subroute
app.use("/api/v1", pdfRoutes);

//error handler for non matching route
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

export default app;