import { bindActionCreators } from "@reduxjs/toolkit";
import { EventSourcePolyfill } from "event-source-polyfill";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OrderPrepareState } from "../components/OrderPrepareState";
import Section from "../components/Section";
import * as actionCreators from "../state/action-creators/actionCreators";
import { Order, OrderStatusState } from "../state/actions/ActionTypes";
import { State } from "../state/reducers";
import ToppingsListing from "./ToppingsList";

const WhatsInside: FC = () => {
  const { selectedSandwich, orderState, session } = useSelector(
    (state: State) => state
  );
  const dispatch = useDispatch();
  const { logout, setCurrentOrders, updateOrderStatus } = bindActionCreators(
    actionCreators,
    dispatch
  );

  useEffect(() => {
    if (orderState !== "default") updateOrderStatus("default");
  }, []);

  const waitForResponse = () => {
    const es = new EventSourcePolyfill(
      process.env.NEXT_PUBLIC_GATEWAY_URL + "order/receive",
      {
        headers: {
          Authorization: session!.sessionToken,
          "Content-Type": "text/event-stream",
        },
      }
    );

    es.onopen = (e) => {
      console.log("Connected to event source!");
    };

    es.onmessage = (e) => {
      console.log("Status update!");
      const data = JSON.parse(e.data);

      console.log("Data: " + JSON.stringify(data));

      const orders: Order[] = data["orders"];

      console.log("orders: " + orders);

      setCurrentOrders(orders);

      // Close if all orders ready
      if (
        orders.every((order: Order) => order.state === OrderPrepareState.READY)
      ) {
        es.close();
        console.log("Closed!");
      }
    };
  };

  function orderSandwich(sandwichId: number) {
    updateOrderStatus("sending order");

    fetch(process.env.NEXT_PUBLIC_GATEWAY_URL + "order", {
      method: "POST",
      body: JSON.stringify({ sandwichId }),
      headers: {
        Authorization: session!.sessionToken,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status == 200) {
          updateOrderStatus("order sent");

          waitForResponse();

          return;
        }

        if (res.status == 401) {
          logout();
        }
        updateOrderStatus("order failed");
      })
      .catch((ex) => {
        updateOrderStatus("order failed");
        console.error(ex);
      });
  }

  return (
    <Section>
      <h2>{"What's inside?"}</h2>

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
