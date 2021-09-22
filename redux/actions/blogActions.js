import axios from "axios";
import absoluteUrl from "next-absolute-url";

import {
  GET_BLOG_REQUEST,
  GET_BLOG_SUCCESS,
  GET_BLOG_FAILURE,
  CREATE_BLOG_REQUEST,
  CREATE_BLOG_SUCCESS,
  CREATE_BLOG_FAILURE,
  GET_SINGLE_BLOG_REQUEST,
  GET_SINGLE_BLOG_FAILURE,
  GET_SINGLE_BLOG_SUCCESS,
  ADMIN_BLOGS_REQUEST,
  ADMIN_BLOGS_SUCCESS,
  ADMIN_BLOGS_FAIL,
  DELETE_BLOG_REQUEST,
  DELETE_BLOG_SUCCESS,
  DELETE_BLOG_RESET,
  DELETE_BLOG_FAIL,
  CLEAR_ERRORS,
} from "../constants/blogConstant";

export const getBlogPost = () => async (dispatch) => {
  try {
    dispatch({ type: GET_BLOG_REQUEST });

    const { data } = await axios.get(`/api/blogs`);
    console.log(data.posts);

    dispatch({
      type: GET_BLOG_SUCCESS,
      payload: data.posts,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_BLOG_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const createBlog = (blogData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_BLOG_REQUEST });

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(`/api/blogs`, blogData, config);

    dispatch({
      type: CREATE_BLOG_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_BLOG_FAILURE,
      payload: error.response.data.message,
    });
  }
};


// Get room details
export const getSingleBlog = (req, id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_BLOG_REQUEST });

    const { origin } = absoluteUrl(req);

    let url;

    if (req) {
      url = `${origin}/api/blogs/${id}`;
    } else {
      url = `/api/blogs/${id}`;
    }

    const { data } = await axios.get(url);

    dispatch({
      type: GET_SINGLE_BLOG_SUCCESS,
      payload: data.blog,
    });
  } catch (error) {
    console.log()
    dispatch({
      type: GET_SINGLE_BLOG_FAILURE,
      payload: error.response.data.message,
    });
  }
};


export const deleteBlog = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_BLOG_REQUEST });

    const { data } = await axios.delete(`/api/blogs/${id}`);

    dispatch({
      type: DELETE_BLOG_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_BLOG_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get all rooms - ADMIN
export const getAdminBlogs = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_BLOGS_REQUEST });

    const { data } = await axios.get(`/api/admin/blogs`);
    dispatch({
      type: ADMIN_BLOGS_SUCCESS,
      payload: data.posts,
    });
  } catch (error) {
    console.log(error);

    dispatch({
      type: ADMIN_BLOGS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
