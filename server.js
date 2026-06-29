import "dotenv/config";
import app from "./app.js";

const PORT = process.env.PORT || 5000;

app.listen(process.env.PORT || 5000, "0.0.0.0", () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});