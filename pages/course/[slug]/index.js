import fs from 'fs';
import Link from 'next/link';
import path from 'path';
import ArticleContent from '../../../components/course/articleContent';
import { Container } from '../../../components/layout';
import { modules } from '../../../utils/course-map';

const list = modules.flat();

const directory = path.join(process.cwd(), 'course', 'content');

export async function getStaticPaths() {
  const fileNames = fs.readdirSync(directory);

  const paths = fileNames.map(fileName => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, '')
      }
    };
  });

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const fullPath = path.join(directory, `${params.slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  let title = '';
  let description = '';

  for (let i = 0; i < list.length; i++) {
    const slug = list[i].link.split('/')[2];

    if (params.slug !== slug) continue;

    title = list[i].title;
    description = list[i].title;
  }

  return {
    props: {
      content: {
        markdown: fileContents,
        id: params.slug,
        title,
        description
      }
    }
  };
}

export default function CourseContent({ content }) {
  const metaTags = {
    title: `SolDev - ${content.title}`,
    description: content.description,
    url: `https://soldev.app/newsletters/${content.id}`,
    shouldIndex: true
  };

  return (
    <Container metaTags={metaTags}>
      <div className="lg:mr-5">
        <div className="mx-auto max-w-6xl rounded-lg px-10 py-8 dark:border-none lg:border lg:bg-white dark:lg:bg-gray-800 xl:px-32">
          <div className="flex justify-between pb-4">
            <Link
              href="/course"
              className="cursor-pointer text-base text-sky-600 hover:text-sky-700 lg:text-lg"
            >
              <>&larr; Table of Contents</>
            </Link>

            <Link
              href={`https://twitter.com/share?url=https://soldev.app/course/${content.id}&text=Check out this lesson "${content.title}" from the Solana Development Course on @soldevapp%0A%0A`}
              target="_blank"
              className="text-md flex cursor-pointer items-center gap-2 fill-sky-600 text-sky-600 hover:fill-sky-700 hover:text-sky-700 sm:text-base lg:text-lg"
            >
              <p>
                Share on Twitter
                {/*<!-- Made by https://github.com/gilbarbara/logos -->*/}
              </p>
              <svg
                width="18"
                height="18"
                viewBox="0 -2.203 24 24"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid"
              >
                <path d="M24 2.386a9.848 9.848 0 0 1 -2.828 0.775c1.017 -0.609 1.797 -1.574 2.165 -2.724a9.861 9.861 0 0 1 -3.127 1.195C19.312 0.675 18.032 0.077 16.616 0.077c-2.719 0 -4.924 2.205 -4.924 4.924 0 0.386 0.044 0.762 0.128 1.122 -4.092 -0.205 -7.72 -2.166 -10.149 -5.145 -0.424 0.727 -0.667 1.573 -0.667 2.475 0 1.708 0.869 3.215 2.19 4.098a4.904 4.904 0 0 1 -2.23 -0.616c0 0.021 0 0.041 0 0.062 0 2.386 1.697 4.376 3.95 4.828a4.931 4.931 0 0 1 -2.224 0.084c0.627 1.956 2.445 3.38 4.6 3.42 -1.685 1.321 -3.808 2.108 -6.115 2.108 -0.398 0 -0.789 -0.023 -1.175 -0.069 2.179 1.397 4.767 2.212 7.548 2.212 9.057 0 14.009 -7.503 14.009 -14.01 0 -0.214 -0.005 -0.426 -0.014 -0.637A10.008 10.008 0 0 0 24 2.386" />
              </svg>
            </Link>
          </div>

          <ArticleContent
markdown={content.markdown}
className="prose py-5 dark:prose-invert"
          />

          <Link
            href="/course"
            className="text-md flex cursor-pointer items-center justify-center text-sky-600 hover:text-sky-700 lg:text-lg"
          >
            Table of Contents
          </Link>
        </div>
      </div>
    </Container>
  );
}
