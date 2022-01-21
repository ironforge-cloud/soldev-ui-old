import { Container } from "../../components/layout";

const companies = [
  {
    name: "Solana Foundation",
    ID: "1",
    logo: "/solana-foundation-logo.svg",
    bgColor: "bg-white",
    description:
      "The Solana Foundation is a non-profit organization, dedicated to the decentralization, growth, and security of the Solana network.",
  },
  {
    name: "Drift Protocol",
    ID: "2",
    logo: "/drift-logo.svg",
    bgColor: "bg-gray-900",
    description:
      "Drift brings on-chain, cross-margined perpetual futures to Solana. Making futures DEXs the best way to trade.",
  },
];

export default function Community({ stats }) {
  const metaTags = {
    title: "SolDev - Bounties",
    description: "Solana community bounties aggregator",
    url: "https://soldev.app/bounties",
    shouldIndex: true,
  };

  return <Container metaTags={metaTags}>asd</Container>;
}
