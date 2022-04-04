import { FC } from "react";
import { OrderStatus, Sandwich } from "../components/Main";
import Section from "../components/Section";

const WhatsInside: FC<{ sandwich: Sandwich }> = (props) => {
  return (
    <Section>
      <h2>What's inside?</h2>
      <ToppingsListing {...props.sandwich} />
      <OrderButton
        orderStatus={"default"}
        selectedSandwich={0}
        orderSandwich={undefined}
      />
    </Section>
  );
};

const ToppingsListing = (sandwich: Sandwich) => (
  <ul>
    {sandwich.toppings.map((topping) => (
      <li>{topping}</li>
    ))}
  </ul>
);

type OrderButtonProps = {
  orderStatus: OrderStatus;
  selectedSandwich: number;
  orderSandwich: Function;
};
const OrderButton: FC<OrderButtonProps> = ({
  orderStatus,
  orderSandwich,
  selectedSandwich,
}) => {
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

  return (
    <button
      className="mt-5 w-full"
      onClick={() => {
        if (orderStatus === "default" && selectedSandwich)
          orderSandwich(selectedSandwich);
      }}
    >
      {getOrderButtonText(orderStatus)}
    </button>
  );
};

export default WhatsInside;
