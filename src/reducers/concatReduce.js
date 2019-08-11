import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import ListInfo from "./ReduceListInfo";
import listCity from "./ReduceListCity";

export default combineReducers({
  ListInfo,
  listCity,
  routing: routerReducer,
});
