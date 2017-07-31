// Components
import Head from '../components/head'
import Header from '../components/header'
import Heading from '../components/heading'
import Page from '../components/page'
import { PDIV, P, Quote } from '../components/text/paragraph'
import { UL, LI } from '../components/text/list'
import { H3, H4 } from '../components/text/heading'
import { InlineCode } from '../components/text/code'
import { ExternalLink } from '../components/text/link'
import DocsNavbarDesktop from '../components/docs/navbar/desktop'
import DocsNavbarMobile from '../components/docs/navbar/mobile'
import FreezePageScroll from '../components/freeze-page-scroll'

export default function withDoc(options) {
  return function withContent(content) {
    const DocPage = props => (
      <Page>
        <Head titlePrefix="" title={`${options.title} - ZEIT Documentation`} />
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
            <DocsNavbarDesktop url={props.url} />
          </div>
        </FreezePageScroll>
        <div>
          <div className="doc-layout">
            <div className="topbar">
              <DocsNavbarMobile url={props.url} />
            </div>
            <div className="content">
              <h1>{options.title}</h1>
              <div className="doc-markdown">
                {content}
              </div>
            </div>
            <div />
          </div>
        </div>
        <style jsx>{`
          .doc-layout {
            display: flex;
            margin: 100px 30px 50px 320px;
            padding: 0 20px;
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
            width: 280px;
            margin-top: 0;
            bottom: 0;
            left: 0;
            top: 100px;
            padding-left: 30px;
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
            line-height: 20px;
            font-weight: 400;
            margin: 0 0 30px 0;
            padding: 0;
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

export const components = {
  p: PDIV,
  strong: P.B,
  ul: UL,
  li: LI,
  h2: DocH2,
  h3: DocH3,
  code: InlineCode,
  a: ExternalLink,
  blockquote: Quote
}
