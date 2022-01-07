import Head from "next/head";
import useContent from "../../../hooks/useContent";
import dynamic from "next/dynamic";

const PublicationsComponent = dynamic(() =>
  import("../../../components/publications")
);

export default function PublicationsFilter({}) {
  const {
    data = [],
    isLoading,
    tags,
    badges,
    tagsList,
    contentType,
    title,
  } = useContent();

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

      <PublicationsComponent
        data={data}
        title={title}
        contentType={contentType}
        isLoading={isLoading}
        badges={badges}
        tags={tags}
        tagsList={tagsList}
      />
    </div>
  );
}
