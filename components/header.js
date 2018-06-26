import React from 'react'
import Link from 'next/link'
import Logo from './icons/logo'

class Header extends React.PureComponent {
  render() {
    const { clean } = this.props

    return (
      <div>
        <header className={clean ? 'clean' : null}>
          <Link prefetch href="/introduction">
            <a className="logo">{this.props.logo || <Logo />}</a>
          </Link>
        </header>
        <style jsx>
          {`
            header {
              max-width: 900px;
              margin: auto;
              padding: 30px 0;
              position: relative;
            }

            div.wip {
              padding: 8px 0 8px;
              color: white;
              width: 100%;
              background: #1ebea7ff;
              text-align: center;
              // position: absolute;
              font-size: 90%;
            }

            header.clean {
              max-width: 100%;
              margin: 0 30px;
            }

            a.logo {
              display: block;
              width: 39px;
              position: relative;
            }

            @media screen and (max-width: 950px) {
              header {
                text-align: center;
              }

              header.clean {
                margin: 0;
              }

              .logo {
                margin-left: 20px;
              }
            }
          `}
        </style>
      </div>
    )
  }
}

export default Header
