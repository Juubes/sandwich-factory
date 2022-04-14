import { FC, useContext } from "react";
import { useDispatch } from "react-redux";
import { useAuthErrorContext } from "../contexts/AuthErrorContext";
import { updateSessionState } from "../state/action-creators/actionCreators";
import GenericForm from "./GenericForm";
import Section from "./Section";

const RegisterForm: FC<{ closeHook: Function }> = ({ closeHook }) => {
  const { setError } = useAuthErrorContext();
  const dispatch = useDispatch();

  const submit = async (username: string, password: string) => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_GATEWAY_URL + "user/register",
        {
          method: "POST",
          body: JSON.stringify({ username, password }),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.status === 403) {
        setError("Account already registered! Login instead.");
        return;
      }

      const data = await res.json();

      dispatch(updateSessionState(data.token, data.username));
    } catch (ex) {
      setError("Error on register: " + ex);
    }
  };
  return (
    <Section>
      <h1>Register</h1>

      <GenericForm submit={submit} submitBtnText="Register" />

      <p
        className="mt-8"
        onClick={() => {
          closeHook();
        }}
      >
        <a href="#">Want to login instead?</a>
      </p>
    </Section>
  );
};
export default RegisterForm;
