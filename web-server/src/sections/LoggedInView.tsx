import { useDispatch, useSelector } from "react-redux";
import OrderForm from "./OrderForm";
import Section from "../components/Section";
import { State } from "../state/reducers";
import {
  logout,
  setSelectedSandwich,
  updateOrderStatus,
} from "../state/action-creators/actionCreators";

/** Displayed for authenticated users */
const LoggedInView = () => {
  const session = useSelector((state: State) => state.session);
  const { username, sessionToken } = session!;

  const dispatch = useDispatch();
  return (
    <>
      <Section>
        <h2>Logged in as {username}.</h2>

        <button
          onClick={() => {
            fetch(process.env.NEXT_PUBLIC_GATEWAY_URL + "user/logout", {
              method: "POST",
              headers: {
                Authorization: sessionToken,
                "Content-Type": "application/json",
              },
            })
              .then(async (response) => {
                if (response.status === 200) {
                  dispatch(logout());
                  dispatch(setSelectedSandwich(null));
                  dispatch(updateOrderStatus("default"));
                  return;
                }
              })
              .catch((ex) => {
                dispatch(logout());
                console.error(ex);
              });
          }}
        >
          Logout
        </button>
      </Section>
    </>
  );
};

export default LoggedInView;
