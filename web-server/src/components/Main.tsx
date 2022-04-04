import * as React from "react";
import SessionContext, { useSession } from "../auth/AuthContext";
import OrderForm from "./OrderForm";
import Section from "./Section";

export type OrderStatus = "default" | "sending order" | "order sent" | "order failed";
export type Sandwich = { id: number; name: string; breadType: string; toppings: [] };

function Main() {
  const session = useSession();

  return (
    <main className="yellow max-w-5xl mx-auto">
      <SessionContext>
        <div className="mx-auto max-w-7xl bg-[#CFA200] px-10 py-4 mt-10 shadow-lg">
          <h1>Welcome to SandwichFactory!</h1>
          <h2>How to make an order?</h2>
          <p>1. Login or register</p>
          <p>2. Create an order</p>
          <p>3. Wait for your sandwich.</p>
          <p>{"4. You will get a notification when it's ready!"}</p>
        </div>
        {session.session ? <NoSessionView /> : <LoggedInView />}
      </SessionContext>
    </main>
  );
}

/** Displayed for authenticated users */
const LoggedInView = () => {
  const session = useSession();
  return (
    <>
      <Section>
        <h2>Logged in as {session.session?.username}.</h2>
      </Section>
      <OrderForm />
    </>
  );
};

/** Displayed for non-authenticated users */
const NoSessionView = () => {
  return (
    <Section>
      <h2>You are not yet logged in</h2>
      <div className="flex gap-5">
        <button>Register</button>
        <button>Login</button>
      </div>
    </Section>
  );
};
export default Main;
