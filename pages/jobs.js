import JobsCard from '../components/card/card-jobs';
import { Container } from '../components/layout';
import fetch from '../utils/fetcher';
import markdownToHtml from '../utils/markdown';

export async function getStaticProps() {
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
    return { notFound: true };
  }
  const response = await fetch(
    `${process.env.NEXT_AIRTABLE_URL}`
  );

  const data = response.records;

  for await (const job of data) {
    job.description = await markdownToHtml(job.fields['Job Description']);
  }


  return {
    props: {jobs: data},
    revalidate: 60,
  };
}

export default function Jobs({jobs}) {
  const metaTags = {
    title: 'SolDev - Jobs',
    description: 'Solana community jobs aggregator',
    url: 'https://soldev.app/jobs',
    shouldIndex: true,
  };

  return (
    <Container metaTags={metaTags}>
      <div className="flex justify-center">
        <h1
          className="text-2xl md:text-3xl 2xl:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-200 capitalize"
        >
          Jobs Board
        </h1>
      </div>

      <div className="flex justify-center my-10 max-w-5xl mx-auto px-2">
        <dl className="mt-6 space-y-5 w-full">
          {Array.isArray(jobs) &&
            jobs.map((job) => (
              <JobsCard
key={job.id}
job={job}
              />
            ))}
        </dl>
      </div>
    </Container>
  );
}