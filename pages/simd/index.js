import { Container } from '../../components/layout';
import Table from '../../components/simd/table';
import { fetchAllSIMD } from '../../utils/fetch-simd';

export async function getStaticProps() {
  const res = await fetchAllSIMD();

  return {
    props: {
      content: res
    },
    revalidate: 3600
  };
}

export default function Specs({ content }) {
  const metaTags = {
    title: 'SolDev - SIMD',
    description:
      'The improvement documents describe proposed and accepted changes to the Solana protocol.',
    url: 'https://soldev.app/simd',
    shouldIndex: true
  };

  return (
    <Container metaTags={metaTags}>
      <div className="mx-2">
        <div className="flex flex-col text-center">
          <h1 className="text-2xl font-bold capitalize text-gray-900 dark:text-gray-200 md:text-3xl 2xl:text-4xl">
            Solana Improvement Documents
          </h1>
        </div>

        <div className="mx-auto mt-5 max-w-4xl">
          <p className="prose mx-auto text-center dark:prose-invert md:text-lg">
            This section hosts the Solana Improvement Documents(SIMD) assembled in&nbsp;
            <a
              href="https://github.com/solana-foundation/solana-improvement-documents"
              className="font-normal text-gray-700 dark:text-gray-300"
              rel="noreferrer"
              target="_blank"
            >
              this repository
            </a>
            . The improvement documents describe proposed and accepted changes to the Solana
            protocol.
          </p>
        </div>
        <Table content={content} />
      </div>
    </Container>
  );
}
