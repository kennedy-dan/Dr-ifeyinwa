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
  CLEAR_ERRORS
} from "../constants/messageConstants";

export const createMessageReducer = (state = { message: {} }, action) => {
  switch (action.type) {
    case CREATE_MESSAGE_REQUEST:
      return {
        loading: true,
      };

    case CREATE_MESSAGE_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        message: action.payload.message,
      };
    case CREATE_MESSAGE_RESET:
      return {
        success: false,
      };
    case CREATE_MESSAGE_FAILURE:
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


export const createMessagesReducer = (state = { message: {} }, action) => {
  switch (action.type) {
    case CREATE_MESSAGE_REQUEST:
      return {
        loading: true,
      };

    case CREATE_MESSAGE_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        message: action.payload.message,
      };
    case CREATE_MESSAGE_RESET:
      return {
        success: false,
      };
    case CREATE_MESSAGE_FAILURE:
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


export const getMessages = (state = { messages: [] }, action) => {
  switch (action.type) {
    case GET_MESSAGE_REQUEST:
      return {
        loading: true,
      };
    case GET_MESSAGE_SUCCESS: {
      return {
        loading: false,
        messages: action.payload,
      };
    }
    case GET_MESSAGE_FAILURE: {
      return {
        loading: false,
        error: action.payload,
      };
    }

    default:
      return state;
  }
};


export const messageReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_MESSAGE_REQUEST:
      return {
        loading: true,
      };

    case DELETE_MESSAGE_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_MESSAGE_RESET:
      return {
        loading: false,
        isDeleted: false,
      };

    case DELETE_MESSAGE_FAIL:
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