import Head from "next/head";
import useContent from "../../../hooks/useContent";
import dynamic from "next/dynamic";

const PublicationsComponent = dynamic(() =>
  import("../../../components/publications")
);

export default function Publications({}) {
  const { data = [], type = "", isLoading, tags, badges } = useContent();

  return (
    <div>
      <Head>
        <title>SolDev: Library</title>
        <meta name="description" content="SolDev: Publications" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PublicationsComponent
        data={data}
        type={type}
        isLoading={isLoading}
        badges={badges}
        tags={tags}
      />
    </div>
  );
}
