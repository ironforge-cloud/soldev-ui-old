import Head from "next/head";
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

  let title = "";
  let pageTitle = "";
  let pageDescription = "";
  let selectedContent = {};
  let contentType = params.type;

  for (let i = 0; i < data.length; i++) {
    // If ID doesn't match next
    if (params.contentId !== data[i].SK) continue;

    // Save content and stop loop
    selectedContent = data[i];
    pageTitle = data[i].Title;
    pageDescription = data[i].Description;
    break;
  }

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
    props: {
      data,
      title,
      contentType,
      tags,
      selectedContent,
      pageTitle,
      pageDescription,
    },
    revalidate: 60,
  };
}

export default function LibraryContent({
  data,
  title,
  contentType,
  tags,
  selectedContent,
  pageTitle,
  pageDescription,
}) {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <Head>
        <title className="capitalize">{`SolDev: ${pageTitle}`}</title>
        <meta name="title" content={`SolDev: ${pageTitle}`} />
        <meta name="og:title" content={`SolDev: ${pageTitle}`} />
        <meta name="description" content={pageDescription} />
        <meta name="og:description" content={pageDescription} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@soldevapp" />
        <meta name="robot" content="index,follow,noodp" />
        <meta name="googlebot" content="index,follow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PublicationsComponent
        data={data}
        title={title}
        contentType={contentType}
        isLoading={false}
        tagsList={tags}
      />
      {selectedContent && (
        <CardModal content={selectedContent} open={open} setOpen={setOpen} />
      )}
    </div>
  );
}
