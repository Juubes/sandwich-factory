import * as React from "react";
import { useState } from "react";

type OrderStatus = "default" | "sending order" | "order sent" | "order failed";
type Sandwich = { id: number; name: string; breadType: string; toppings: [] };

function OrderForm() {
  const [sandwiches, setSandwiches] = useState<Sandwich[]>([]);
  const [orderStatus, setOrderingStatus] = useState<OrderStatus>("default");
  const [error, setError] = useState<string>();
  const [selectedSandwich, setSelectedBread] = useState<number | null>();

  function WhatsInsideSection() {
    return (
      <>
        <div>
          <h2>What's inside?</h2>

          <ul>
            {
              // Toppings to list
              sandwiches
                .find((sandwich) => sandwich.id === selectedSandwich)
                ?.toppings.map((topping) => (
                  <li>{topping}</li>
                ))
            }
          </ul>
        </div>
        <button
          className="mt-5 w-full"
          onClick={() => {
            if (orderStatus === "default" && selectedSandwich)
              orderSandwich(selectedSandwich);
          }}
        >
          {getOrderButtonText(orderStatus)}
        </button>
      </>
    );
  }

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

  React.useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_GATEWAY_URL + "sandwich")
      .then(async (response) => {
        if (response.status != 200) {
          setError("Status: " + response.status);
          return;
        }

        let data = await response.json();
        setSandwiches(data);
      })
      .catch((ex) => {
        console.error(ex);
        setError("Failed to fetch sandwich listings.");
      });
  }, []);

  if (error) {
    return <p className="text-red-500 italic text-xl">{error}</p>;
  }
  if (sandwiches.length == 0) {
    return <p>Loading...</p>;
  }

  const SandwichButton = (sandwich: Sandwich) => {
    let color =
      sandwich.id === selectedSandwich ? "bg-green-700 hover:bg-green-600" : "";
    return (
      <button
        onClick={(e) => {
          setSelectedBread(sandwich.id);
        }}
        className={color}
      >
        {sandwich.name}
      </button>
    );
  };

  return (
    <div>
      <div className="mx-auto max-w-7xl bg-[#CFA200] px-10 pb-10 my-10 shadow-lg">
        <h2>Select a bread</h2>

        <div className="flex gap-5">
          {sandwiches.map((sandwich) => (
            <SandwichButton {...sandwich} />
          ))}
        </div>
      </div>
      {selectedSandwich && (
        <div className="mx-auto max-w-7xl bg-[#CFA200] px-10 pb-10 my-10 shadow-lg">
          <WhatsInsideSection />
        </div>
      )}
    </div>
  );
}

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
export default OrderForm;
