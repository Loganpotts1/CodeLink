import { combineReducers } from "redux";
import alerts from "./alert";
import auth from "./auth";
export default combineReducers({
    alerts,
    auth
});