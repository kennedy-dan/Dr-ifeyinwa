import React from "react";
import { getSession } from "next-auth/client";

// import AllRooms from "../../../components/admin/AllRooms";
import AllCourses from '../../../Component/admin/AllCourses'

const AllRoomsPage = () => {
  return (
      <AllCourses />
  );
};

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



export default AllRoomsPage;
