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
        <meta name="title" content="SolDev: Library" />
        <meta name="og:title" content="SolDev: Library" />
        <meta
          name="description"
          content="Learn to Develop using Solana. Tutorials, SDK's, Frameworks, Developer Tools, Security, Scaffolds, and Projects implementations"
        />
        <meta
          name="og:description"
          content="Learn to Develop using Solana. Tutorials, SDK's, Frameworks, Developer Tools, Security, Scaffolds, and Projects implementations"
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@soldevapp" />
        <meta name="robot" content="index,follow,noodp" />
        <meta name="googlebot" content="index,follow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PublicationsComponent data={data} title={type} isLoading={isLoading} />
      {selectedContent && (
        <CardModal content={selectedContent} open={open} setOpen={setOpen} />
      )}
    </div>
  );
}
