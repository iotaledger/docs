import React from 'react'
import { withRouter } from 'next/router'
import Link from 'next/link'

const ActivePageButton = withRouter(({ children, router, href, external }) => {
  if (external) {
    return (
      <a href={href} target={'_blank'}>
        <span className="active-button">
          {children}
          <style jsx>{`
            span {
              position: relvative;
            }
            .active-button :global(button) {
              color: ${router.pathname === href ||
              router.pathname.startsWith(href)
                ? '#000'
                : '#999'};
            }
          `}</style>
        </span>
      </a>
    )
  } else {
    return (
      <Link href={href} prefetch>
        <span className="active-button">
          {children}
          <style jsx>{`
            span {
              position: relvative;
            }
            .active-button :global(button) {
              color: ${router.pathname === href ||
              router.pathname.startsWith(href)
                ? '#000'
                : '#999'};
            }
          `}</style>
        </span>
      </Link>
    )
  }
})

export default class DocsNavbarToggle extends React.Component {
  render() {
    return (
      <div className="toggle-container">
        <div className="toggle">
          <ActivePageButton href="/introduction">
            <button className="toggle-button">Introduction</button>
          </ActivePageButton>
        </div>
        <div className="toggle">
          <ActivePageButton href="/iri">
            <button className="toggle-button">IOTA Node (IRI)</button>
          </ActivePageButton>
          <ActivePageButton href="https://iota.readme.io/reference" external>
            <button className={'toggle-button api'}>API</button>
          </ActivePageButton>
        </div>
        <div className="toggle">
          <ActivePageButton href="/trinity">
            <button className="toggle-button">Trinity Wallet</button>
          </ActivePageButton>
        </div>
        <div className="toggle">
          <ActivePageButton href="/hub">
            <button className="toggle-button">Hub</button>
          </ActivePageButton>
        </div>

        <style jsx>{`
          .toggle-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-bottom: 30px;
            margin: 30px;
            border: 1px solid #eaeaea;
            border-radius: 5px;
            position: relative;
          }

          .toggle {
            display: flex;
            justify-content: space-between;
            border-top: 1px solid #eaeaea;
          }

          .toggle:first-child {
            border: none;
          }

          .toggle-button {
            min-width: 80px;
            padding: 0 12px;
            border: none;
            background: none;
            cursor: pointer;
            height: 24px;
            font-size: 12px;
            transition: color 0.12s ease-in-out;
            text-align: left;
          }

          .toggle button:focus {
            outline: none;
          }

          .toggle button:hover {
            color: #000;
          }

          .api {
            text-align: right;
            min-width: auto;
          }
        `}</style>
      </div>
    )
  }
}
