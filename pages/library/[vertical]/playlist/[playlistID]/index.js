import fetcher from "../../../../../utils/fetcher";
import PlaylistContent from "../../../../../components/videos/playlist-content";
import Head from "next/head";
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

  // Get list of all playlists
  const paths = playlists.map((playlist) => {
    return {
      params: {
        vertical: playlist.Vertical,
        playlistID: playlist.ID,
        playlist,
      },
    };
  });

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const playlistContent = await fetcher(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/${params.vertical}/${params.playlistID}`
  );

  return {
    props: { playlistContent }, // will be passed to the page component as props
    revalidate: 60,
  };
}

export default function Playlist({ playlistContent }) {
  return (
    <div>
      <Head>
        <title>SolDev: Playlist</title>
        <meta name="description" content="SolDev: Playlist" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PlaylistContent playlistContent={playlistContent} />
    </div>
  );
}
