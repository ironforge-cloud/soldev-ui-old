import Head from "next/head";
import dynamic from "next/dynamic";
import contentLists from "../../../utils/content-lists";
import fetcher from "../../../utils/fetcher";
import defineTitle from "../../../utils/define-title";

const PublicationsComponent = dynamic(() =>
  import("../../../components/publications")
);

export async function getStaticPaths() {
  const paths = contentLists.map((list) => {
    return {
      params: {
        listName: list,
      },
    };
  });

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const data = await fetcher(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/lists/${params.listName}`
  );

  const title = defineTitle(params.listName);

  return {
    props: { data, title },
    revalidate: 60,
  };
}

export default function LibraryLists({ data, title }) {
  return (
    <div>
      <Head>
        <title>{`SolDev: ${title}`}</title>
        <meta name="title" content={`SolDev: ${title}`} />
        <meta name="og:title" content={`SolDev: ${title}`} />
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

      <PublicationsComponent
        data={data}
        title={title}
        type="list"
        isLoading={false}
      />
    </div>
  );
}
