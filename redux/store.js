import {configureStore} from '@reduxjs/toolkit'
import rootReducer from "./reducer/rootReducer";
import requests from "./reducer/requests";
import scene from "../utils/scene/examples/react/redux/reducer/scene";

const preloadedState = {};

const store = configureStore({
  reducer: rootReducer,
  preloadedState
});

if (global.window)
  store.dispatch(requests.thunks.profile());

export default store;
