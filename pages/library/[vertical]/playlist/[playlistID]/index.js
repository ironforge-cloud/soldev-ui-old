import PlaylistContent from "../../../../../components/videos/playlist-content";
import Head from "next/head";
import usePlaylist from "../../../../../hooks/usePlaylist";

export default function Playlist({}) {
  const { data = [] } = usePlaylist();

  return (
    <div>
      <Head>
        <title>SolDev: Playlist</title>
        <meta name="description" content="SolDev: Playlist" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PlaylistContent playlistContent={data} />
    </div>
  );
}
