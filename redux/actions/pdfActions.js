import axios from "axios";

import {
    CREATE_PDF_REQUEST,
    CREATE_PDF_SUCCESS,
    CREATE_PDF_FAILURE,
    CREATE_PDF_RESET,
    GET_PDF_FAILURE,
    GET_PDF_SUCCESS,
    GET_PDF_REQUEST,
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


  export const createPdf = (pdf) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_PDF_REQUEST });
  
      const config = {
        header: {
          "Content-Type": "application/json",
        },
      };
  
      const { data } = await axios.post(`/api/pdfs`, pdf, config);
  
      dispatch({
        type: CREATE_PDF_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: CREATE_PDF_FAILURE,
        payload: err.response.data.message,
      });
    }
  };


  export const getPdfs = () => async (dispatch) => {
    try {
      dispatch({ type: GET_PDF_REQUEST });
  
      const { data } = await axios.get(`/api/pdfs`);
  
      dispatch({
        type: GET_PDF_SUCCESS,
        payload: data.pdf,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_PDF_FAILURE,
        payload: error.response.data.message,
      });
    }
  };



  export const deletePdfs = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_PDF_REQUEST });
  
      const { data } = await axios.delete(`/api/pdfs/${id}`);
  
      dispatch({
        type: DELETE_PDF_SUCCESS,
        payload: data.successs,
      });
    } catch (err) {
      dispatch({
        type: DELETE_PDF_FAILURE,
        payload: err.response.data.message,
      });
    }
  };


  export const clearError = () => async (dispatch) => {
    dispatch({
      type: CLEAR_ERRORS,
    });
  };