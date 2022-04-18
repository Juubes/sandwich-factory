import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import Section from "../components/Section";
import {
  AuthContextProvider,
  useAuthErrorContext
} from "../contexts/AuthErrorContext";
import { updateSessionState } from "../state/action-creators/actionCreators";
import { State } from "../state/reducers";

type AuthenticatingState = "no action" | "registering" | "logging in";

/** Displayed for non-authenticated users */
const NoSessionView = () => {
  const [state, setState] = useState<AuthenticatingState>("no action");
  const dispatch = useDispatch();
  const { setError } = useAuthErrorContext();
  const session = useSelector((state: State) => state.session);

  let SelectedForm = state === "registering" ? RegisterForm : LoginForm;

  // Restore auth state
  useEffect(() => {
    if (session) return;

    const token = self.window.localStorage.getItem("sessionToken");
    const username = self.window.localStorage.getItem("username");

    if (token && username) {
      dispatch(updateSessionState(token, username));
    }
  }, [dispatch, session]);

  return (
    <>
      {state === "no action" && (
        <Section>
          <h2>You are not yet logged in</h2>
          <div className="flex gap-5">
            <button
              onClick={() => {
                setState("registering");
              }}
            >
              Register
            </button>
            <button
              onClick={() => {
                setState("logging in");
              }}
            >
              Login
            </button>
          </div>
        </Section>
      )}
      {state !== "no action" && (
        <AuthContextProvider>
          <SelectedForm
            closeHook={() => {
              setState("no action");
              setError(null);
            }}
          />
        </AuthContextProvider>
      )}
    </>
  );
};

export default NoSessionView;
