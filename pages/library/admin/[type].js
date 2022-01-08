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
        <title>SolDev - Library Admin</title>
        <meta name="title" content="SolDev - Library Admin" />
        <meta name="description" content="Library Admin" />

        {/* Google */}
        <meta name="googlebot" content="noindex" />
        <meta name="robots" content="noindex" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.soldev.app/admin" />
        <meta name="og:title" content="SolDev - Library Admin" />
        <meta name="og:description" content="SolDev - Library Admin" />
        <meta
          property="og:image"
          content="https://www.soldev.app/solanaLogoMark.png"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@soldevapp" />
        <meta name="twitter:creator" content="@italoacasas" />
        <meta property="og:url" content="https://www.soldev.app/admin" />
        <meta property="twitter:title" content="SolDev - Library Admin" />
        <meta property="twitter:description" content="SolDev - Library Admin" />
        <meta
          property="twitter:image"
          content="https://www.soldev.app/solanaLogoMark.png"
        />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PublicationsComponent data={data} title={type} isLoading={isLoading} />
    </div>
  );
}
