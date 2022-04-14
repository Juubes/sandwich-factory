import { useDispatch, useSelector } from "react-redux";
import { Sandwich } from "../sections/Main";
import { setSelectedSandwich } from "../state/action-creators/actionCreators";
import { State } from "../state/reducers";

const SandwichButton = (sandwich: Sandwich) => {
  const dispatch = useDispatch();
  const { selectedSandwich } = useSelector((state: State) => state);

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

export default SandwichButton;
