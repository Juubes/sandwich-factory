enum ActionType {
  // Sessions
  UpdateSession,
  Logout,

  // Order
}
type UpdateSessionAction = {
  type: ActionType.UpdateSession;
  username: string;
  sessionToken: string;
};
type LogOutAction = {
  type: ActionType.Logout;
};

export type SessionAction = UpdateSessionAction | LogOutAction;

export default ActionType;
