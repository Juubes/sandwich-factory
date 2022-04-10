import { Sandwich } from "../../components/Main";

enum ActionType {
  // Sessions
  UpdateSession,
  Logout,

  // Order
  UpdateOrderStatusAction,

  // Sandwich
  SetSandWichAction,
}
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
  sandwich: Sandwich;
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
