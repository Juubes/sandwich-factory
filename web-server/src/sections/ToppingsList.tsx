import { Sandwich } from "./Main";

const ToppingsListing = (sandwich: Sandwich) => (
  <ul>
    {sandwich.toppings.map((topping, i) => (
      <li key={i}>{topping}</li>
    ))}
  </ul>
);

export default ToppingsListing;
