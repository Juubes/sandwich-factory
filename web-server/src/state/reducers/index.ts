import sessionStateReducer from "./sessionStateReducer";

const allReducers = sessionStateReducer;

export default allReducers;

export type State = ReturnType<typeof allReducers>