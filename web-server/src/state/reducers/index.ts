import { combineReducers } from "@reduxjs/toolkit";
import { Sandwich } from "../../sections/Main";
import ActionType, {
  Order,
  OrderAction,
  OrderStatusState,
  SessionAction,
  SetCurrentOrdersAction as OrderStatusListAction,
  SetSandWichAction,
  SetSandwichMenuAction,
} from "../actions/ActionTypes";

const orderStateReducer = (
  state: OrderStatusState = "default",
  action: OrderAction
) => {
  switch (action.type) {
    case ActionType.UpdateOrderStatusAction:
      return action.state;
    default:
      return state;
  }
};
type SessionState = { username: string; sessionToken: string };

const sessionStateReducer = (
  state: SessionState | null = null,
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
const orderStatusListReducer = (
  orders: Order[] = [],
  action: OrderStatusListAction
) => {
  return action.orders ?? orders;
};

const sandwichMenuReducer = (
  sandwiches: Sandwich[] = [],
  action: SetSandwichMenuAction
) => {
  return action.sandwiches ?? sandwiches;
};

const selectedSandwichReducer = (
  sandwich: Sandwich | null = null,
  action: SetSandWichAction
) => {
  switch (action.type) {
    case ActionType.SetSandWichAction:
      return action.sandwich;
    default:
      return sandwich;
  }
};

const allReducers = combineReducers({
  selectedSandwich: selectedSandwichReducer,
  session: sessionStateReducer,
  orderState: orderStateReducer,
  orderStatusList: orderStatusListReducer,
  sandwichMenu: sandwichMenuReducer,
});

export type State = ReturnType<typeof allReducers>;

export default allReducers;
