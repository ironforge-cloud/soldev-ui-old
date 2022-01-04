import Head from "next/head";
import useVideo from "../../../../hooks/useVideo";
import dynamic from "next/dynamic";

const Player = dynamic(() => import("../../../../components/videos/player"));

function VideoID() {
  const { data = {} } = useVideo();

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
