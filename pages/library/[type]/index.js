import Head from "next/head";
import dynamic from "next/dynamic";
import fetcher from "../../../utils/fetcher";
import findTags from "../../../utils/find-tags";
import defineTitle from "../../../utils/define-title";

const PublicationsComponent = dynamic(() =>
  import("../../../components/publications")
);

export async function getStaticPaths() {
  const contentTypes = await fetcher(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/types`
  );
  const playlists = await fetcher(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/playlists/Solana`
  );

  const paths = [];

  contentTypes.forEach((type) => {
    paths.push({
      params: {
        type,
      },
    });
  });

  playlists.forEach((playlist) => {
    paths.push({
      params: {
        type: playlist.ID,
      },
    });
  });

  // All missing paths are going to be server-side rendered and cached
  return { paths, fallback: "blocking" };
}

export async function getStaticProps(context) {
  const data = await fetcher(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/Solana/${context.params.type}`
  );
  const contentTypes = await fetcher(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/types`
  );

  let contentType = "";

  // Content Type definition
  for (let i = 0; i < contentTypes.length; i++) {
    if (contentTypes[i] === context.params.type) {
      contentType = contentTypes[i];
      break;
    }

    contentType = "playlist";
  }

  const title = defineTitle(contentType, data);
  const tags = findTags(data);

  return {
    props: { data, title, contentType, tags },
    revalidate: 60,
  };
}

export default function Publications({ data, title, contentType, tags }) {
  // Page description definition
  let pageDescription =
    "Learn to Develop using Solana. Tutorials, SDK's, Frameworks, Developer Tools, Security, Scaffolds, and Projects implementations";
  if (contentType === "playlist") pageDescription = title;

  return (
    <div>
      <Head>
        <title>{`SolDev: ${title}`}</title>
        <meta name="title" content={`SolDev - ${title}`} />
        <meta name="description" content={pageDescription} />

        {/* Google */}
        <meta name="robots" content="index,follow,noodp" />
        <meta name="googlebot" content="index,follow" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://www.soldev.app/library/${contentType}`}
        />
        <meta property="og:title" content={`SolDev - ${title}`} />
        <meta property="og:description" content={pageDescription} />
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
          content={`https://www.soldev.app/library/${contentType}`}
        />
        <meta property="twitter:title" content={`SolDev - ${title}`} />
        <meta property="twitter:description" content={pageDescription} />
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
        isLoading={false}
        tagsList={tags}
      />
    </div>
  );
}
