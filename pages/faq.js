import Head from "next/head";
import Nav from "../components/nav";
import MiniSocial from "../components/mini-social";

const faqs = [
  {
    question: "What is SolDev?",
    answer: `A place where developers building in using Solana can learn and stay up-to-date with everything happening ecosystem.`,
  },
  {
    question: "Roadmap?",
    answer: `II want to make something public soon; I intend to build this in public and with everyone's feedback taken into consideration.`,
  },
  {
    question: "Who are you?",
    answer: `I am not trying to hide my identity, but for the following weeks, I will keep it private to focus on building some core functionalities. If you want to say anything or help, https://twitter.com/therealchaseeb is an option.`,
  },
  {
    question: "What do you need?",
    answer: `Feedback.`,
  },
  {
    question: "I want to help!",
    answer: `For the following weeks, the best option will be to talk to https://twitter.com/therealchaseeb. He is helping make this project possible.`,
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
                <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                  <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                    <div>
                      <h2 className="text-3xl font-extrabold text-gray-900">
                        Frequently asked questions
                      </h2>
                      {/* <p className="mt-4 text-lg text-gray-500">
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
                      </p>*/}
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
