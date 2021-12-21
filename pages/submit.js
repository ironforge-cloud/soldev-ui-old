import Head from "next/head";
import ContentForm from "../components/publications/content-form";
import { useState } from "react";
import NotificationSuccess from "../components/notifications/success";

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
        <meta name="description" content="SolDev: Submit" />
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
