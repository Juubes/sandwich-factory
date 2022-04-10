import ActionType, { SessionAction } from "../actions/ActionTypes";

type SessionState = { username: string; sessionToken: string } | null;

const sessionStateReducer = (
  state: SessionState = null,
  action: SessionAction
) => {

  switch (action.type) {
    case ActionType.UpdateSession:
      return { username: action.username, sessionToken: action.sessionToken };
    case ActionType.Logout:
      return null;
    default:
      return state;
  }
};

export default sessionStateReducer;
