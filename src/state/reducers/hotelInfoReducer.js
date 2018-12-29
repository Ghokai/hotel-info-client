import {
  FILE_UPLOADING,
  FILE_UPLOADING_SUCCESS,
  FILE_UPLOADING_FAIL,
  FILE_VALIDATING,
  FILE_VALIDATING_SUCCESS,
  FILE_VALIDATING_FAIL,
  SET_WARNING
} from "../actions/types";

export default (
  state = {
    status: null,
    operationMessage: "",
    hotelInfoList: []
  },
  action
) => {
  switch (action.type) {
    case FILE_UPLOADING:
    case FILE_VALIDATING:
      return {
        hotelInfoList: [],
        status: 0,
        operationMessage: action.payload
      };
    case FILE_UPLOADING_FAIL:
    case FILE_VALIDATING_FAIL:
    case SET_WARNING:
      return {
        ...state,
        status: -1,
        operationMessage: action.payload
      };
    case FILE_UPLOADING_SUCCESS:
      return {
        ...state,
        status: 1,
        operationMessage: action.payload
      };
    case FILE_VALIDATING_SUCCESS:
      return {
        status: 1,
        operationMessage: "File validated",
        hotelInfoList: action.payload
      };
    default:
      return state;
  }
};
