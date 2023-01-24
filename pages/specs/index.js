import { Container } from '../../components/layout';
import Table from '../../components/specs/table';

export default function Specs() {
  const metaTags = {
    title: 'Solana protocol specifications',
    description:
      'This documentation is designed to host protocol specifications of the Solana network being made in this repository https://github.com/solana-foundation/specs. These specifications are ideal for understanding core concepts, verification, state transition rules and more.',
    url: 'https://soldev.app/specs',
    shouldIndex: true
  };

  return (
    <Container metaTags={metaTags}>
      <div className="mx-2">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold capitalize text-gray-900 dark:text-gray-200 md:text-3xl 2xl:text-4xl">
            Solana Protocol Specifications
          </h1>
        </div>

        <div className="mx-auto mt-5 max-w-4xl">
          <p className="prose mx-auto text-center text-lg dark:prose-invert">
            This section hosts the Solana protocol specifications assembled in&nbsp;
            <a
              href="https://github.com/solana-foundation/specs"
              className="font-normal text-gray-700 dark:text-gray-300"
              rel="noreferrer"
              target="_blank"
            >
              this repository
            </a>
            . The specification is ideal for understanding core concepts, verification, state
            transition rules, and more.
          </p>
        </div>

        <Table />
      </div>
    </Container>
  );
}
