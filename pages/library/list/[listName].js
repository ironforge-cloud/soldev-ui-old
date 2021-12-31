import Head from "next/head";
import useList from "../../../hooks/useList";
import dynamic from "next/dynamic";

const PublicationsComponent = dynamic(() =>
  import("../../../components/publications")
);

export default function Publications({}) {
  let { data = [], isLoading, type } = useList();

  return (
    <div>
      <Head>
        <title>SolDev: Library</title>
        <meta name="description" content="SolDev: List" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PublicationsComponent
        data={data}
        title={type}
        type="list"
        isLoading={isLoading}
      />
    </div>
  );
}
