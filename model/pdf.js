import mongoose from "mongoose";
import validator from "validator";


const pdfSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true,  "Please enter your name"]
  },
  pdfs: {
    public_id: {
      type: String,
      required: [true, "Please enter your pdf"],
    },
    url: {
      type: String,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  
});


export default mongoose.models.Pdf || mongoose.model("Pdf", pdfSchema);
