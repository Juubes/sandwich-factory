import { Dispatch } from "react";
import { Sandwich } from "../../sections/Main";
import ActionType, {
  OrderAction,
  OrderStatusState,
  SessionAction,
  SetSandWichAction,
} from "../actions/ActionTypes";

export const updateSessionState = (sessionToken: string, username: string) => {
  return (dispatch: Dispatch<SessionAction>) => {
    dispatch({ type: ActionType.UpdateSession, username, sessionToken });
  };
};

export const updateOrderStatus = (state: OrderStatusState) => {
  return (dispatch: Dispatch<OrderAction>) => {
    dispatch({ type: ActionType.UpdateOrderStatusAction, state });
  };
};

export const logout = () => {
  return (dispatch: Dispatch<SessionAction>) => {
    dispatch({ type: ActionType.Logout });
  };
};

export const setSelectedSandwich = (sandwich: Sandwich) => {
  return (dispatch: Dispatch<SetSandWichAction>) => {
    dispatch({ type: ActionType.SetSandWichAction, sandwich });
  };
};
