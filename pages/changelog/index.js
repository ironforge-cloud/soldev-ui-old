import dynamic from 'next/dynamic';
import { Container } from '../../components/layout';
import fetcher from '../../utils/fetcher';

const PublicationsComponent = dynamic(() => import('../../components/publications'));

export async function getStaticProps() {
  const response = await fetcher(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/Solana/PLilwLeBwGuK5-Qri7Pg9zd-Vvhz9kX2-R`
  );

  const latestChangelog = response[0];

  return {
    props: { changelog: response, latestChangelog },
    revalidate: 60
  };
}

export default function Changelog({ changelog, latestChangelog }) {
  const metaTags = {
    title: 'SolDev - Changelog',
    description: 'Solana Changelog',
    url: 'https://soldev.app/newsletters',
    shouldIndex: true
  };

  return (
    <Container metaTags={metaTags}>
      <PublicationsComponent
        data={changelog}
        title="Changelog"
        contentType="changelog"
        isLoading={false}
        latest={latestChangelog}
      />
    </Container>
  );
}
