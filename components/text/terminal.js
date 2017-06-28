export const TerminalInput = ({ children }) => (
  <div>
    {Array.isArray(children)
      ? <span>{children}</span>
      : children
          .split(/\r?\n/)
          .map((item, index) => <span key={index}>{item}</span>)}

    <style jsx>
      {`
        div {
          border: 1px solid #eaeaea;
          color: #bd10e0;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
          font-size: 13px;
          line-height: 20px;
          margin: 40px 0;
          padding: 20px;
          -webkit-overflow-scrolling: touch;
          white-space: pre;
          overflow: auto;
        }

        div span {
          display: block;
        }

        div span::before {
          content: "$ ";
        }
      `}
    </style>
  </div>
)

export const TerminalOutput = ({ children }) => (
  <div className="output">
    {children}
    <style jsx>
      {`
      .output {
        background: #000;
        color: #fff;
        font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
        font-size: 13px;
        line-height: 20px;
        margin: 40px 0;
        padding: 20px;
      }

      .output :global(pre) {
        margin: 0;
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
        white-space: pre-wrap;
      }
    `}
    </style>
  </div>
)
