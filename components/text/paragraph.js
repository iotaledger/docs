export const P = ({ children }) => (
  <p>
    {children}
    <style jsx>
      {`
      p {
        font-weight: 400;
        font-size: 14px;
        line-height: 24px;
      }
    `}
    </style>
  </p>
)

export const PDIV = ({ children }) => (
  <div>
    {children}
    <style jsx>
      {`
      div {
        font-weight: 400;
        font-size: 14px;
        line-height: 24px;
        margin-bottom: 20px;
      }
    `}
    </style>
  </div>
)

const B = ({ children }) => (
  <span>
    {children}
    <style jsx>
      {`
      span {
        font-weight: 600;
      }
    `}
    </style>
  </span>
)

P.B = B
