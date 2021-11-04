import Head from "next/head";
import ContentForm from "../components/content-form";
import { useState } from "react";

export default function Video() {
  const [data, setData] = useState({
    Title: "",
    Author: "",
    Description: "",
    Url: "",
    Vertical: "Solana",
    Tags: [],
    ContentType: "",
  });

  return (
    <div>
      <Head>
        <title>SolDev: Submit</title>
        <meta name="description" content="SolDev: Submit" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ContentForm type="submit" data={data} setData={setData} />
    </div>
  );
}
