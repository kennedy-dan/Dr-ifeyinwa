import nc from "next-connect";
import dbConnect from "../../../config/dbConnect";
import {
  getSingleCourse, deleteCourse
} from "../../../controllers/courseControllers";
import { isAuthenticatedUser } from "../../../middleware/auth";

// import { isAuthenticatedUser, authorizeRoles } from "../../../middleware/auth";


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


handler.get(getSingleCourse);
handler.use(isAuthenticatedUser).delete(deleteCourse)

export default handler;
