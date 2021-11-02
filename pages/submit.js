import Head from "next/head";
import ContentForm from "../components/content-form";
import Success from "../components/notifications/success";
import { useState } from "react";

export default function Video() {
  return (
    <div>
      <Head>
        <title>SolDev: Submit</title>
        <meta name="description" content="SolDev: Submit" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ContentForm type="submit" />
    </div>
  );
}
