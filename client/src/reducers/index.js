import { combineReducers } from "redux";
import alerts from "./alert";
import auths from "./auth";
export default combineReducers({
    alerts,
    auths
});