import { useSelector } from "react-redux";
import LoggedInView from "./LoggedInView";
import NoSessionView from "./NoSessionView";
import { State } from "../state/reducers";
import OrderForm from "./OrderForm";
import WhatsInside from "./WhatsInside";

export type Sandwich = {
  id: number;
  name: string;
  breadType: string;
  toppings: [];
};

function Main() {
  const { session, selectedSandwich } = useSelector((state: State) => state);

  const sections = [];

  // Build sections
  if (session) {
    sections.push(<LoggedInView key="liw" />);
    sections.push(<OrderForm key="of" />);

    if (selectedSandwich) sections.push(<WhatsInside key="wi" />);
  } else {
    sections.push(<NoSessionView key="nsw" />);
  }

  return (
    <main className="yellow max-w-5xl mx-auto">
      <div className="mx-auto max-w-7xl bg-[#CFA200] px-10 py-4 mt-10 shadow-lg">
        <h1>Welcome to SandwichFactory!</h1>

        <h2>How to make an order?</h2>

        <p>1. Login or register</p>
        <p>2. Create an order</p>
        <p>3. Wait for your sandwich.</p>
        <p>{"4. You will get a notification when it's ready!"}</p>
      </div>

      {sections}
    </main>
  );
}

export default Main;
