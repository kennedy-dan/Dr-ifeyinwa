import React from 'react'
import { getSession } from 'next-auth/client'

import UpdateUser from '../../../Component/admin/UpdateUser'

const UpdateUserPage = () => {
    return (
            <UpdateUser />
    )
}

export async function getServerSideProps(context) {

  const session = await getSession({ req: context.req })

  if (!session || session.user.role !== 'admin') {
      return {
          redirect: {
              destination: '/login',
              permanent: false
          }
      }
  }

  return {
      props: {}
  }

}

export default UpdateUserPage
