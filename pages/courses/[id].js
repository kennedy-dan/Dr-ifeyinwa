import CourseDetail from "../../Component/courses/CourseDetail";
import { getSession } from "next-auth/client";



import { getSingleCourse } from "../../redux/actions/courseActions";

import { wrapper } from "../../redux/store";

const RoomDetailsPage = () => {


  return (
      <CourseDetail title="Course Content" />
  );
}


export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, params }) => {

  const session = await getSession({ req })

  if (!session ) {
      return {
          redirect: {
              destination: '/login',
              permanent: false
          }
      }
  }

    await store.dispatch(getSingleCourse(req, params.id))
})

export default RoomDetailsPage