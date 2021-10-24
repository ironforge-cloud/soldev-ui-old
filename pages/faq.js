import Head from "next/head";
import Nav from "../components/nav";
import MiniSocial from "../components/mini-social";

const faqs = [
  {
    question: "What is SolDev?",
    answer: `A place where developers in the Solana ecosystem can learn and stay up-to-date with everything happening.`,
  },
  {
    question: "Roadmap?",
    answer: `I want to make something public soon; I intend to build this in public and with everyone's feedback taken into consideration.`,
  },
  {
    question: "What do you need?",
    answer: `Feedback.`,
  },
];

export default function FAQ() {
  return (
    <div>
      <Head>
        <title>SolDev: FAQ</title>
        <meta name="description" content="SolDev: FAQ" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">
                Frequently asked questions
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                Can’t find the answer you’re looking for?{" "}
                <a
                  href="https://twitter.com/soldevapp"
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
    </div>
  );
}
