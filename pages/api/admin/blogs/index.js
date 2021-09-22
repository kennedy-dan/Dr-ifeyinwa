import nc from "next-connect";
import dbConnect from "../../../../config/dbConnect";

import { allAdminRBlogs } from '../../../../controllers/blogControllers'
import onError from "../../../../middleware/error";
import {
  isAuthenticatedUser,
  authorizeRoles,
} from "../../../../middleware/auth";

const handler = nc({ onError });

dbConnect();


handler.use(isAuthenticatedUser).get(allAdminRBlogs);

export default handler;
