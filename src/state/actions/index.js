import axios from "axios";

import {
  FILE_UPLOADING,
  FILE_UPLOADING_SUCCESS,
  FILE_UPLOADING_FAIL,
  FILE_VALIDATING,
  FILE_VALIDATING_SUCCESS,
  FILE_VALIDATING_FAIL,
  SET_WARNING
} from "../actions/types";

import { BACKEND_URI } from "../../backendUri";

export const uploadFile = formData => {
  return async dispatch => {
    dispatch({ type: FILE_UPLOADING, payload: "File is uploading..." });

    try {
      await axios.post(BACKEND_URI + "/api/HotelInfo/Upload", formData);

      dispatch({
        type: FILE_UPLOADING_SUCCESS,
        payload: "File successfully uploaded to server"
      });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: FILE_UPLOADING_FAIL,
          payload: error.response.data.error
        });
      } else {
        dispatch({
          type: SET_WARNING,
          payload:
            "Server (" +
            BACKEND_URI +
            ")  did not response, may be it is not alive or server uri is not correct :("
        });
      }
    }
  };
};

export const validateFile = formData => {
  return async dispatch => {
    dispatch({
      type: FILE_VALIDATING,
      payload: "File is validating..."
    });

    try {
      const response = await axios.post(
        BACKEND_URI + "/api/HotelInfo/Validate",
        formData
      );

      dispatch({
        type: FILE_VALIDATING_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: FILE_VALIDATING_FAIL,
          payload: error.response.data.error
        });
      } else {
        dispatch({
          type: SET_WARNING,
          payload:
            "Server (" +
            BACKEND_URI +
            ")  did not response, may be it is not alive or server uri is not correct :("
        });
      }
    }
  };
};

export const setWarning = message => {
  return { type: SET_WARNING, payload: message };
};
