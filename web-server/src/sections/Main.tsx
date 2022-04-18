import { useSelector } from "react-redux";
import LoggedInView from "./LoggedInView";
import NoSessionView from "./NoSessionView";
import { State } from "../state/reducers";
import SandwichMenu from "./SandwichMenu";
import WhatsInside from "./OrderView";
import EventSource from "eventsource";
import { useEffect } from "react";
import CurrentOrdersView from "./CurrentOrdersView";

export type Sandwich = {
  id: number;
  name: string;
  breadType: string;
  toppings: [];
};

function Main() {
  const { session, selectedSandwich, orderStatusList } = useSelector(
    (state: State) => state
  );

  const sections = [];

  // Build sections
  if (session) {
    sections.push(<LoggedInView key="liw" />);
    sections.push(<SandwichMenu key="of" />);

    if (selectedSandwich) sections.push(<WhatsInside key="wi" />);

    if (orderStatusList) {
      sections.push(<CurrentOrdersView key={"cov"} />);
    }
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
        <h2 className="pt-5">Orders take 20 seconds to prepare.</h2>
      </div>

      {sections}
    </main>
  );
}

export default Main;
