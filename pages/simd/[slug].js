import { fetchAllSIMD } from '../../utils/fetch-simd';
import { Container } from '../../components/layout';
import ArticleContent from '../../components/course/articleContent';
import { fetchGitHubFile } from '../../utils/fetch-specs';
import Dropdown from '../../components/simd/dropdown';
import Bottombar from '../../components/simd/bottombar';

export async function getStaticPaths() {
  const items = await fetchAllSIMD();
  const paths = items.map(({ id }) => ({
    params: { slug: id.toString() }
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetchAllSIMD();
  const content = res.find(item => item.id.toString() === params.slug);
  content.markdown = await fetchGitHubFile(content.download_url[0]).then(res =>
    res.replace(/^---[\s\S]*?---/m, '').trim()
  );
  if (!content) return { props: {} };
  return { props: { content, res }, revalidate: 300 };
}
export default function SIMDContent({ content }) {
  const metaTags = {
    title: `SolDev - ${content.metadata.title}`,
    description: content.description,
    url: `https://soldev.app/simd/${content.id.toString()}`,
    shouldIndex: true
  };

  // Get sections from markdown file
  const sections = (content.markdown.match(/^## .*$/gm) || []).map(line => line.slice(3));

  console.log(content.metadata);
  return (
    <Container metaTags={metaTags}>
      <div>
        <div className="flex flex-col rounded-lg dark:border-none lg:flex-row lg:border lg:bg-white dark:lg:bg-gray-800">
          {/*  Document view */}
          <div className="border-bg-gray-100 w-full py-8 pl-10 lg:w-11/12 lg:border-r xl:pl-20">
            <h1 className="mt-2 text-4xl font-bold capitalize tracking-tight text-gray-900 dark:text-gray-200">
              {content.metadata.title}
            </h1>

            <div className="relative mt-4">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300" />
              </div>
            </div>
            <ArticleContent
              markdown={content.markdown}
              className="prose max-w-6xl py-5 pr-20 dark:prose-invert"
            />
          </div>

          {/*  Sidebar */}
          <div className="hidden h-screen w-3/12 flex-col px-4 lg:flex">
            <div className="inset-y-screen fixed mt-10 flex cursor-pointer flex-col gap-4">
              <Dropdown title="Content" content={sections} />
              <Dropdown title="Details" content={content.metadata} />
            </div>
          </div>
        </div>

        {/*  Bottom sticky bar */}
        <div className="fixed inset-x-0 bottom-10">
          <Bottombar
            github_url={content.html_url}
            twitter_url={`https://twitter.com/share?url=https://soldev.app/simd/${content.id}&text=Check out this improvement proposal "${content.metadata.title}" from the Solana Improvement Documents(SIMD) on @soldevapp%0A%0A`}
          />
        </div>
      </div>
    </Container>
  );
}
