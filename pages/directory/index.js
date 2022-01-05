import Head from "next/head";
import dynamic from "next/dynamic";

const DirectoryDashboard = dynamic(() => import("../../components/directory"));

export default function Directory() {
  return (
    <div>
      <Head>
        <title>SolDev: Directory</title>
        <meta name="description" content="SolDev" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DirectoryDashboard />
    </div>
  );
}
