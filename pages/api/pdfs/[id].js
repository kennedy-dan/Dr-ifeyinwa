import nc from "next-connect";
import dbConnect from "../../../config/dbConnect";
import {
    deletePdf
} from "../../../controllers/pdfController";

import { isAuthenticatedUser, authorizeRoles } from "../../../middleware/auth";


import onError from "../../../middleware/error";
const handler = nc({ onError });

dbConnect();




handler.use(isAuthenticatedUser).delete(deletePdf)

export default handler;
