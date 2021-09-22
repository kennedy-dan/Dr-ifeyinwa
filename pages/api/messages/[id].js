import nc from "next-connect";
import dbConnect from "../../../config/dbConnect";
import {
   deleteMessage
} from "../../../controllers/messageController";

// import { isAuthenticatedUser, authorizeRoles } from "../../../middleware/auth";


import onError from "../../../middleware/error";
const handler = nc({ onError });

dbConnect();




handler.delete(deleteMessage)

export default handler;
