import { Container } from "../../components/layout";
import fetch from "../../utils/fetcher";
import dynamic from "next/dynamic";

const BountyCard = dynamic(() => import("../../components/card/card-bounty"));
const CompanyHeader = dynamic(() =>
  import("../../components/bounties/company-header")
);

export async function getStaticPaths() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/companies`);

  if (!Array.isArray(data)) {
    return { paths: [], fallback: false };
  }
  const paths = data.map((content) => {
    return {
      params: {
        companyID: content.ID,
      },
    };
  });

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const companies = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/companies`
  );

  const bounties = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/bounties/company/${params.companyID}`
  );

  const stats = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/bounties/stats/company/${params.companyID}`
  );

  let company = {};
  for (let i = 0; i < companies.length; i++) {
    if (companies[i].ID !== params.companyID) continue;

    company = companies[i];
    break;
  }

  return {
    props: { company, bounties, stats },
    revalidate: 60,
  };
}

export default function BountyPage({ company, bounties, stats }) {
  const metaTags = {
    title: `SolDev - ${company.Name} Bounties`,
    description: company.Description,
    url: `https://soldev.app/bounties/${company.ID}`,
    shouldIndex: true,
  };

  return (
    <Container metaTags={metaTags}>
      <CompanyHeader company={company} stats={stats} />

      <div className="flex justify-center my-10 max-w-5xl mx-auto px-2">
        <dl className="mt-6 space-y-5 w-full">
          {Array.isArray(bounties) &&
            bounties.map((bounty) => (
              <BountyCard key={bounty.ID} bounty={bounty} />
            ))}
        </dl>
      </div>
    </Container>
  );
}
