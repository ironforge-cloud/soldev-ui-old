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
    props: { data, title, listName: params.listName },
    revalidate: 60,
  };
}

export default function LibraryLists({ data, title, listName }) {
  return (
    <div>
      <Head>
        <title>{`SolDev - ${title}`}</title>
        <meta name="title" content={`SolDev - ${title}`} />
        <meta
          name="description"
          content="Learn to Develop using Solana. Tutorials, SDK's, Frameworks, Developer Tools, Security, Scaffolds, and Projects implementations"
        />

        {/* Google */}
        <meta property="robot" content="index,follow,noodp" />
        <meta property="googlebot" content="index,follow" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://www.soldev.app/library/list/${listName}`}
        />
        <meta property="og:title" content={`SolDev - ${title}`} />
        <meta
          property="og:description"
          content="Learn to Develop using Solana. Tutorials, SDK's, Frameworks, Developer Tools, Security, Scaffolds, and Projects implementations"
        />
        <meta
          property="og:image"
          content="https://www.soldev.app/solanaLogoMark.png"
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:site" content="@soldevapp" />
        <meta property="twitter:creator" content="@italoacasas" />
        <meta
          property="twitter:url"
          content={`https://www.soldev.app/library/list/${listName}`}
        />
        <meta property="twitter:title" content={`SolDev - ${title}`} />
        <meta
          property="twitter:description"
          content="Learn to Develop using Solana. Tutorials, SDK's, Frameworks, Developer Tools, Security, Scaffolds, and Projects implementations"
        />
        <meta
          property="twitter:image"
          content="https://www.soldev.app/solanaLogoMark.png"
        />

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
