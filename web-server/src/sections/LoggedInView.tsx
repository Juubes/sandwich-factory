import { useDispatch, useSelector } from "react-redux";
import OrderForm from "./OrderForm";
import Section from "../components/Section";
import { State } from "../state/reducers";
import { logout } from "../state/action-creators/actionCreators";

/** Displayed for authenticated users */
const LoggedInView = () => {
  const username = useSelector((state: State) => state.session?.username);
  const dispatch = useDispatch();
  return (
    <>
      <Section>
        <h2>Logged in as {username}.</h2>

        <button
          onClick={() => {
            dispatch(logout());
          }}
        >
          Logout
        </button>
      </Section>
      <OrderForm />
    </>
  );
};

export default LoggedInView;
