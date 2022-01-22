import { Container } from "../../components/layout";
import { Disclosure } from "@headlessui/react";
import {
  CashIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ScaleIcon,
} from "@heroicons/react/outline";
import BountyStats from "../../components/bounties/stats";

// ProjectID      string
// ID             string
// Title          string
// Description    string
// PointOfContact string
// Reward         float64
// DeliveryDate   string // timestamp
// Attachment     string // url

const bounties = [
  {
    ProjectID: "1",
    ID: "1",
    Title: "Automated Stake Delegation & Rebalancing UI",
    Description:
      "To support the decentralization of stake on the Solana network, the Solana Foundation\n" +
      "will be issuing one or more grants to teams that can develop an easy-to-use user\n" +
      "interface for a stake bot. The stake bot should allow users to manage stake\n" +
      "delegations across multiple validators simultaneously according to a set of criteria, and\n" +
      "automatically rebalance users’ stake accounts according to changes in validator\n" +
      "performance. This user-friendly tool should take as an input each user's delegation\n" +
      "criteria and the amount of SOL they wish to delegate from their wallet or existing stake\n" +
      "accounts. The tool should create the resulting stake accounts and delegate them\n" +
      "accordingly based on the user’s selections. The tool should request custody of the\n" +
      "stake authority of the user’s stake accounts, so that it can periodically rebalance the\n" +
      "stake accounts in response to changing validator performance. The users should\n" +
      "retain withdraw authority over the stake accounts managed by this tool at all times,\n" +
      "ensuring that they always have ultimate control over their tokens and can revoke the\n" +
      "tool’s stake authority at any time.",
    Email: "grants@solana.foundation",
    Reward: "$40,000 in USDC",
    DeliveryDate: "March 1st, 2022",
    URL: "https://solana.foundation/grants#GrantsProposals",
  },
];

const cards = [
  { name: "Total balance", icon: ScaleIcon, amount: "$120,659.45" },
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

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

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
    bgColor: "bg-black",
    description:
      "Drift brings on-chain, cross-margined perpetual futures to Solana. Making futures DEXs the best way to trade.",
  },
  {
    name: "Zeta Markets",
    ID: "3",
    logo: "/zeta-logo.png",
    bgColor: "bg-black",
    description:
      "Zeta’s mission is to democratise derivatives, allowing anyone and everyone to put their hard-earned money to work.",
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
      <div className="flex justify-center mx-auto prose dark:prose-invert flex flex-col">
        <h1 className="capitalize mx-auto">{companies[2].name} Bounties</h1>
      </div>

      <div className="mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-200">
              Overview
            </h2>

            {/* Stats */}
            <BountyStats stats={cards} />
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-10 max-w-5xl mx-auto px-2">
        <dl className="mt-6 space-y-5 w-full">
          {bounties.map((bounty) => (
            <Disclosure as="div" key={bounty.Title}>
              {({ open }) => (
                <>
                  <dt className="text-lg shadow p-3 rounded-lg bg-white dark:bg-gray-800 hover:dark:bg-gray-700 hover:bg-gray-50 hover:shadow-md">
                    <Disclosure.Button className="text-left w-full flex justify-between items-start text-gray-400 dark:text-gray-300 px-4 py-4 sm:px-6">
                      <div>
                        <span className="text-gray-900 dark:text-gray-200">
                          {bounty.Title}
                        </span>
                      </div>

                      <div className="flex">
                        <span className="text-gray-600 dark:text-gray-200">
                          {bounty.Reward}
                        </span>
                        <span className="ml-6 h-7 flex items-center">
                          <ChevronDownIcon
                            className={classNames(
                              open ? "-rotate-180" : "rotate-0",
                              "h-6 w-6 transform"
                            )}
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                    </Disclosure.Button>
                  </dt>
                  <Disclosure.Panel
                    as="dd"
                    className="pr-12 mt-1 shadow rounded-lg p-5 bg-white dark:bg-gray-800 pb-14"
                  >
                    <div className="px-10 sm:px-6">
                      <dl className="grid grid-cols-1 sm:grid-cols-3 prose dark:prose-invert max-w-5xl">
                        {/* Title */}
                        <div className="sm:col-span-1">
                          <h3>Title</h3>
                          <span>{bounty.Title}</span>
                        </div>

                        {/* Reward */}
                        <div className="sm:col-span-1">
                          <h3>Reward</h3>
                          <span>{bounty.Reward}</span>
                        </div>

                        {/* Delivery Date */}
                        <div className="sm:col-span-1">
                          <h3>Delivery Date</h3>
                          <span>{bounty.DeliveryDate}</span>
                        </div>

                        {/* Description */}
                        <div className="sm:col-span-3">
                          <h3>Description</h3>
                          <p>{bounty.Description}</p>
                        </div>

                        {/* Apply */}
                        <div className="sm:col-span-3 mx-auto content-center pt-10">
                          <a
                            type="button"
                            href={bounty.URL}
                            target="_blank"
                            className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 cursor-pointer px-20 py-3 rounded-lg no-underline content text-lg"
                            rel="noreferrer"
                          >
                            Claim Bounty
                          </a>
                        </div>
                      </dl>
                    </div>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </dl>
      </div>
    </Container>
  );
}
