import Head from "next/head";
import Nav from "../components/nav";
import MiniSocial from "../components/mini-social";
import Newsletter from "../components/newsletter";

export default function FAQ() {
  return (
    <div>
      <Head>
        <title>SolDev: Newsletter</title>
        <meta name="description" content="SolDev" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav>
        <div className="flex-1 flex items-stretch overflow-hidden gap-6">
          <main className="flex-1 overflow-y-auto">
            {/* Primary column */}
            <section
              aria-labelledby="primary-heading"
              className="min-w-0 flex-1 h-full flex justify-center flex-coloverflow-hidden xl:order-last bg-white rounded-lg shadow-lg border"
            >
              <Newsletter />
            </section>
          </main>

          {/* Secondary column (hidden on smaller screens) */}
          <MiniSocial />
        </div>
      </Nav>
    </div>
  );
}
