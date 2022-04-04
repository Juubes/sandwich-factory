import * as React from "react";
import { useState } from "react";
import WhatsInside from "../sections/WhatsInside";
import { OrderStatus, Sandwich } from "./Main";
import Section from "./Section";

function OrderForm() {
  const [sandwiches, setSandwiches] = useState<Sandwich[]>([]);
  const [orderStatus, setOrderingStatus] = useState<OrderStatus>("default");
  const [error, setError] = useState<string>();
  const [selectedSandwich, setSelectedBread] = useState<number | null>();

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
      <Section>
        <h2>Select a bread</h2>

        <div className="flex gap-5 mt-5">
          {sandwiches.map((sandwich) => (
            <SandwichButton {...sandwich} />
          ))}
        </div>
      </Section>

      {selectedSandwich && (
        <WhatsInside
          {...sandwiches.find((sandwich) => sandwich.id === selectedSandwich)}
        />
      )}
    </div>
  );
}

export default OrderForm;
