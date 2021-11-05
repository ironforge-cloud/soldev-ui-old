import Head from "next/head";
import ContentForm from "../../components/publications/content-form";
import { useState } from "react";
import NotificationSuccess from "../../components/notifications/success";
import PublicationsComponent from "../../components/publications";
import useSubmitted from "../../hooks/useSubmitted";

export default function Inactive() {
  const { submittedData } = useSubmitted("inactive");

  return (
    <div>
      <Head>
        <title>SolDev: Submitted Content</title>
        <meta name="description" content="Submitted content" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PublicationsComponent
        publications={submittedData}
        type="Inactive Content"
      />
    </div>
  );
}
