import Head from "next/head";
import useGetContentByStatus from "../../../hooks/useGeneralContent";
import PublicationsComponent from "../../../components/publications";

export default function ContentAdmin({}) {
  const { data = [], type = "", isLoading } = useGetContentByStatus();

  return (
    <div>
      <Head>
        <title>SolDev - Library Admin</title>
        <meta name="title" content="SolDev - Library Admin" />
        <meta name="description" content="Library Admin" />

        {/* Google */}
        <meta name="robots" content="noindex" />
        <meta name="googlebot" content="noindex" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.soldev.app/admin" />
        <meta property="og:title" content="SolDev - Library Admin" />
        <meta property="og:description" content="SolDev - Library Admin" />
        <meta
          property="og:image"
          content="https://www.soldev.app/solanaLogoMark.png"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@soldevapp" />
        <meta name="twitter:creator" content="@italoacasas" />
        <meta name="og:url" content="https://www.soldev.app/admin" />
        <meta name="twitter:title" content="SolDev - Library Admin" />
        <meta name="twitter:description" content="SolDev - Library Admin" />
        <meta
          name="twitter:image"
          content="https://www.soldev.app/solanaLogoMark.png"
        />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PublicationsComponent data={data} title={type} isLoading={isLoading} />
    </div>
  );
}
