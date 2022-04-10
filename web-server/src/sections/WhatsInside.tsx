import { FC } from "react";
import { OrderStatus, Sandwich } from "../components/Main";
import Section from "../components/Section";

const WhatsInside: FC<{
  selectedSandwich: Sandwich;
  orderSandwich: Function;
}> = ({ orderSandwich, selectedSandwich }) => {


  return (
    <Section>
      <h2>What's inside?</h2>
      <ToppingsListing {...selectedSandwich} />
      <button
        className="mt-5 w-full"
        onClick={() => {
          if (orderStatus === "default" && selectedSandwich)
            orderSandwich(selectedSandwich.id);
        }}
      >
        {getOrderButtonText(orderStatus)}
      </button>
    </Section>
  );
};
function getOrderButtonText(orderStatus: OrderStatus) {
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
    {sandwich.toppings.map((topping) => (
      <li>{topping}</li>
    ))}
  </ul>
);
export default WhatsInside;
