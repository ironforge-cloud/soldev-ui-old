import { useState } from "react";
import fetcher from "../../../utils/fetcher";
import findTags from "../../../utils/find-tags";
import defineTitle from "../../../utils/define-title";
import { Container } from "../../../components/layout";
import dynamic from "next/dynamic";

const PublicationsComponent = dynamic(() =>
  import("../../../components/publications")
);
const CardModal = dynamic(() => import("../../../components/card/card-modal"));

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

  const metaTags = {
    title: `SolDev - ${pageTitle}`,
    description: pageDescription,
    url: `https://soldev.app/library/${contentType}/${selectedContent.ID}`,
    shouldIndex: true,
    img: selectedContent.Img,
  };

  return (
    <Container metaTags={metaTags}>
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
    </Container>
  );
}
