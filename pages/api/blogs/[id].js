import nc from "next-connect";
import dbConnect from "../../../config/dbConnect";
import {
  getSingleBlog,
  deleteBlog
} from "../../../controllers/blogControllers";


import { isAuthenticatedUser, authorizeRoles } from "../../../middleware/auth";


import onError from "../../../middleware/error";
const handler = nc({ onError });

dbConnect();

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};


handler.get(getSingleBlog);
handler.use(isAuthenticatedUser).delete(deleteBlog);


export default handler;
