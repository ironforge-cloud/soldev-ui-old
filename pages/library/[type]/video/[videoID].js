import Head from "next/head";
import Player from "../../../../components/videos/player";
import fetcher from "../../../../utils/fetcher";

export async function getStaticPaths() {
  const data = await fetcher(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/playlists/Solana`
  );

  // Fetch playlist content
  let contentList = [];
  for await (let playlist of data) {
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
        type: content.PlaylistID,
        videoID: content.SK,
      },
    };
  });

  // All missing paths are going to be server-side rendered and cached
  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const data = await fetcher(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/Solana/${params.type}/${params.videoID}`
  );

  return {
    props: { data },
    revalidate: 300,
  };
}

function VideoID({ data }) {
  return (
    <div>
      <Head>
        <title>SolDev: Video Player</title>
        <meta name="title" content={`SolDev: ${data.Title}`} />
        <meta name="og:title" content={`SolDev: ${data.Title}`} />
        <meta name="description" content={`SolDev: ${data.Description}`} />
        <meta name="og:description" content={`SolDev: ${data.Description}`} />
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
