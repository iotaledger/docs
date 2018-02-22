import React from 'react'
import { withRouter } from 'next/router'
import Link from 'next/link'

const ActivePageButton = withRouter(({ children, router, href }) => {
  return (
    <Link href={href} prefetch>
      <span className="active-button">
        {children}
        {/* {router.pathname === href ||
                router.pathname.startsWith(href) ? (
                    <aside>\/</aside>
                ) : null} */}
        <style jsx>{`
          span {
            position: relvative;
            width: 100%;
          }

          aside {
            position: absolute;
            top: 0;
            right: 0;
            padding: 3px 10px;
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
})

export default class DocsNavbarToggle extends React.Component {
  render() {
    return (
      <div className="toggle-container">
        <div className="toggle">
          <ActivePageButton href="/introduction">
            <button>Docs</button>
          </ActivePageButton>
        </div>
        {/* <div className="toggle">
          <ActivePageButton href="/iri">
            <button>IRI Node</button>
          </ActivePageButton>
        </div>
        <div className="toggle">
          <ActivePageButton href="/mam">
            <button>MAM</button>
          </ActivePageButton>
        </div> */}

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
            border-top: 1px solid #eaeaea;
          }

          .toggle:first-child {
            border: none;
          }

          .toggle button {
            min-width: 80px;
            padding: 0 12px;
            border: none;
            background: none;
            cursor: pointer;
            height: 24px;
            font-size: 12px;
            transition: color 0.12s ease-in-out;
            width: 100%;
            text-align: left;
          }

          .toggle button:focus {
            outline: none;
          }

          .toggle button:hover {
            color: #000;
          }
        `}</style>
      </div>
    )
  }
}
