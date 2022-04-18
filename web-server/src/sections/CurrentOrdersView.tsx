import { FC } from "react";
import { useSelector } from "react-redux";
import Section from "../components/Section";
import { State } from "../state/reducers";

const CurrentOrdersView: FC = () => {
  const state = useSelector((state: State) => state);

  return (
    <Section>
      <h1>Your orders</h1>

      {state.setCurrentOrders.map((order) => {
        return (
          <p key={order.id}>
            {order.sandwich}: {order.state}
          </p>
        );
      })}
    </Section>
  );
};

export default CurrentOrdersView;
