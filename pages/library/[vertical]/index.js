import Head from "next/head";
import Videos from "../../../components/videos";
import useVerticalPlaylists from "../../../hooks/useVerticalPlaylists";

export default function Video() {
  const { data = [] } = useVerticalPlaylists();

  return (
    <div>
      <Head>
        <title>SolDev</title>
        <meta name="description" content="SolDev" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Videos playlists={data} />
    </div>
  );
}
