import { Container } from "../components/layout";
import { CashIcon, CheckCircleIcon, ScaleIcon } from "@heroicons/react/outline";
import CardCompanies from "../components/card/card-companies";

const cards = [
  { name: "Total balance", icon: ScaleIcon, amount: "$30,659.45" },
  {
    name: "Bounties available",

    icon: CheckCircleIcon,
    amount: "47",
  },
  {
    name: "Paid balance",

    icon: CashIcon,
    amount: "$30,659.45",
  },
];

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

  return (
    <Container metaTags={metaTags}>
      <div className="flex justify-center">
        <h1 className="text-2xl md:text-3xl 2xl:text-4xl font-bold tracking-tight text-gray-900 dark:text-stone-200 capitalize">
          Bounties
        </h1>
      </div>

      <div className="mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              Overview
            </h2>

            {/* Stats */}
            <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {/* Card */}
              {cards.map((card) => (
                <div
                  key={card.name}
                  className="bg-white overflow-hidden shadow rounded-lg"
                >
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <card.icon
                          className="h-6 w-6 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            {card.name}
                          </dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900">
                              {card.amount}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Projects */}
      <div className="flex gap-6 flex-wrap justify-center mt-20">
        {companies.map((card) => (
          <CardCompanies
            key={card.name}
            name={card.name}
            description={card.description}
            bgColor={card.bgColor}
            logo={card.logo}
            id={card.ID}
          />
        ))}
      </div>
    </Container>
  );
}
