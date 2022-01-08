import Head from "next/head";
import { useState } from "react";
import dynamic from "next/dynamic";

const ContentForm = dynamic(() =>
  import("../components/publications/content-form")
);

const NotificationSuccess = dynamic(() =>
  import("../components/notifications/success")
);

export default function Submit() {
  const [data, setData] = useState({
    Title: "",
    Author: "",
    Description: "",
    Url: "",
    Vertical: "Solana",
    Tags: [],
    ContentType: "",
    SpecialTag: "New",
  });
  const [notifySuccess, setNotifySuccess] = useState(false);

  return (
    <div className="px-6">
      <Head>
        <title>SolDev: Submit</title>
        <meta name="title" content="SolDev - Submit" />
        <meta
          name="description"
          content="Propose new content to the platform. Submissions will be manually reviewed before deciding to publish them to the site."
        />

        {/* Google */}
        <meta name="robot" content="index,follow,noodp" />
        <meta name="googlebot" content="index,follow" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.soldev.app/submit" />
        <meta name="og:title" content="SolDev - Submit" />
        <meta
          name="og:description"
          content="Propose new content to the platform. Submissions will be manually reviewed before deciding to publish them to the site."
        />
        <meta
          property="og:image"
          content="https://www.soldev.app/solanaVerticalLogo.png"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@soldevapp" />
        <meta property="twitter:url" content="https://www.soldev.app/submit" />
        <meta property="twitter:title" content="SolDev - Submit" />
        <meta
          property="twitter:description"
          content="Propose new content to the platform. Submissions will be manually reviewed before deciding to publish them to the site."
        />
        <meta
          property="twitter:image"
          content="https://www.soldev.app/solanaLogoMark.png"
        />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ContentForm
        type="submit"
        data={data}
        setData={setData}
        setNotifySuccess={setNotifySuccess}
      />
      <NotificationSuccess
        show={notifySuccess}
        setShow={setNotifySuccess}
        text="Successfully submitted!"
        subText="Thank you"
      />
    </div>
  );
}
