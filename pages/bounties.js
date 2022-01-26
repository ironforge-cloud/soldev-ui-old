import { Container } from "../components/layout";
import CardCompanies from "../components/card/card-companies";
import BountyStats from "../components/bounties/stats";
import fetch from "../utils/fetcher";

export async function getStaticProps() {
  const companies = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/companies`
  );

  const stats = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/bounties/stats`
  );

  return {
    props: { companies, stats },
    revalidate: 60,
  };
}

export default function Bounties({ companies, stats }) {
  const metaTags = {
    title: "SolDev - Bounties",
    description: "Solana community bounties aggregator",
    url: "https://soldev.app/bounties",
    shouldIndex: true,
  };

  return (
    <Container metaTags={metaTags}>
      <div className="flex justify-center">
        <h1 className="text-2xl md:text-3xl 2xl:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-200 capitalize">
          Bounty Board
        </h1>
      </div>

      <div className="mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              Overview
            </h2>

            {/* Stats */}
            <BountyStats stats={stats} />
          </div>
        </div>
      </div>

      {/* Projects */}
      <div className="flex gap-6 xl:gap-10 flex-wrap justify-center mt-20">
        {Array.isArray(companies) &&
          companies.map((card) => (
            <CardCompanies
              key={card.ID}
              name={card.Name}
              description={card.Description}
              bgColor={card.BgColor}
              logo={card.Logo}
              id={card.ID}
              status={card.Status}
            />
          ))}
      </div>
    </Container>
  );
}
