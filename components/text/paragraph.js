import PropTypes from 'prop-types'

export const P = ({ children }) => (
  <p>
    {children}
    <style jsx>
      {`
        p {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
            'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
            'Helvetica Neue', sans-serif;
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
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
            'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
            'Helvetica Neue', sans-serif;
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

export const HR = () => (
  <div>
    <style jsx>{`
      div {
        border: 0;
        border-bottom: 1px solid #ccc;
        margin: 50px 30px;
      }
    `}</style>
  </div>
)

export const Quote = ({ children }, { darkBg } = {}) => (
  <blockquote className={darkBg ? 'dark' : ''}>
    {children}
    <style jsx>{`
      blockquote {
        padding: 10px 20px;
        border-left: 5px solid #000;
        margin: 20px 0;
        color: #888;
      }

      blockquote.dark {
        border-left-color: #fff;
      }

      blockquote :global(div) {
        margin: 0;
      }
    `}</style>
  </blockquote>
)

Quote.contextTypes = {
  darkBg: PropTypes.bool
}

P.B = B
