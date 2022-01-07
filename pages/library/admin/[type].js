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
        <meta name="title" content="SolDev: Content Admin" />
        <meta name="og:title" content="SolDev: Content Admin" />
        <meta name="description" content="Content Admin" />
        <meta name="og:description" content="Content Admin" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@soldevapp" />
        <meta name="googlebot" content="noindex" />
        <meta name="robots" content="noindex" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PublicationsComponent data={data} title={type} isLoading={isLoading} />
    </div>
  );
}
