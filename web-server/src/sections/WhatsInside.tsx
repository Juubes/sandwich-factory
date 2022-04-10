import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Sandwich } from "../components/Main";
import Section from "../components/Section";
import { updateOrderStatus } from "../state/action-creators/actionCreators";
import { OrderStatusState } from "../state/actions/ActionTypes";
import { State } from "../state/reducers";

const WhatsInside: FC = () => {
  const { selectedSandwich, orderState } = useSelector((state: State) => state);

  const dispatch = useDispatch();

  const setOrderingStatus = (newState: OrderStatusState) => {
    dispatch(updateOrderStatus(newState));
  };

  function orderSandwich(sandwichId: number) {
    setOrderingStatus("sending order");

    fetch(process.env.NEXT_PUBLIC_GATEWAY_URL + "order", {
      method: "POST",
      body: JSON.stringify(sandwichId),
    })
      .then((res) => {
        if (res.status == 200) {
          setOrderingStatus("order sent");
          return;
        }

        setOrderingStatus("order failed");
        console.error("Ordering failed with status code: " + res.status);
      })
      .catch((ex) => {
        setOrderingStatus("order failed");
        console.log(ex);
      });
  }

  return (
    <Section>
      <h2>What's inside?</h2>
      <ToppingsListing {...selectedSandwich!} />
      <button
        className="mt-5 w-full"
        onClick={() => {
          if (orderState === "default" && selectedSandwich)
            orderSandwich(selectedSandwich.id);
        }}
      >
        {getOrderButtonText(orderState)}
      </button>
    </Section>
  );
};
function getOrderButtonText(orderStatus: OrderStatusState) {
  switch (orderStatus) {
    case "default":
      return "Order";
    case "order failed":
      return "Order failed (contact the maintainer or check console)";
    case "order sent":
      return "Order sent!";
    case "sending order":
      return "Sending...";
  }
}
const ToppingsListing = (sandwich: Sandwich) => (
  <ul>
    {sandwich.toppings.map((topping, i) => (
      <li key={i}>{topping}</li>
    ))}
  </ul>
);
export default WhatsInside;
