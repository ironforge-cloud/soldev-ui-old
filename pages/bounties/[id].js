import { Container } from "../../components/layout";
import { Disclosure } from "@headlessui/react";
import {
  CashIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  PaperClipIcon,
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
    HowToApply: "https://share.hsforms.com/1GE1hYdApQGaDiCgaiWMXHA5lohw",
    Attachment:
      "https://solana.foundation/grants/opportunity-automated-stake-delegation-and-rebalancing-ui.pdf",
  },
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
    HowToApply: "https://share.hsforms.com/1GE1hYdApQGaDiCgaiWMXHA5lohw",
    Attachment:
      "https://solana.foundation/grants/opportunity-automated-stake-delegation-and-rebalancing-ui.pdf",
  },
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
    HowToApply: "https://share.hsforms.com/1GE1hYdApQGaDiCgaiWMXHA5lohw",
    Attachment:
      "https://solana.foundation/grants/opportunity-automated-stake-delegation-and-rebalancing-ui.pdf",
  },
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
    HowToApply: "https://share.hsforms.com/1GE1hYdApQGaDiCgaiWMXHA5lohw",
    Attachment:
      "https://solana.foundation/grants/opportunity-automated-stake-delegation-and-rebalancing-ui.pdf",
  },
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
    HowToApply: "https://share.hsforms.com/1GE1hYdApQGaDiCgaiWMXHA5lohw",
    Attachment:
      "https://solana.foundation/grants/opportunity-automated-stake-delegation-and-rebalancing-ui.pdf",
  },
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
    HowToApply: "https://share.hsforms.com/1GE1hYdApQGaDiCgaiWMXHA5lohw",
    Attachment:
      "https://solana.foundation/grants/opportunity-automated-stake-delegation-and-rebalancing-ui.pdf",
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
          Solana Foundation Bounties
        </h1>
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
        <dl className="mt-6 space-y-10 w-full">
          {bounties.map((bounty) => (
            <Disclosure as="div" key={bounty.Title}>
              {({ open }) => (
                <>
                  <dt className="text-lg shadow p-3 rounded-lg bg-white dark:bg-gray-800 hover:dark:bg-gray-700 hover:bg-gray-50 hover:shadow-md">
                    <Disclosure.Button className="text-left w-full flex justify-between items-start text-gray-400 dark:text-gray-300 px-4 py-4 sm:px-6">
                      <div>
                        <span className="font-medium text-gray-900 dark:text-gray-200">
                          {bounty.Title}
                        </span>
                      </div>

                      <div className="flex">
                        <span className="text-gray-900 dark:text-gray-200">
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
                    className="pr-12 mt-2 shadow  rounded-lg p-5 bg-white dark:bg-gray-800"
                  >
                    <div className="px-4 py-5 sm:px-6">
                      <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 prose max-w-5xl">
                        {/* Title */}
                        <div className="sm:col-span-1">
                          <dt className=" font-medium text-gray-500 dark:text-gray-300">
                            Title
                          </dt>
                          <dd className="mt-1 text-gray-900 dark:text-gray-400">
                            {bounty.Title}
                          </dd>
                        </div>

                        {/* Reward */}
                        <div className="sm:col-span-1">
                          <dt className="font-medium text-gray-500 dark:text-gray-300">
                            Reward
                          </dt>
                          <dd className="mt-1 text-gray-900 dark:text-gray-400">
                            {bounty.Reward}
                          </dd>
                        </div>

                        {/* Point of Contact */}
                        <div className="sm:col-span-1">
                          <dt className="font-medium text-gray-500 dark:text-gray-300">
                            Email
                          </dt>
                          <dd className="mt-1 text-gray-900 dark:text-gray-400">
                            {bounty.Email}
                          </dd>
                        </div>

                        {/* Delivery Date */}
                        <div className="sm:col-span-1">
                          <dt className="font-medium text-gray-500 dark:text-gray-300">
                            Delivery Date
                          </dt>
                          <dd className="mt-1 text-gray-900 dark:text-gray-400">
                            {bounty.DeliveryDate}
                          </dd>
                        </div>

                        {/* Description */}
                        <div className="sm:col-span-2">
                          <dt className="font-medium text-gray-500 dark:text-gray-300">
                            Description
                          </dt>
                          <dd className="mt-1 text-gray-900 dark:text-gray-400">
                            {bounty.Description}
                          </dd>
                        </div>

                        {/* Description */}
                        <div className="sm:col-span-2">
                          <dt className="font-medium text-gray-500 dark:text-gray-300">
                            Apply
                          </dt>
                          <dd className="mt-1 text-gray-900 dark:text-gray-400">
                            {bounty.HowToApply}
                          </dd>
                        </div>

                        {/* Attachments */}
                        <div className="sm:col-span-2">
                          <dt className="font-medium text-gray-500 dark:text-gray-300">
                            Attachments
                          </dt>
                          <dd className="mt-1 text-gray-900 dark:text-gray-400">
                            <ul
                              role="list"
                              className="border border-gray-200 rounded-md divide-y divide-gray-200 dark:divide-gray-600"
                            >
                              <li className="pl-3 pr-4 py-3 flex items-center justify-between">
                                <div className="w-0 flex-1 flex items-center">
                                  <PaperClipIcon
                                    className="flex-shrink-0 h-5 w-5 text-gray-400 dark:text-gray-300"
                                    aria-hidden="true"
                                  />
                                  <span className="ml-2 flex-1 w-0 truncate">
                                    {bounty.Attachment}
                                  </span>
                                </div>
                                <div className="ml-4 flex-shrink-0">
                                  <a
                                    target="_blank"
                                    href={bounty.Attachment}
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                    rel="noreferrer"
                                  >
                                    Download
                                  </a>
                                </div>
                              </li>
                            </ul>
                          </dd>
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
