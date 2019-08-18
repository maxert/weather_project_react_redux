import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import ListInfo from "./ReduceListInfo";
import listCity from "./ReduceListCity";
import Change from "./Change";

export default combineReducers({
  ListInfo,
  listCity,
  Change,
  routing: routerReducer,
});
