import Head from "next/head";
import useContent from "../../../hooks/useContent";
import PublicationsComponent from "../../../components/publications";

export default function Publications({}) {
  const { data = [], type = "" } = useContent();

  return (
    <div>
      <Head>
        <title>SolDev: Publications</title>
        <meta name="description" content="SolDev: Publications" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PublicationsComponent publications={data} type={type} />
    </div>
  );
}
