import axios from "axios";
import absoluteUrl from "next-absolute-url";

import {
  CREATE_MESSAGE_REQUEST,
  CREATE_MESSAGE_SUCCESS,
  CREATE_MESSAGE_FAILURE,
  CREATE_MESSAGE_RESET,
  GET_MESSAGE_REQUEST,
  GET_MESSAGE_SUCCESS,
  GET_MESSAGE_RESET,
  GET_MESSAGE_FAILURE,
  DELETE_MESSAGE_REQUEST,
  DELETE_MESSAGE_SUCCESS,
  DELETE_MESSAGE_RESET,
  DELETE_MESSAGE_FAIL,
  CLEAR_ERRORS,
} from "../constants/messageConstants";

export const createMessage = (msg) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_MESSAGE_REQUEST });

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(`/api/messages`, msg, config);

    dispatch({
      type: CREATE_MESSAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_MESSAGE_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const getMessages = () => async (dispatch) => {
  try {
    dispatch({ type: GET_MESSAGE_REQUEST });

    const { data } = await axios.get(`/api/messages`);

    dispatch({
      type: GET_MESSAGE_SUCCESS,
      payload: data.messages,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_MESSAGE_FAILURE,
      payload: error.response.data.message,
    });
  }
};


export const deleteMessage = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_MESSAGE_REQUEST });

    const { data } = await axios.delete(`/api/messages/${id}`);

    dispatch({
      type: DELETE_MESSAGE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_MESSAGE_FAIL,
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
