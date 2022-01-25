import { Container } from "../components/layout";
import Link from "next/link";

export default function Custom404() {
  const metaTags = {
    title: "SolDev - 404",
    description: "SolDev - 404",
    url: "https://soldev.app",
    shouldIndex: true,
  };

  return (
    <Container metaTags={metaTags}>
      <div className="min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid lg:px-8">
        <div className="max-w-max mx-auto">
          <main className="sm:flex">
            <p className="text-4xl font-extrabold text-green-500 dark:text-green-400 sm:text-5xl">
              404
            </p>
            <div className="sm:ml-6 prose dark:prose-invert">
              <div className="sm:border-l sm:border-gray-400 dark:sm:border-gray-500 sm:pl-6">
                <h1>Page not found</h1>
                <p>Please check the URL in the address bar and try again.</p>
              </div>
              <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                <Link href="/" passHref>
                  <button
                    type="button"
                    className="rounded-xl px-10 py-4 text-lg bg-green-500 dark:bg-green-400 text-gray-900 dark:text-gray-900"
                  >
                    &larr; Go back home
                  </button>
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Container>
  );
}
