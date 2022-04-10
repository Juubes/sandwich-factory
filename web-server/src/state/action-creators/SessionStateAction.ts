import { Dispatch } from "react";
import ActionType, { SessionAction } from "../actions/ActionTypes";

export const updateSessionState = (sessionToken: string, username: string) => {
  return (dispatch: Dispatch<SessionAction>) => {
    dispatch({ type: ActionType.UpdateSession, username, sessionToken });
  };
};

export const logout = () => {
  return (dispatch: Dispatch<SessionAction>) => {
    dispatch({ type: ActionType.Logout });
  };
};
