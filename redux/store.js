import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "./reducer/rootReducer";
import requests from "./reducer/requests";
import scene from "./reducer/scene";

const preloadedState = {};

const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  [scene.name]: scene.reducer
});

if (global.window)
  store.dispatch(requests.thunks.profile());

export default store;
