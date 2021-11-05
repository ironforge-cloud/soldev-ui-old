import Head from "next/head";
import Player from "../../../../../components/videos/player";
import useVideo from "../../../../../hooks/useVideo";

function Video() {
  const { data = {} } = useVideo();

  return (
    <div>
      <Head>
        <title>SolDev: Video Player</title>
        <meta name="description" content="SolDev: Video Player" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Player content={data} />
    </div>
  );
}

export default Video;
