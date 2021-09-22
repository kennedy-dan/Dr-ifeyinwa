import axios from "axios";
import absoluteUrl from "next-absolute-url";

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

  CLEAR_ERRORS,

} from "../constants/coursesCostants";

export const createCourses = (courses) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_COURSE_REQUEST });

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(`/api/courses`, courses, config);

    dispatch({
      type: CREATE_COURSE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: CREATE_COURSE_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const getCourses = () => async (dispatch) => {
  try {
    dispatch({ type: GET_COURSE_REQUEST });

    const { data } = await axios.get(`/api/courses`);

    dispatch({
      type: GET_COURSE_SUCCESS,
      payload: data.course,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_COURSE_FAILURE,
      payload: error.response.data.message,
    });
  }
};


export const getSingleCourse = (req, id) => async (dispatch) => {
  try {
    const { origin } = absoluteUrl(req);

    let url;

    if (req) {
      url = `${origin}/api/courses/${id}`;
    } else {
      url = `/api/courses/${id}`;
    }

    const { data } = await axios.get(url);

    dispatch({
      type: GET_SINGLE_COURSE_SUCCESS,
      payload: data.course,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_COURSE_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const getDownlaodCourse = (req, id) => async (dispatch) => {
  try {
    const { origin } = absoluteUrl(req);

    let url;

    if (req) {
      url = `${origin}/api/courses/${id}`;
    } else {
      url = `/api/courses/${id}`;
    }

    const { data } = await axios.get(url);

    dispatch({
      type: GET_SINGLE_COURSE_SUCCESS,
      payload: data.course,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_COURSE_FAILURE,
      payload: error.response.data.message,
    });
  }
};


// Get all rooms - ADMIN
export const getAdmincourse = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_COURSE_REQUEST });

    const { data } = await axios.get(`/api/admin/courses`);
    dispatch({
      type: ADMIN_COURSE_SUCCESS,
      payload: data.course,
    });
  } catch (error) {
    console.log(error);

    dispatch({
      type: ADMIN_COURSE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteCourse = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_COURSE_REQUEST });

    const { data } = await axios.delete(`/api/courses/${id}`);

    dispatch({
      type: DELETE_COURSE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_COURSE_FAIL,
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
