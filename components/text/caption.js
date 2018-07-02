const Caption = ({ children }) => (
  <p>
    {children}
    <style jsx>
      {`
        p {
          color: #999;
          font-size: 12px;
          margin: -20px 0 40px 0;
          text-align: center;
        }
      `}
    </style>
  </p>
)

const Code = ({ children }) => (
  <code>
    {children}
    <style jsx>
      {`
        code {
          color: #666;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace,
            serif;
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

Caption.Code = Code

export default Caption
