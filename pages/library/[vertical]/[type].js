import Head from "next/head";

import PublicationsComponent from "../../../components/publications";
import useContent from "../../../hooks/useContent";

export default function Publications({}) {
  const { data = [], type = "", isLoading } = useContent();

  return (
    <div>
      <Head>
        <title>SolDev: Publications</title>
        <meta name="description" content="SolDev: Publications" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PublicationsComponent data={data} type={type} isLoading={isLoading} />
    </div>
  );
}
