import nc from 'next-connect'
import dbConnect from '../../../../config/dbConnect'

import { getUserDetails, updateUser, deleteUser } from '../../../../controllers/authControllers'

import onError from '../../../../middleware/error'
import { isAuthenticatedUser, authorizeRoles } from '../../../../middleware/auth'

const handler = nc({ onError });

dbConnect();

handler
    .use(isAuthenticatedUser)
    .get(getUserDetails)




handler
    .use(isAuthenticatedUser)
    .delete(deleteUser)
    .put(updateUser)


export default handler;