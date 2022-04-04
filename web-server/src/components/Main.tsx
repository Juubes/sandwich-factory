import * as React from "react";
import SessionContext, { useSession } from "../auth/AuthContext";
import OrderForm from "./OrderForm";

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
      <div className="mx-auto max-w-7xl bg-[#CFA200] px-10 my-10 shadow-lg">
        <h2>Logged in as {session.session?.username}.</h2>
      </div>
      <OrderForm />
    </>
  );
};

/** Displayed for non-authenticated users */
const NoSessionView = () => {
  return (
    <div className="mx-auto max-w-7xl bg-[#CFA200] px-10 pb-10 my-10">
      <h2 className="">You are not yet logged in</h2>
      <div className="flex gap-5">
        <button>Register</button>
        <button>Login</button>
      </div>
    </div>
  );
};
export default Main;
