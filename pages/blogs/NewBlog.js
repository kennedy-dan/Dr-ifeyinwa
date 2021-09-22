import NewBlog from "../../Component/blog/NewBlog";
import { getSession } from "next-auth/client";


const RoomDetailsPage = () => {
  return (
    <>
      <NewBlog title="Room Details" />
    </>
  );
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

  export default RoomDetailsPage