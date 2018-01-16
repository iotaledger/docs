import React from 'react'
import { withRouter } from 'next/router'
import Link from 'next/link'

const ActivePageButton = withRouter(({ children, router, href }) => {
  return (
    <Link href={href} prefetch>
      <span className="active-button">
        {children}
        <style jsx>{`
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
          <ActivePageButton href="/docs">
            <button>Docs</button>
          </ActivePageButton>
          <ActivePageButton href="/api">
            <button>API Reference</button>
          </ActivePageButton>
        </div>

        <style jsx>{`
          .toggle-container {
            display: flex;
            justify-content: center;
            margin-bottom: 30px;
          }

          .toggle {
            display: flex;
            border-radius: 5px;
            border: 1px solid #eaeaea;
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
          }

          .toggle :global(span:not(:last-child)) {
            border-right: 1px solid #eaeaea;
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
