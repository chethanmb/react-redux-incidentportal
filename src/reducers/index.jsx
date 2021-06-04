import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import incident from "./incident";

export default combineReducers({
  auth,
  message,
  incident,
});
