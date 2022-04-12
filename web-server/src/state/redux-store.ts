import { applyMiddleware, createStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import allReducers from "./reducers";

export const store = createStore(allReducers, {}, applyMiddleware(thunk));

export type RootState = ReturnType<typeof allReducers>;
