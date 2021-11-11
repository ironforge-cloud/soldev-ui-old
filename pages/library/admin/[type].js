import Head from "next/head";
import useGeneralContent from "../../../hooks/useGeneralContent";
import dynamic from "next/dynamic";

const PublicationsComponent = dynamic(() =>
  import("../../../components/publications")
);

export default function ContentAdmin({}) {
  const { data = [], type = "", isLoading } = useGeneralContent();

  return (
    <div>
      <Head>
        <title>SolDev: Content Admin</title>
        <meta name="description" content="Content Administration" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PublicationsComponent data={data} type={type} isLoading={isLoading} />
    </div>
  );
}
