import {
  CREATE_COURSE_REQUEST,
  CREATE_COURSE_SUCCESS,
  CREATE_COURSE_FAILURE,
  CREATE_COURSE_RESET,
  GET_COURSE_REQUEST,
  GET_COURSE_SUCCESS,
  GET_COURSE_FAILURE,
  GET_SINGLE_COURSE_REQUEST,
  GET_SINGLE_COURSE_SUCCESS,
  GET_SINGLE_COURSE_FAILURE,
  ADMIN_COURSE_REQUEST,
  ADMIN_COURSE_SUCCESS,
  ADMIN_COURSE_FAIL,
  DELETE_COURSE_REQUEST,
  DELETE_COURSE_SUCCESS,
  DELETE_COURSE_FAIL,
  DELETE_COURSE_RESET,
  CLEAR_ERRORS,
} from "../constants/coursesCostants";

export const createCourseReducer = (state = { course: {} }, action) => {
  switch (action.type) {
    case CREATE_COURSE_REQUEST:
      return {
        loading: true,
      };

    case CREATE_COURSE_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        course: action.payload.course,
      };
    case CREATE_COURSE_RESET:
      return {
        success: false,
      };
    case CREATE_COURSE_FAILURE:
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

export const getCoursesReducer = (state = { course: [] }, action) => {
  switch (action.type) {
    case ADMIN_COURSE_REQUEST:
    case GET_COURSE_REQUEST:
      return {
        loading: true,
      };
    case ADMIN_COURSE_SUCCESS:
    case GET_COURSE_SUCCESS: {
      return {
        loading: false,
        course: action.payload,
      };
    }
    case ADMIN_COURSE_FAIL:
    case GET_COURSE_FAILURE: {
      return {
        loading: false,
        error: action.payload,
      };
    }

    default:
      return state;
  }
};

export const getSingleCourseReducer = (state = { course: {} }, action) => {
  switch (action.type) {
    case GET_SINGLE_COURSE_SUCCESS:
      return {
        course: action.payload,
      };

    case GET_SINGLE_COURSE_FAILURE:
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


export const courseReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_COURSE_REQUEST:
      return {
        loading: true,
      };

    case DELETE_COURSE_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_COURSE_RESET:
      return {
        loading: false,
        isDeleted: false,
      };

    case DELETE_COURSE_FAIL:
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