import mongoose from "mongoose";
import validator from "validator";


const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    validate: [validator.isEmail, "Please enter valid email address"],
  },
  message: {
    type: String,
    required: true
  },
 
  createdAt: {
    type: Date,
    default: Date.now,
  },
  
});


export default mongoose.models.Message || mongoose.model("Message", messageSchema);
