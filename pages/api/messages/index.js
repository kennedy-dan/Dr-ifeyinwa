import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect'

import { createMessage, getMessages } from '../../../controllers/messageController'

import { isAuthenticatedUser } from '../../../middleware/auth'
import onError from '../../../middleware/error'

const handler = nc({ onError });

dbConnect();

handler.post(createMessage)
handler.use(isAuthenticatedUser).get(getMessages)

export default handler;