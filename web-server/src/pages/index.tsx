import Head from "next/head";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import Main from "../sections/Main";
import { store } from "../state/redux-store";

export default function Index() {
  return (
    <div>
      <Provider store={store}>
        <Head>
          <title>SandwichFactory by Juho Tapio</title>
          <meta
            name="description"
            content="This is a website for ordering sandwiches."
          />
        </Head>

        <header></header>

        <Main />

        <footer></footer>
      </Provider>
    </div>
  );
}
