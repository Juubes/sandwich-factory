import * as React from "react";
import { FC } from "react";

class User {
  username: string;
  token: string;

  constructor(username: string, token: string) {
    this.username = username;
    this.token = token;
  }
}
export function useSession() {
  return React.useContext(sessionContext);
}

const sessionContext = React.createContext<{
  session: User | null;
  updateSession: Function;
}>({ session: null, updateSession: () => {} });

/**
 * A context to store the state of the user's authentication and session information.
 */
const SessionContext: FC = ({ children }) => {
  let [session, setSession] = React.useState(null);

  const updateSession = () => {
    setSession(null);
    // TODO
  };

  const value = { session, updateSession };

  return (
    <sessionContext.Provider value={value}>{children}</sessionContext.Provider>
  );
};

export default SessionContext;
