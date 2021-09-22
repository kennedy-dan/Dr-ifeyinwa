import Message from "../model/messages";
import catchAsyncErrors from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/errorHandler";
import APIFeatures from "../utils/apiFeatures";

const createMessage = catchAsyncErrors(async (req, res) => {
  
    const message = await Message.create(req.body);
  
    res.status(200).json({
      success: true,
      message,
    });
  });


  const getMessages = catchAsyncErrors(async (req, res) => {
    const blogCount = await Message.countDocuments();
  
    const apiFeatures = new APIFeatures(Message.find().sort({ _id: -1 }), req.query);
  
    let messages = await apiFeatures.query;
  
    messages = await apiFeatures.query;
  
    res.status(200).json({
      success: true,
      messages,
      blogCount,
    });
  });

  const deleteMessage = catchAsyncErrors(async (req, res, next) => {
    const message = await Message.findById(req.query.id);
  
    if (!message) {
      return next(new "Blog not found with this ID"(), 404);
    }
  
  
    await message.remove();
  
    res.status(200).json({
      success: true,
      message: "message is deleted.",
    });
  });

  export { createMessage, getMessages, deleteMessage }

  