import Head from "next/head";
import { API_GATEWAY_URL } from "../services/environment";

export default async function Home() {
  const res = await fetch(API_GATEWAY_URL + "/order");

  console.log("Response: " + res.json());

  return (
    <div>
      <Head>
        <title>Sandwich factory by Juho Tapio</title>
        <meta
          name="description"
          content="This is a website for ordering sandwiches."
        />
      </Head>
      <header></header>
      <main></main>
      <footer></footer>
    </div>
  );
}
