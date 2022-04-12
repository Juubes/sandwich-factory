import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WhatsInside from "./WhatsInside";
import { setSelectedSandwich } from "../state/action-creators/actionCreators";
import { State } from "../state/reducers";
import { Sandwich } from "./Main";
import Section from "../components/Section";

function OrderForm() {
  const [sandwiches, setSandwiches] = useState<Sandwich[]>([]);
  const [error, setError] = useState<string>();
  const dispatch = useDispatch();

  const selectedSandwich = useSelector(
    (state: State) => state.selectedSandwich
  );

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
      sandwich.id === selectedSandwich?.id
        ? "bg-green-700 hover:bg-green-600"
        : "";
    return (
      <button
        onClick={(e) => {
          dispatch(setSelectedSandwich(sandwich));
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
            <SandwichButton key={sandwich.id} {...sandwich} />
          ))}
        </div>
      </Section>

      {selectedSandwich && <WhatsInside />}
    </div>
  );
}

export default OrderForm;
