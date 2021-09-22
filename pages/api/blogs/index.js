import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect';

import { createBlog, getBlog } from '../../../controllers/blogControllers'

import onError from "../../../middleware/error";
const handler = nc({ onError });

dbConnect()

export const config = {
    api: {
      bodyParser: {
        sizeLimit: "10mb",
      },
    },
  };

handler.get(getBlog)
handler.post(createBlog)

export default handler