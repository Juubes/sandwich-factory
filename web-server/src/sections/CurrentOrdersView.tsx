import { FC, ReactNode } from "react";
import { useSelector } from "react-redux";
import { OrderPrepareState } from "../components/OrderPrepareState";
import Section from "../components/Section";
import { Order } from "../state/actions/ActionTypes";
import { State } from "../state/reducers";
import clsx from "clsx";

const CurrentOrdersView: FC = () => {
  const state = useSelector((state: State) => state);

  // If for some reason a sandwich with the ID cannot be found
  state.orderStatusList.forEach((order) => {
    if (!state.sandwichMenu.find((sandwich) => sandwich.id === order.sandwich))
      return <></>;
  });

  return (
    <Section>
      <h1>Your orders</h1>

      {state.orderStatusList.map((order) => {
        return (
          <SandwichListing
            key={order.id}
            sandwichId={order.sandwich}
            order={order}
          >
            {order.sandwich}: {order.state}
          </SandwichListing>
        );
      })}
    </Section>
  );
};

const SandwichListing: FC<{
  sandwichId: number;
  order: Order;
  children?: ReactNode[];
}> = ({ sandwichId, order }) => {
  const menu = useSelector((state: State) => state.sandwichMenu);

  const sandwich = menu.find((sandwich) => sandwich.id === sandwichId)!;

  const color =
    order.state === OrderPrepareState.READY
      ? "text-green-500"
      : "text-yellow-800";

  return (
    <div className="grid">
      <button className={clsx(color, "font-bold my-2 p-5")}>
        {sandwich.name}: {OrderPrepareState[order.state]}
      </button>
    </div>
  );
};

export default CurrentOrdersView;
