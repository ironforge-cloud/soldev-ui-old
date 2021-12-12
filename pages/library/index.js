import Head from "next/head";
import dynamic from "next/dynamic";

const Dashboard = dynamic(() => import("../../components/dashboard"));

export default function Video() {
  return (
    <div>
      <Head>
        <title>SolDev: Library</title>
        <meta name="description" content="SolDev" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Dashboard />
    </div>
  );
}
