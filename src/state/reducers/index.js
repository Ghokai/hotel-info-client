import { combineReducers } from "redux";
import hotelInfoReducer from "./hotelInfoReducer";

export default combineReducers({ hotelInfo: hotelInfoReducer });
