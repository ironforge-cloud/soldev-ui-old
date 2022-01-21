import { Container } from "../../components/layout";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";

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
    PointOfContact:
      "For questions on this Grant Opportunity, please email grants@solana.foundation.",
    Reward: "$40,000 in USDC",
    DeliveryDate: "March 1st, 2022",
    Attachment:
      "https://solana.foundation/grants/opportunity-automated-stake-delegation-and-rebalancing-ui.pdf",
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

      <div className="flex justify-center mt-20 max-w-5xl mx-auto">
        <dl className="mt-6 space-y-6 divide-y divide-gray-200 w-full">
          {bounties.map((bounty) => (
            <Disclosure as="div" key={bounty.Title} className="pt-6">
              {({ open }) => (
                <>
                  <dt className="text-lg border-2 p-5 rounded-t-lg">
                    <Disclosure.Button className="text-left w-full flex justify-between items-start text-gray-400">
                      <span className="font-medium text-gray-900">
                        {bounty.Title}
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
                    </Disclosure.Button>
                  </dt>
                  <Disclosure.Panel
                    as="dd"
                    className="pr-12 border rounded-b-lg p-5"
                  >
                    <p className="text-base text-gray-500">
                      {bounty.Description}
                    </p>
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
