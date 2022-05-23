import catchAsyncErrors from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/errorHandler";
import APIFeatures from "../utils/apiFeatures";
import formidable from "formidable";
import Pdf from "../model/pdf";
import cloudinary from "cloudinary";

// Setting up cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const postPdf = catchAsyncErrors(async (req, res) => {

  const result = await cloudinary.v2.uploader.upload(req.body.pdfs, {
    folder: "drxdger3x/avatar",
    resource_type: "auto",
    // resource_type: "raw",
  });
    
    const { name } = req.body;
  
    const invoice = await Pdf.create({
      name,
      pdfs: {
        public_id: result.public_id,
        url: result.secure_url,
      },
     
    });
    res.status(200).json({
      successs: true,
      invoice
    });
  });

  const getPdfs = catchAsyncErrors(async (req, res) => {
    const pdfCount = await Pdf.countDocuments();
  
    const apiFeatures = new APIFeatures(
      Pdf.find().sort({ _id: -1 }),
      req.query
    );
  
    let pdf = await apiFeatures.query;
  
    pdf = await apiFeatures.query;
  
    res.status(200).json({
      success: true,  
      pdf,
      pdfCount,
    });
  });


  // Delete user    =>   /api/admin/users/:idi
const deletePdf = catchAsyncErrors(async (req, res) => {
  const pdf = await Pdf.findById(req.query.id);

  if (!pdf) {
    return next(new ErrorHandler("Pdf not found with this ID.", 400));
  }

  // Remove avatar
  const image_id = pdf.pdfs.public_id;
  await cloudinary.v2.uploader.destroy(image_id);

  await pdf.remove();

  res.status(200).json({
    successs: true,
    message: "the pdf has been deleted.",
  });
});


  export { postPdf, getPdfs, deletePdf }

  