import Head from "next/head";
import useContent from "../../../hooks/useContent";
import dynamic from "next/dynamic";
import { useState } from "react";

const PublicationsComponent = dynamic(() =>
  import("../../../components/publications")
);

const CardModal = dynamic(() =>
  import("../../../components/publications/card-modal")
);

export default function Publications({}) {
  const { data = [], type = "", isLoading, selectedContent } = useContent();
  const [open, setOpen] = useState(true);

  return (
    <div>
      <Head>
        <title>SolDev: Library</title>
        <meta name="description" content="SolDev: Library" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PublicationsComponent data={data} title={type} isLoading={isLoading} />
      {selectedContent && (
        <CardModal content={selectedContent} open={open} setOpen={setOpen} />
      )}
    </div>
  );
}
