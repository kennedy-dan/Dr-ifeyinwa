import CourseDetail from "../../Component/courses/CourseDetail";



import { getSingleCourse } from "../../redux/actions/courseActions";

import { wrapper } from "../../redux/store";

const RoomDetailsPage = () => {


  return (
      <CourseDetail title="Course Content" />
  );
}


export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, params }) => {
    await store.dispatch(getSingleCourse(req, params.id))
})

export default RoomDetailsPage