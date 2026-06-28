import { generateLatexCode } from "../services/pdf.service.js";

export const handlePdfGeneration = async (req, res) => {
  try {
    const formData = req.body;

    //call the service layer
    const result = await generateLatexCode(formData);

    //prepare and send the response
    return res.status(200).json({
      status: "success",
      data: result,
    });
    //error handling 
  } catch (error) {
    console.error("Error in handlePdfGeneration:", error);
    return res.status(500).json({
      status: "error",
      message: error.message || "Internal Server Error",
    });
  }
};