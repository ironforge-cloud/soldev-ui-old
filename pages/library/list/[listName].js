import Head from "next/head";
import useList from "../../../hooks/useList";
import dynamic from "next/dynamic";

const PublicationsComponent = dynamic(() =>
  import("../../../components/publications")
);

export default function Publications({}) {
  let { data = [], isLoading, type } = useList();

  return (
    <div>
      <Head>
        <title>SolDev: Lists</title>
        <meta name="title" content="SolDev: Lists" />
        <meta name="og:title" content="SolDev: Lists" />
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

      <PublicationsComponent
        data={data}
        title={type}
        type="list"
        isLoading={isLoading}
      />
    </div>
  );
}
