import dynamic from 'next/dynamic';
import { Container } from '../../components/layout';
import fetcher from '../../utils/fetcher';

const PublicationsComponent = dynamic(() => import('../../components/publications'));

export async function getStaticProps() {
  const response = await fetcher(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/Solana/newsletters`
  );

  const lastNewsletter = response[1];

  return {
    props: { newsletters: response, lastNewsletter },
    revalidate: 60
  };
}

export default function Newsletter({ newsletters, lastNewsletter }) {
  const metaTags = {
    title: 'SolDev - Newsletter',
    description: 'Solana community newsletter',
    url: 'https://soldev.app/newsletters',
    shouldIndex: true
  };

  return (
    <Container metaTags={metaTags}>
      <PublicationsComponent
        data={newsletters}
        title="Newsletters"
        contentType="newsletters"
        isLoading={false}
        lastNewsletter={lastNewsletter}
      />
    </Container>
  );
}
