import { Container } from '../components/layout';
import Link from 'next/link';

export default function Custom404({ idl }) {
  const metaTags = {
    title: idl ? 'SolDev - IDL Not found' : 'SolDev - 404',
    description: idl ? 'SolDev - No IDL' : 'SolDev - 404',
    url: 'https://soldev.app',
    shouldIndex: true
  };

  const buttonData = {
    text: idl ? 'Go back' : 'Go back home',
    link: idl ? '/registry' : '/'
  };

  return (
    <Container metaTags={metaTags}>
      <div className="min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid lg:px-8">
        <div className="mx-auto max-w-max">
          <main className="sm:flex">
            <p className="text-4xl font-extrabold text-green-500 dark:text-green-400 sm:text-5xl">
              404
            </p>
            <div className="prose dark:prose-invert sm:ml-6">
              <div className="sm:border-l sm:border-gray-400 sm:pl-6 dark:sm:border-gray-500">
                {idl ? (
                  <>
                    <h1>IDL not found</h1>
                    <p>Please check the program address and try again.</p>
                  </>
                ) : (
                  <>
                    <h1>Page not found</h1>
                    <p>Please check the URL in the address bar and try again.</p>
                  </>
                )}
              </div>
              <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                <Link href={buttonData.link} passHref>
                  <button
                    type="button"
                    className="rounded-xl bg-green-500 px-10 py-4 text-lg text-gray-900 dark:bg-green-400 dark:text-gray-900"
                  >
                    &larr; {buttonData.text}
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
