import { useDispatch, useSelector } from "react-redux";
import { updateSessionState } from "../state/action-creators/SessionStateAction";
import { State } from "../state/reducers";
import OrderForm from "./OrderForm";
import Section from "./Section";

export type OrderStatus =
  | "default"
  | "sending order"
  | "order sent"
  | "order failed";

export type Sandwich = {
  id: number;
  name: string;
  breadType: string;
  toppings: [];
};

function Main() {
  const sessionState = useSelector((state: State) => state);

  return (
    <main className="yellow max-w-5xl mx-auto">
        <div className="mx-auto max-w-7xl bg-[#CFA200] px-10 py-4 mt-10 shadow-lg">
          <h1>Welcome to SandwichFactory!</h1>
          <h2>How to make an order?</h2>
          <p>1. Login or register</p>
          <p>2. Create an order</p>
          <p>3. Wait for your sandwich.</p>
          <p>{"4. You will get a notification when it's ready!"}</p>
        </div>
        {sessionState ? <LoggedInView /> : <NoSessionView />}
    </main>
  );
}

/** Displayed for authenticated users */
const LoggedInView = () => {
  const state = useSelector((state: State) => state);

  return (
    <>
      <Section>
        <h2>Logged in as {JSON.stringify(state)}.</h2>
      </Section>
      <OrderForm />
    </>
  );
};

/** Displayed for non-authenticated users */
const NoSessionView = () => {
  const dispatch = useDispatch();

  return (
    <Section>
      <h2>You are not yet logged in</h2>
      <div className="flex gap-5">
        <button
          onClick={() => {
            console.log("Registering");
            dispatch(updateSessionState("token", "Juuso"));
          }}
        >
          Register
        </button>
        <button>Login</button>
      </div>
    </Section>
  );
};
export default Main;
