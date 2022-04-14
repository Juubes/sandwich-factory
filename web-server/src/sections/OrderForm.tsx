import * as React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import SandwichButton from "../components/SandwichButton";
import Section from "../components/Section";
import { State } from "../state/reducers";
import { Sandwich } from "./Main";
import WhatsInside from "./WhatsInside";

function OrderForm() {
  const [sandwiches, setSandwiches] = useState<Sandwich[]>([]);
  const [error, setError] = useState<string>();
  const { selectedSandwich } = useSelector((state: State) => state);

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

  return (
    <Section>
      <h2>Select a bread</h2>

      <div className="flex gap-5 mt-5">
        {sandwiches.map((sandwich) => (
          <SandwichButton key={sandwich.id} {...sandwich} />
        ))}
      </div>
    </Section>
  );
}

export default OrderForm;
