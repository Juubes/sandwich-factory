import { useDispatch, useSelector } from "react-redux";
import SandwichMenu from "./SandwichMenu";
import Section from "../components/Section";
import { State } from "../state/reducers";
import {
  logout,
  setSelectedSandwich,
  updateOrderStatus,
} from "../state/action-creators/actionCreators";
import { useEffect } from "react";

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
            }).catch((ex) => {
              console.error(ex);
            });
            dispatch(logout());
            dispatch(setSelectedSandwich(null));
            dispatch(updateOrderStatus("default"));
          }}
        >
          Logout
        </button>
      </Section>
    </>
  );
};

export default LoggedInView;
