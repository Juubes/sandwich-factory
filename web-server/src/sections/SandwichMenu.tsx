import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SandwichButton from "../components/SandwichButton";
import Section from "../components/Section";
import { setSandwichMenu } from "../state/action-creators/actionCreators";
import { State } from "../state/reducers";
import { Sandwich } from "./Main";

function SandwichMenu() {
  const menu = useSelector((state: State) => state.sandwichMenu);
  const dispatch = useDispatch();

  const [error, setError] = useState<string>();

  React.useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_GATEWAY_URL + "sandwich")
      .then(async (response) => {
        if (response.status != 200) {
          setError("Status: " + response.status);
          return;
        }

        let data: Sandwich[] = await response.json();
        dispatch(setSandwichMenu(data));
      })
      .catch((ex) => {
        console.error(ex);
        setError("Failed to fetch sandwich listings.");
      });
  }, []);

  if (error) {
    return <p className="text-red-500 italic text-xl">{error}</p>;
  }
  if (menu.length == 0) {
    return <p>Loading...</p>;
  }

  return (
    <Section>
      <h2>Select a bread</h2>

      <div className="flex gap-5 mt-5">
        {menu.map((sandwich) => (
          <SandwichButton key={sandwich.id} {...sandwich} />
        ))}
      </div>
    </Section>
  );
}

export default SandwichMenu;
