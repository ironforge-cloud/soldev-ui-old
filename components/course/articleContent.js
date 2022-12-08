import { memo } from 'react';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

/*
  Define a component to render the react friendly markdown parser
*/
function ArticleContent({ markdown = null, className = '' }) {
  return (
    <article className={className}>
      <ReactMarkdown rehypePlugins={[remarkGfm]} components={{ code: CodeBlock }}>
        {markdown}
      </ReactMarkdown>
    </article>
  );
}

/*
  Define a custom reusable code block component
*/
const CodeBlock = ({ className = 'not-prose ', inline = false, children }) => {
  // trim white space and extra lines at the end
  if (Array.isArray(children)) {
    for (let i = 0; i < children.length; i++) {
      children[i] = children[i].trim();
    }
    // children[children.length - 1] = children[children.length - 1].trim();
  } else if (typeof children === 'string') children = children.trim();

  // compute the `language`
  let language = className?.slice('language-'.length).toLowerCase() || '';

  if (language === 'sh') language = 'bash';

  // parse and format "inline" CodeBlocks, (e.g. `single ticked`) or full code blocks (e.g. ``` )
  if (inline) return <span className="inline-code">{children}</span>;
  else
    return (
      <SyntaxHighlighter
        className={className}
        style={tomorrow}
        language={language}
        showLineNumbers={true}
      >
        {children}
      </SyntaxHighlighter>
    );
};

function MarkdownContent() {
  return (
    <div className=" mx-auto mt-10 max-w-2xl rounded-xl bg-red-200 dark:bg-red-500">
      <div className="mx-auto py-3 px-3 sm:px-5 lg:px-6">
        <div className="pr-16 sm:px-16 sm:text-center">
          <p className="prose font-medium text-red-900 dark:text-red-50">
            <span className="">
              The course is being created by
              <a
                href="https://twitter.com/jamesrp13"
                target="_blank"
                rel="noreferrer"
                className="font-bold no-underline hover:underline"
              >
                {' '}
                James
              </a>{' '}
              and{' '}
              <a
                href="https://github.com/Unboxed-Software/solana-course/graphs/contributors?type=a"
                target="_blank"
                rel="noreferrer"
                className="font-bold no-underline hover:underline"
              >
                others
              </a>
              . If you&apos;d like to help out, have a look how you can
            </span>
            <span className="">
              <a
                href="https://github.com/Unboxed-Software/solana-course/blob/main/CONTRIBUTING.md"
                target="_blank"
                rel="noreferrer"
                className="font-bold no-underline hover:underline"
              >
                {' '}
                contribute.
              </a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default memo(ArticleContent);
