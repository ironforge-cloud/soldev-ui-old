import Head from "next/head";
import { useState } from "react";
import fetcher from "../../../utils/fetcher";
import findTags from "../../../utils/find-tags";
import defineTitle from "../../../utils/define-title";
import PublicationsComponent from "../../../components/publications";
import CardModal from "../../../components/publications/card-modal";

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

  const title = defineTitle(params.type);
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

  const tags = findTags(data);

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
        <title>{`SolDev - ${pageTitle}`}</title>
        <meta name="title" content={`SolDev - ${pageTitle}`} />
        <meta name="description" content={pageDescription} />

        {/* Google */}
        <meta name="robots" content="index,follow,noodp" />
        <meta name="googlebot" content="index,follow" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://www.soldev.app/library/${contentType}/${selectedContent.ID}`}
        />
        <meta property="og:title" content={`SolDev - ${pageTitle}`} />
        <meta property="og:description" content={pageDescription} />
        <meta
          property="og:image"
          content="https://www.soldev.app/solanaLogoMark.png"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@soldevapp" />
        <meta name="twitter:creator" content="@italoacasas" />
        <meta
          name="twitter:url"
          content={`https://www.soldev.app/library/${contentType}/${selectedContent.SK}`}
        />
        <meta name="twitter:title" content={`SolDev - ${pageTitle}`} />
        <meta name="twitter:description" content={pageDescription} />
        <meta
          name="twitter:image"
          content="https://www.soldev.app/solanaLogoMark.png"
        />

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
