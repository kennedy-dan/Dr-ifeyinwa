import {
  GET_BLOG_REQUEST,
  GET_BLOG_SUCCESS,
  GET_BLOG_FAILURE,
  CREATE_BLOG_REQUEST,
  CREATE_BLOG_SUCCESS,
  CREATE_BLOG_FAILURE,
  CREATE_BLOG_RESET,
  GET_SINGLE_BLOG_REQUEST,
  GET_SINGLE_BLOG_SUCCESS,
  GET_SINGLE_BLOG_FAILURE,
  ADMIN_BLOGS_REQUEST,
  ADMIN_BLOGS_SUCCESS,
  ADMIN_BLOGS_FAIL,
  DELETE_BLOG_REQUEST,
  DELETE_BLOG_SUCCESS,
  DELETE_BLOG_RESET,
  DELETE_BLOG_FAIL,
  CLEAR_ERRORS,
} from "../constants/blogConstant";

export const getBlogPost = (state = { posts: [] }, action) => {
  switch (action.type) {
    case ADMIN_BLOGS_REQUEST:
    case GET_BLOG_REQUEST:
      return {
        loading: true,
      };
    case ADMIN_BLOGS_SUCCESS:
    case GET_BLOG_SUCCESS: {
      return {
        loading: false,
        posts: action.payload,
      };
    }
    case ADMIN_BLOGS_FAIL:
    case GET_BLOG_FAILURE: {
      return {
        loading: false,
        error: action.payload,
      };
    }

    default:
      return state;
  }
};

export const createBlogReducer = (state = { blog: {} }, action) => {
  switch (action.type) {
    case CREATE_BLOG_REQUEST:
      return {
        loading: true,
      };

    case CREATE_BLOG_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        blog: action.payload.blog,
      };
    case CREATE_BLOG_RESET:
      return {
        success: false,
      };
    case CREATE_BLOG_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        // ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const getSingleBlog = (state = { blog: {} }, action) => {
  switch (action.type) {
    case GET_SINGLE_BLOG_REQUEST:
      return {
        loading: true
      }
    case GET_SINGLE_BLOG_SUCCESS:
      return {
        blog: action.payload,
      };

    case GET_SINGLE_BLOG_FAILURE:
      return {
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const blogReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_BLOG_REQUEST:
      return {
        loading: true,
      };

    case DELETE_BLOG_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_BLOG_RESET:
      return {
        loading: false,
        isDeleted: false,
      };

    case DELETE_BLOG_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
