import React from "react";
import Head from "next/head";
import Main from "./Main";

const API_GATEWAY_URL = "http://localhost.local.gd:8001/";

export default function Index() {
  return (
    <div>
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
    </div>
  );
}
