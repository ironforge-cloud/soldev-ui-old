import Head from "next/head";
import dynamic from "next/dynamic";

const Videos = dynamic(() => import("../../../components/videos"));

export default function Video() {
  return (
    <div>
      <Head>
        <title>SolDev: Library</title>
        <meta name="description" content="SolDev: Library" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Videos />
    </div>
  );
}
