import Head from "next/head";
import Videos from "../../../components/videos";

export default function Video() {
  return (
    <div>
      <Head>
        <title>SolDev</title>
        <meta name="description" content="SolDev" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Videos />
    </div>
  );
}
