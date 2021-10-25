import Head from "next/head";
import Nav from "../components/nav";
import MiniSocial from "../components/nav/mini-social";
import SubmitForm from "../components/submit-form";

export default function Video() {
  return (
    <div>
      <Head>
        <title>SolDev: Submit</title>
        <meta name="description" content="SolDev: Submit" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SubmitForm />
    </div>
  );
}
