import dynamic from "next/dynamic";

const WidgetBot = dynamic(() => import("@widgetbot/react-embed"), {
  ssr: false,
});

export default function Discord() {
  return (
    <WidgetBot
      server="897198578106269766"
      channel="897198578106269773"
      height="1000px"
      shard="https://emerald.widgetbot.io"
    />
  );
}
