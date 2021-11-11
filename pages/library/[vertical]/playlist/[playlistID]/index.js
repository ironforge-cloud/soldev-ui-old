import Head from "next/head";
import dynamic from "next/dynamic";
import usePlaylist from "../../../../../hooks/usePlaylist";

const PlaylistContent = dynamic(() =>
  import("../../../../../components/videos/playlist-content")
);

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
