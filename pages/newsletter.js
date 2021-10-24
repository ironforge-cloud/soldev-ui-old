import Head from "next/head";
import Nav from "../components/nav";
import MiniSocial from "../components/mini-social";
import Newsletter from "../components/newsletter";

export default function FAQ() {
  return (
    <div>
      <Head>
        <title>SolDev: Newsletter</title>
        <meta name="description" content="SolDev" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Newsletter />
    </div>
  );
}
