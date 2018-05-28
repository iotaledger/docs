import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import formatDate from 'date-fns/format'
// Components
import Head from '../components/head'
import Header from '../components/header'
import Heading from '../components/heading'
import Page from '../components/page'
import { PDIV, P, Quote } from '../components/text/paragraph'
import { UL, LI } from '../components/text/list'
import { H3, H4, H5 } from '../components/text/heading'
import { InlineCode } from '../components/text/code'
import { GenericLink } from '../components/text/link'
import HR from '../components/text/hr'
import GitHubIcon from '../components/icons/github'
import DocsNavbarDesktop from '../components/docs/navbar/desktop'
import DocsNavbarMobile from '../components/docs/navbar/mobile'
import DocsNavbarToggle from '../components/docs/navbar/toggle'
import FreezePageScroll from '../components/freeze-page-scroll'
import lastEdited from './data/last-edited.json'

import Menu from './data/menu'

const getMenu = path => {
  return Menu[path.split('/')[1]]
}

export default function withDoc(options) {
  return function withContent(content) {
    const DocPage = props => {
      const date = lastEdited[options.editUrl]
        ? new Date(lastEdited[options.editUrl])
        : new Date()

      return (
        <Page>
          <Head titlePrefix="" title={`${options.title} - IOTA Docs`} />
          <div className="header">
            <Header
              clean={true}
              inverse={true}
              user={props.user}
              pathname={props.url.pathname}
              onLogout={() => {
                this.props.onUser(null)
                this.props.url.push('/login')
              }}
              onLogoRightClick={() => props.url.push('/logos')}
            />
          </div>
          <FreezePageScroll>
            <div className="sidebar">
              <DocsNavbarToggle />
              <DocsNavbarDesktop
                data={getMenu(props.url.pathname)}
                url={props.url}
                scrollSelectedIntoView={true}
              />
            </div>
          </FreezePageScroll>
          <div>
            <div className="doc-layout">
              <div className="topbar">
                <DocsNavbarMobile
                  data={getMenu(props.url.pathname)}
                  url={props.url}
                />
              </div>
              <div className="content">
                <h1>{options.title}</h1>
                <div className="doc-markdown">{content}</div>
                <footer>
                  <time dateTime={lastEdited[options.editUrl]}>
                    Last Edited: {formatDate(date, 'dddd, MMMM Do YYYY')} ({distanceInWordsToNow(
                      date,
                      {
                        addSuffix: false
                      }
                    )})
                  </time>
                  <a
                    href={`https://github.com/iotaledger/docs/edit/master/${options.editUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Edit on GitHub</span>
                    <GitHubIcon height={16} width={16} />
                  </a>
                </footer>
              </div>
              <div />
            </div>
          </div>
          <style jsx>{`
            .toggle {
              display: flex;
              flex-direction: row;
            }

            a {
              text-decoration: none;
              color: #999;
              transition: color 0.2s ease;
            }

            a:hover {
              color: #000;
            }

            .button:first-of-type {
              width: 79px;
              margin-left: 30px;
              border-right: none;
              border-radius: 5px 0 0 5px;
            }

            .button {
              text-align: center;
              font-size: 12px;
              border: 1px solid #eaeaea;
              display: inline-block;
              padding: 5px 10px 5px 10px;
              margin-bottom: 30px;
              border-radius: 0 5px 5px 0;
            }

            .doc-layout {
              display: flex;
              margin: 96px 30px 50px 271px;
              padding: 10px 20px 0;
              justify-content: left;
              -webkit-font-smoothing: antialiased;
            }

            .header {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
            }

            .sidebar {
              position: fixed;
              width: 240px;
              margin-top: 0;
              bottom: 0;
              left: 0;
              top: 100px;
              overflow: auto;
              -webkit-font-smoothing: antialiased;
            }

            .topbar {
              display: none;
            }

            .content {
              flex: 1;
              max-width: 600px;
            }

            .content h1 {
              color: #000;
              font-size: 26px;
              line-height: 1.1;
              font-weight: 400;
              margin: 0 0 30px 0;
              padding: 0;
            }

            footer {
              border-top: 1px solid #eaeaea;
              padding-top: 30px;
              display: flex;
              justify-content: space-between;
            }

            footer time {
              color: #999;
              font-size: 14px;
            }

            footer a {
              text-transform: uppercase;
              color: black;
              font-size: 12px;
              font-weight: bold;
              display: flex;
              align-items: center;
            }

            footer a span {
              margin-right: 0.5em;
            }

            @media screen and (max-width: 950px) {
              .header {
                position: relative;
              }

              .doc-layout {
                display: block;
                margin: 0;
              }

              .content {
                width: 100%;
                margin-left: 0;
              }

              .sidebar {
                display: none;
              }

              .topbar {
                display: block;
              }
            }
          `}</style>
        </Page>
      )
    }

    return DocPage
  }
}

const DocH2 = ({ children }) => (
  <Heading lean={true} offsetTop={175}>
    <H3>{children}</H3>
  </Heading>
)

const DocH3 = ({ children }) => (
  <Heading lean={true} offsetTop={175}>
    <H4>{children}</H4>
  </Heading>
)

const DocH4 = ({ children }) => (
  <Heading lean={true} offsetTop={175}>
    <H5>{children}</H5>
  </Heading>
)

export const components = {
  p: PDIV,
  strong: P.B,
  ul: UL,
  li: LI,
  h2: DocH2,
  h3: DocH3,
  h4: DocH4,
  code: InlineCode,
  a: GenericLink,
  blockquote: Quote,
  hr: HR
}
