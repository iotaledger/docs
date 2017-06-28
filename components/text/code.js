export const Code = ({ children }) => (
  <pre
    style={{
      border: '1px solid #eaeaea',
      padding: '20px',
      margin: '40px 0',
      whiteSpace: 'pre',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch'
    }}
  >
    <code>
      {children}
      <style jsx>
        {`
        code {
          color: #bd10e0;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
          font-size: 13px;
          line-height: 20px;
        }
      `}
      </style>
    </code>
  </pre>
)

export const InlineCode = ({ children, noWrap }) => (
  <code className={noWrap && 'no-wrap'}>
    {children}
    <style jsx>
      {`
      code {
        color: #bd10e0;
        font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
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
