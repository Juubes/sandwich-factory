import { FC, useContext } from "react";
import { useDispatch } from "react-redux";
import { useAuthErrorContext } from "../contexts/AuthErrorContext";
import { updateSessionState } from "../state/action-creators/actionCreators";
import GenericForm from "./GenericForm";
import Section from "./Section";

const LoginForm: FC<{ closeHook: Function }> = ({ closeHook }) => {
  const { setError } = useAuthErrorContext();
  const dispatch = useDispatch();

  const submit = async (username: string, password: string) => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_GATEWAY_URL + "user/login",
        {
          method: "POST",
          body: JSON.stringify({ username, password }),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.status === 403) {
        setError("Invalid username or password.");
        return;
      }

      const data = await res.json();
      dispatch(updateSessionState(data.token, data.username));
    } catch (ex) {
      setError("Error on login: " + ex);
    }
  };
  return (
    <Section>
      <h1>Login</h1>

      <GenericForm submit={submit} submitBtnText="Login" />
      <p
        className="mt-8"
        onClick={() => {
          closeHook();
        }}
      >
        <a href="#">Want to register instead?</a>
      </p>
    </Section>
  );
};

export default LoginForm;
