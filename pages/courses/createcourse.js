import Course  from "../../Component/courses/NewCourse";
import { getSession } from "next-auth/client";

const NewCourses = () => {
  return (
    <>
        <Course title="Courses" />    
    </>
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

export default NewCourses;
