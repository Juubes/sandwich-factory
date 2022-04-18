import { Dispatch } from "react";
import { Sandwich } from "../../sections/Main";
import ActionType, {
  Order,
  OrderAction,
  OrderStatusState,
  SessionAction,
  SetCurrentOrdersAction,
  SetSandWichAction,
} from "../actions/ActionTypes";

export const updateSessionState = (sessionToken: string, username: string) => {
  self.window.localStorage.setItem("sessionToken", sessionToken);
  self.window.localStorage.setItem("username", username);

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
  self.window.localStorage.removeItem("sessionToken");
  self.window.localStorage.removeItem("username");

  return (dispatch: Dispatch<SessionAction>) => {
    dispatch({ type: ActionType.Logout });
  };
};

export const setSelectedSandwich = (sandwich: Sandwich | null) => {
  return (dispatch: Dispatch<SetSandWichAction>) => {
    dispatch({ type: ActionType.SetSandWichAction, sandwich });
  };
};

export const setCurrentOrders = (orders: Order[]) => {
  return (dispatch: Dispatch<SetCurrentOrdersAction>) => {
    dispatch({ type: ActionType.SetCurrentOrdersAction, orders });
  };
};
