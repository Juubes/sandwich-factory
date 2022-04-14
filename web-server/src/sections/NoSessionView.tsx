import { createContext, FC, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import Form from "../components/Form";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import Section from "../components/Section";
import {
  AuthContextProvider,
  useAuthErrorContext,
} from "../contexts/AuthErrorContext";
import { updateSessionState } from "../state/action-creators/actionCreators";

type AuthenticatingState = "no action" | "registering" | "logging in";

/** Displayed for non-authenticated users */
const NoSessionView = () => {
  const [state, setState] = useState<AuthenticatingState>("no action");

  const { setError } = useAuthErrorContext();

  let SelectedForm = state === "registering" ? RegisterForm : LoginForm;

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
