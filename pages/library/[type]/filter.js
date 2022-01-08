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
        <title>SolDev - Library</title>
        <meta name="title" content="SolDev - Library" />
        <meta
          name="description"
          content="Learn to Develop using Solana. Tutorials, SDK's, Frameworks, Developer Tools, Security, Scaffolds, and Projects implementations"
        />

        {/* Google */}
        <meta name="googlebot" content="noindex" />
        <meta name="robots" content="noindex" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.soldev.app/library" />
        <meta name="og:title" content="SolDev - Library" />
        <meta
          name="og:description"
          content="Learn to Develop using Solana. Tutorials, SDK's, Frameworks, Developer Tools, Security, Scaffolds, and Projects implementations"
        />
        <meta
          property="og:image"
          content="https://www.soldev.app/solanaLogoMark.png"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@soldevapp" />
        <meta name="twitter:creator" content="@italoacasas" />
        <meta property="og:url" content="https://www.soldev.app/library" />
        <meta property="twitter:title" content="SolDev - Library" />
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
        contentType={contentType}
        isLoading={isLoading}
        badges={badges}
        tags={tags}
        tagsList={tagsList}
      />
    </div>
  );
}
