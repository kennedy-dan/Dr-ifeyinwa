import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect'

import { postPdf, getPdfs } from '../../../controllers/pdfController'

import { isAuthenticatedUser } from '../../../middleware/auth'
import onError from '../../../middleware/error'

const handler = nc({ onError });

dbConnect();
export const config = {
    api: {
      bodyParser: {
        sizeLimit: "20mb",
      },
    },
  };
handler.post(postPdf)
handler.use(isAuthenticatedUser).get(getPdfs)
// handler.use(isAuthenticatedUser).get(getMessages)

export default handler;