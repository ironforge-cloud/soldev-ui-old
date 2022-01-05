import Head from "next/head";
import Player from "../../../../components/videos/player";
import fetch from "isomorphic-unfetch";

export async function getStaticPaths() {
  const playlistsResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/playlists/Solana`
  );
  const playlists = await playlistsResponse.json();

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { playlistID:, videoID: post.id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/Solana/${query.type}/${query.videoID}`
  );

  const data = await response.json();

  return {
    props: { data },
    revalidate: 60,
  };
}

function VideoID({ data }) {
  return (
    <div>
      <Head>
        <title>SolDev: Video Player</title>
        <meta name="title" content="SolDev: Video Player" />
        <meta name="og:title" content="SolDev: Video Player" />
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

      <Player content={data} />
    </div>
  );
}

export default VideoID;
