// Packages
import NativeLink from 'next/link'

export const InternalLink = ({ href, as, children }) => (
  <NativeLink prefetch href={href} as={as}>
    <a>
      {children}

      <style jsx>
        {`
        a {
          text-decoration: none;
          color: #067df7;
          font-size: inherit;
        }

        a:hover {
          text-decoration: underline;
        }
        `}
      </style>
    </a>
  </NativeLink>
)

export const AnchorLink = ({ href, onClick, children }) => (
  <a href={href} onClick={onClick}>
    {children}

    <style jsx>
      {`
      a {
        text-decoration: none;
        color: #067df7;
        font-size: inherit;
      }

      a:hover {
        text-decoration: underline;
      }
      `}
    </style>
  </a>
)

export const ExternalLink = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {children}

    <style jsx>
      {`
      a {
        text-decoration: none;
        color: #067df7;
        font-size: inherit;
      }

      a:hover {
        text-decoration: underline;
      }
      `}
    </style>
  </a>
)
