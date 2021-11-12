import Head from "next/head";
import useContent from "../../../../hooks/useContent";
import dynamic from "next/dynamic";
import CardModal from "../../../../components/publications/card-modal";
import { useState } from "react";

const PublicationsComponent = dynamic(() =>
  import("../../../../components/publications")
);

export default function Publications({}) {
  const { data = [], type = "", isLoading, selectedContent } = useContent();
  const [open, setOpen] = useState(true);

  return (
    <div>
      <Head>
        <title>SolDev: Publications</title>
        <meta name="description" content="SolDev: Publications" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PublicationsComponent data={data} type={type} isLoading={isLoading} />
      {selectedContent && (
        <CardModal content={selectedContent} open={open} setOpen={setOpen} />
      )}
    </div>
  );
}
