import {
  CREATE_PDF_REQUEST,
  CREATE_PDF_SUCCESS,
  CREATE_PDF_FAILURE,
  CREATE_PDF_RESET,
  GET_PDF_REQUEST,
  GET_PDF_SUCCESS,
  GET_PDF_FAILURE,
  GET_PDF_RESET,
  GET_PDF_BY_ID_REQUEST,
  GET_PDF_BY_ID_SUCCESS,
  GET_PDF_BY_ID_FAILURE,
  GET_PDF_BY_ID_RESET,
  DELETE_PDF_REQUEST,
  DELETE_PDF_SUCCESS,
  DELETE_PDF_FAILURE,
  DELETE_PDF_RESET,
  CLEAR_ERRORS,

} from "../constants/pdfConstants";

export const createpdfReducer = (state = { pdf: {} }, action) => {
  switch (action.type) {
    case CREATE_PDF_REQUEST:
      return {
        loading: true,
      };

    case CREATE_PDF_SUCCESS:
      return {
        loading: false,
        successs: action.payload.successs,
        invoice: action.payload.invoice,
      };

    case CREATE_PDF_FAILURE:
      return {
        loading: false,
        err: action.payload,
      };

    default:
      return state;
  }
};

export const getPdfs = (state = { pdf: [] }, action) => {
  switch (action.type) {
    case GET_PDF_REQUEST:
      return {
        loading: true,
      };
    case GET_PDF_SUCCESS: {
      return {
        loading: false,
        pdf: action.payload,
      };
    }
    case GET_PDF_FAILURE: {
      return {
        loading: false,
        error: action.payload,
      };
    }

    default:
      return state;
  }
};


export const deletePdfReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PDF_REQUEST:
      return {
        loading: true,
      };

    case DELETE_PDF_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_PDF_RESET:
      return {
        loading: false,
        isDeleted: false,
      };

    case DELETE_PDF_FAILURE:
      return {
        loading: false,
        err: action.payload,
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