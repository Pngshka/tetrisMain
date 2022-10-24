import {combineReducers} from '@reduxjs/toolkit'
import controllerReducer from "../../components/controller/reducer/controller";
import modalReducer from "./modals";
import user from "./user";
import requests from "./requests";
import scene from "../../utils/scene/examples/react/redux/reducer/scene";


const rootReducer = combineReducers({
  controllerReducer,
  modalReducer,
  [requests.name]: requests.reducer,
  [user.name]: user.reducer,
  [scene.name]: scene.reducer
});


export default rootReducer;
