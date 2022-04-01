import * as React from "react";
import SessionContext from "../auth/AuthContext";

function Main() {
  return (
    <main className="yellow">
      <SessionContext>
        <div className="mx-auto max-w-7xl bg-[#CFA200] p-10 mt-10 ">
          <h1>Welcome to the SandwichFactory website</h1>
          <h2>How to make an order?</h2>
          <p>1. Login or register</p>
          <p>2. Create an order</p>
          <p>3. Wait for your sandwich.</p>
          <p>4. You will get a notification when it's ready!</p>
        </div>
        <div className="mx-auto max-w-7xl bg-[#CFA200] p-10 mt-10 flex gap-5">
          <button>Register</button>
          <button>Login</button>
        </div>
      </SessionContext>
    </main>
  );
}

export default Main;
