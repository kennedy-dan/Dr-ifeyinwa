import React from 'react'
import CourseItem  from "../../Component/courses/Courses";
import { getSession } from "next-auth/client";

const Courses = () => {
    return (
        <div>
            <CourseItem title="Courses"/>
        </div>
    )
}

export default Courses


export async function getServerSideProps(context) {
    const session = await getSession({ req: context.req });
  
    if (!session) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
  
    return {
      props: { session },
    };
  }