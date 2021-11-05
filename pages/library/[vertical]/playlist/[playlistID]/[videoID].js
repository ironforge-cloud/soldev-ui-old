import Head from "next/head";
import Player from "../../../../../components/videos/player";
import fetcher from "../../../../../utils/fetcher";
import verticals from "../../../../../utils/verticals";

export async function getStaticPaths() {
  // Fetch playlist for all verticals
  let playlists = [];
  for await (let vertical of verticals) {
    const data = await fetcher(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/playlists/${vertical}`
    );

    playlists.push(data);
  }

  playlists = playlists.flat();

  // Fetch playlist content
  let contentList = [];
  for await (let playlist of playlists) {
    const content = await fetcher(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/${playlist.Vertical}/${playlist.ID}`
    );

    contentList.push(content);
  }

  // contentList was an array of arrays
  contentList = contentList.flat();

  const paths = contentList.map((content) => {
    return {
      params: {
        vertical: content.Vertical,
        playlistID: content.PlaylistID,
        videoID: content.SK,
      },
    };
  });

  // All missing paths are going to be server-side rendered and cached
  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const content = await fetcher(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/${params.vertical}/${params.playlistID}/${params.videoID}`
  );

  return {
    props: { content },
    revalidate: 60,
  };
}

function Video({ content }) {
  return (
    <div>
      <Head>
        <title>SolDev: Video Player</title>
        <meta name="description" content="SolDev: Video" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Player content={content} />
    </div>
  );
}

export default Video;
