import { bindActionCreators } from "@reduxjs/toolkit";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import Section from "../components/Section";
import * as actionCreators from "../state/action-creators/actionCreators";
import { OrderStatusState } from "../state/actions/ActionTypes";
import { State } from "../state/reducers";
import ToppingsListing from "./ToppingsList";

const WhatsInside: FC = () => {
  const { selectedSandwich, orderState } = useSelector((state: State) => state);

  const dispatch = useDispatch();
  const { updateOrderStatus } = bindActionCreators(actionCreators, dispatch);

  function orderSandwich(sandwichId: number) {
    updateOrderStatus("sending order");

    fetch(process.env.NEXT_PUBLIC_GATEWAY_URL + "order", {
      method: "POST",
      body: JSON.stringify(sandwichId),
    })
      .then((res) => {
        if (res.status == 200) {
          updateOrderStatus("order sent");
          return;
        }

        updateOrderStatus("order failed");
        console.error("Ordering failed with status code: " + res.status);
      })
      .catch((ex) => {
        updateOrderStatus("order failed");
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

export default WhatsInside;
