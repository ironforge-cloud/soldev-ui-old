import Head from "next/head";
import PublicationsComponent from "../../../components/publications";
import useGeneralContent from "../../../hooks/useGeneralContent";

export default function ContentAdmin({}) {
  const { data = [], type = "" } = useGeneralContent();

  return (
    <div>
      <Head>
        <title>SolDev: Content Admin</title>
        <meta name="description" content="Content Administration" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PublicationsComponent publications={data} type={type} />
    </div>
  );
}
