import Head from "next/head";
import useContent from "../../../../hooks/useContent";
import dynamic from "next/dynamic";

const PublicationsComponent = dynamic(() =>
  import("../../../../components/publications")
);

export default function Badge({}) {
  const { data = [], type = "", isLoading } = useContent();

  return (
    <div>
      <Head>
        <title>SolDev: Publications</title>
        <meta name="description" content="SolDev: Library" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PublicationsComponent data={data} type={type} isLoading={isLoading} />
    </div>
  );
}
