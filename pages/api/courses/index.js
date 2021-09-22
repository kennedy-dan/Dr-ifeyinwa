import nc from "next-connect";
import dbConnect from "../../../config/dbConnect";

import {
  createCourse,
  getCourses,
} from "../../../controllers/courseControllers";

import onError from "../../../middleware/error";
import { isAuthenticatedUser } from '../../../middleware/auth'
const handler = nc({ onError });

dbConnect();

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

handler.use(isAuthenticatedUser).get(getCourses);
handler.post(createCourse);

export default handler;
