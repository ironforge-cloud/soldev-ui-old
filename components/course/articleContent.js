import { memo, useState } from 'react';
import { ClipboardIcon } from '@heroicons/react/solid';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import CopyToClipboard from 'react-copy-to-clipboard';

/*
  Define a component to render the react friendly markdown parser
*/
function ArticleContent({ markdown = null, className = '' }) {
  return (
    <article className={className}>
      <ReactMarkdown
rehypePlugins={[remarkGfm]}
components={{ code: CodeBlock }}
      >
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

  let [copyButtonText, setCopyButtonText] = useState('Copy');

  // changes the text back to `copy` after 1 second
  const changeText = text => {
    setCopyButtonText(text);
    setTimeout(() => setCopyButtonText('Copy'), 1000);
  };

  // parse and format "inline" CodeBlocks, (e.g. `single ticked`) or full code blocks (e.g. ``` )
  if (inline) return <span className="inline-code">{children}</span>;
  else
    return (
      <div>
        <div className="flex justify-end">
          <CopyToClipboard text={children}>
            <button
              type="button"
              className="mr-4 inline-flex items-center rounded-t-lg bg-[#464646] px-2.5 py-1 text-center text-sm font-medium
             text-white hover:bg-[#464646]/90 dark:hover:bg-[#464646]/60 dark:focus:ring-gray-500"
              onClick={() => {
                changeText('Copied!');
              }}
            >
              <ClipboardIcon
className="-ml-0.5 mr-2 h-4 w-4"
aria-hidden="true"
              />
              {copyButtonText}
            </button>
          </CopyToClipboard>
        </div>
        <SyntaxHighlighter
          className={className}
          style={tomorrow}
          customStyle={{
            marginTop: 0
          }}
          allowCopy={true}
          language={language}
          showLineNumbers={true}
        >
          {children}
        </SyntaxHighlighter>
      </div>
    );
};

export default memo(ArticleContent);
