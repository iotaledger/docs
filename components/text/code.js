import SyntaxHighlighter from 'react-syntax-highlighter'
import { vs } from 'react-syntax-highlighter/styles/hljs'

export const Code = ({ children }) => (
  <SyntaxHighlighter
    language="javascript"
    style={vs}
    wrapLines={true}
    customStyle={block}
  >
    {children}
  </SyntaxHighlighter>
)

const block = {
  border: '1px solid #eaeaea',
  padding: '20px 20px 0',
  whiteSpace: 'pre',
  overflow: 'auto',
  WebkitOverflowScrolling: 'touch'
}

export const InlineCode = ({ children, noWrap }) => (
  <code className={noWrap && 'no-wrap'}>
    {children}
    <style jsx>
      {`
        code {
          color: #007070 !important;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace,
            serif;
          font-size: 0.9em;
          white-space: pre-wrap;
        }

        code.no-wrap {
          white-space: nowrap;
        }

        code::before {
          content: '\`';
        }

        code::after {
          content: '\`';
        }
      `}
    </style>
  </code>
)
