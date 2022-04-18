import { OrderPrepareState } from "../../components/OrderPrepareState";
import { Sandwich } from "../../sections/Main";

enum ActionType {
  // Sessions
  UpdateSession,
  Logout,

  // Order
  UpdateOrderStatusAction,
  SetCurrentOrdersAction,

  // Sandwich
  SetSandWichAction,
}
export type Order = { id: number; sandwich: number; state: OrderPrepareState };

export type SetCurrentOrdersAction = {
  type: ActionType.SetCurrentOrdersAction;
  orders: Order[];
};

type UpdateSessionAction = {
  type: ActionType.UpdateSession;
  username: string;
  sessionToken: string;
};
type LogOutAction = {
  type: ActionType.Logout;
};
export type SetSandWichAction = {
  type: ActionType.SetSandWichAction;
  sandwich: Sandwich | null;
};

export type OrderStatusState =
  | "default"
  | "sending order"
  | "order sent"
  | "order failed";

export type SessionAction = UpdateSessionAction | LogOutAction;

type UpdateOrderStateAction = {
  type: ActionType.UpdateOrderStatusAction;
  state: OrderStatusState;
};

export type OrderAction = UpdateOrderStateAction;

export default ActionType;
