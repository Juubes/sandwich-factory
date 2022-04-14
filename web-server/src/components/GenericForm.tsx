import { FC, useState } from "react";
import { useAuthErrorContext } from "../contexts/AuthErrorContext";
import Form from "./Form";

type GenericFormProps = {
  submit: Function;
  submitBtnText: string;
};

const GenericForm: FC<GenericFormProps> = ({ submit, submitBtnText }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Form>
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

      <AuthError />

      <button
        className="mt-6"
        onClick={(e) => {
          e.preventDefault();
          submit(username, password);
        }}
      >
        {submitBtnText}
      </button>
    </Form>
  );
};
const AuthError = () => {
  const { error } = useAuthErrorContext();
  if (!error) return <></>;
  return <p className="text-red-600 pt-5">{error}</p>;
};

export default GenericForm;
