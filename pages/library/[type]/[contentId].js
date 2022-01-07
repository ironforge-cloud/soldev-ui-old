import Head from "next/head";
import useContent from "../../../hooks/useContent";
import dynamic from "next/dynamic";
import { useState } from "react";
import fetcher from "../../../utils/fetcher";
import findTags from "../../../utils/find-tags";

const PublicationsComponent = dynamic(() =>
  import("../../../components/publications")
);

const CardModal = dynamic(() =>
  import("../../../components/publications/card-modal")
);

export async function getStaticPaths() {
  const contentTypes = await fetcher(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/types`
  );

  let data = [];
  for await (const type of contentTypes) {
    const response = await fetcher(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/Solana/${type}`
    );

    data.push(response);
  }

  data = data.flat();

  const paths = data.map((content) => {
    return {
      params: {
        type: content.ContentType,
        contentId: content.SK,
      },
    };
  });

  // All missing paths are going to be server-side rendered and cached
  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const data = await fetcher(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/Solana/${params.type}`
  );
  const content = await fetcher(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/Solana/${params.type}/${params.contentId}`
  );

  let title = "";
  let contentType = params.type;

  if (contentType === "threads") {
    title = "Twitter Threads";
  } else if (contentType === "spl") {
    title = "Program Library";
  } else if (contentType === "started") {
    title = "Getting Started with Solana";
  } else if (contentType === "sdk") {
    title = "SDKs & Frameworks";
  } else {
    // Capitalize the first char
    title = contentType.charAt(0).toUpperCase() + contentType.slice(1);
  }

  let tags = findTags(data);

  return {
    props: { data, title, contentType, tags },
    revalidate: 60,
  };
}

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
