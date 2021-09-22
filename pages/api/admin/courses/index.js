import nc from "next-connect";
import dbConnect from "../../../../config/dbConnect";

import { allAdminCourses } from '../../../../controllers/courseControllers'
import onError from "../../../../middleware/error";
import {
  isAuthenticatedUser,
  authorizeRoles,
} from "../../../../middleware/auth";

const handler = nc({ onError });

dbConnect();


handler.use(isAuthenticatedUser).get(allAdminCourses);

export default handler;
