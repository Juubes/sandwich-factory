import Head from "next/head";
import { useEffect } from "react";

const API_GATEWAY_URL = "http://localhost.local.gd:8001/";

export default function Home() {
  console.log(`Fetching '${API_GATEWAY_URL}'`);

  useEffect(() => {
    fetch(API_GATEWAY_URL).then((res) => console.log(res.status));
  }, []);

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
