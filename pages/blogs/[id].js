import BlogDetail from "../../Component/blog/BlogDetail";
import Layout from "../../Component/layout";
import { useDispatch, useSelector } from "react-redux";


import { getSingleBlog, getBlogPost } from "../../redux/actions/blogActions";

import { wrapper } from "../../redux/store";

const RoomDetailsPage = () => {


  return (
    // <Layout>
      <BlogDetail title="Room Details" />
    // {/* </Layout> */}
  );
}


export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, params }) => {
    await store.dispatch(getSingleBlog(req, params.id))
})

export default RoomDetailsPage