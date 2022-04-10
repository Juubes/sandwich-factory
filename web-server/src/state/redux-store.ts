import { applyMiddleware, createStore } from "@reduxjs/toolkit";
import allReducers from "./reducers";
import thunk from "redux-thunk";

export const store = createStore(allReducers, null, applyMiddleware(thunk));
