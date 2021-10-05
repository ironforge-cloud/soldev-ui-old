import Head from "next/head";
import Nav from "../components/nav";
import MiniSocial from "../components/mini-social";

const faqs = [
  {
    question: "What is SolDev?",
    answer: `A place where builders can find and consume knowledge , be up-to-date with the Solana ecosystem, and find new opportunities. And allow content creators to monetize their work.`,
  },
  {
    question: "Why you're building this?",
    answer: `My original idea will take more time, and this seemed a good first step.`,
  },
  {
    question:
      "Currently, all content is hosted on other platforms? Is that changing in the future?",
    answer: `Not in the plan right now, but I would like to build a decentralized platform for content where creators can monetize directly from consumers.`,
  },
  {
    question: "How do you plan to monetize for Content Creators?",
    answer: `I don't plan to monetize for them; I want to allow them to monetize directly from the consumers.`,
  },
  // {
  //   question: "Donations?",
  //   answer: `Sol address: 6atTixQHkH2k1AJrHitjd457EyEJkkH92XpXSjVh4fv8`,
  // },
  {
    question: "Roadmap?",
    answer: `Check in the Sidebar`,
  },
];

export default function FAQ() {
  return (
    <div>
      <Head>
        <title>SolDev</title>
        <meta name="description" content="SolDev" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav>
        <div className="flex-1 flex items-stretch overflow-hidden gap-6">
          <main className="flex-1 overflow-y-auto">
            {/* Primary column */}
            <section
              aria-labelledby="primary-heading"
              className="min-w-0 flex-1 h-full flex flex-coloverflow-hidden xl:order-last bg-white rounded-lg shadow-lg border"
            >
              <div className="bg-white">
                <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
                  <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                    <div>
                      <h2 className="text-3xl font-extrabold text-gray-900">
                        Frequently asked questions
                      </h2>
                      <p className="mt-4 text-lg text-gray-500">
                        Can’t find the answer you’re looking for?{" "}
                        <a
                          href="mailto:support@icsolutions.dev"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Write me
                        </a>{" "}
                        or{" "}
                        <a
                          href="https://twitter.com/italoacasas"
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          DM me
                        </a>
                      </p>
                    </div>
                    <div className="mt-12 lg:mt-0 lg:col-span-2">
                      <dl className="space-y-12">
                        {faqs.map((faq) => (
                          <div key={faq.question}>
                            <dt className="text-lg leading-6 font-medium text-gray-900">
                              {faq.question}
                            </dt>
                            <dd className="mt-2 text-base text-gray-500">
                              {faq.answer}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>

          {/* Secondary column (hidden on smaller screens) */}
          <MiniSocial />
        </div>
      </Nav>
    </div>
  );
}
