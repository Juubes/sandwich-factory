import { createContext, FC, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import Section from "../components/Section";
import { updateSessionState } from "../state/action-creators/actionCreators";

type AuthenticatingState = "no action" | "registering" | "logging in";

const errorContext = createContext<{
  error: string | null;
  setError: Function;
}>({ error: null, setError: () => {} });

/** Displayed for non-authenticated users */
const NoSessionView = () => {
  const [state, setState] = useState<AuthenticatingState>("no action");
  const [error, setError] = useState<string | null>(null);

  return (
    <errorContext.Provider value={{ error, setError }}>
      {state === "no action" && (
        <Section>
          <h2>You are not yet logged in</h2>
          <div className="flex gap-5">
            <button onClick={() => setState("registering")}>Register</button>
            <button onClick={() => setState("logging in")}>Login</button>
          </div>
        </Section>
      )}
      {state === "registering" && <RegisterForm />}
      {state === "logging in" && <LoginForm />}
    </errorContext.Provider>
  );
};

const Error = () => {
  const { error } = useContext(errorContext);
  if (!error) return <></>;
  return <p className="text-red-600 pt-5">{error}</p>;
};

type GenericFormProps = {
  submit: Function;
  submitBtnText: string;
};
const GenericForm: FC<GenericFormProps> = ({ submit, submitBtnText }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form className="grid" action="">
      <h2>Username</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        placeholder="Username"
        autoFocus
      />

      <h2>Password</h2>
      <input
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="Password"
      />

      <Error />

      <button
        className="mt-6"
        onClick={(e) => {
          e.preventDefault();
          submit(username, password);
        }}
      >
        {submitBtnText}
      </button>
    </form>
  );
};

const RegisterForm = () => {
  const { setError } = useContext(errorContext);
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

      if (res.status != 200) {
        // TODO: get token and update global auth state
        setError("Error on register: " + res.status);
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
    </Section>
  );
};

const LoginForm = () => {
  const submit = () => {};
  return (
    <Section>
      <h1>Login</h1>

      <GenericForm submit={submit} submitBtnText="Login" />
    </Section>
  );
};
export default NoSessionView;
