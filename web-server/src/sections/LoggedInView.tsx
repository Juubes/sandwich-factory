import { useSelector } from "react-redux";
import OrderForm from "./OrderForm";
import Section from "../components/Section";
import { State } from "../state/reducers";

/** Displayed for authenticated users */
const LoggedInView = () => {
  const username = useSelector((state: State) => state.session?.username);

  return (
    <>
      <Section>
        <h2>Logged in as {username}.</h2>
      </Section>
      <OrderForm />
    </>
  );
};

export default LoggedInView;
