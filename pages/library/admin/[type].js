import Head from "next/head";
import dynamic from "next/dynamic";
import useGetContentByStatus from "../../../hooks/useGeneralContent";

const PublicationsComponent = dynamic(() =>
  import("../../../components/publications")
);

export default function ContentAdmin({}) {
  const { data = [], type = "", isLoading } = useGetContentByStatus();

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
