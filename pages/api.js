import Router from 'next/router'
import PropTypes from 'prop-types'
import React from 'react'
import { format, parse } from 'url'
import DocsNavbarDesktop from '../components/docs/navbar/desktop'
import DocsNavbarMobile from '../components/docs/navbar/mobile'
import DocsNavbarToggle from '../components/docs/navbar/toggle'
import Head from '../components/head'
import Header from '../components/header'
import Logo from '../components/icons/logo'
import Page from '../components/page'
import sections from '../components/api/sections'
import FreezePageScroll from '../components/freeze-page-scroll'
import data from '../lib/data/api'
import withAPI from '../lib/with-api'

if (typeof window !== 'undefined') {
  require('intersection-observer')
}

class API extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = { hash: null }
    this.contentNode = null
    this.observer = null

    this.onHashChange = this.onHashChange.bind(this)
  }

  componentDidMount() {
    window.addEventListener('hashchange', this.onHashChange)

    const nodes = [...this.contentNode.querySelectorAll('[id]')]
    const intersectingTargets = new Set()

    this.observer = new IntersectionObserver(entries => {
      for (const { isIntersecting, target } of entries) {
        if (isIntersecting) {
          intersectingTargets.add(target)
        } else {
          intersectingTargets.delete(target)
        }
      }

      if (!intersectingTargets.size) return

      const sorted = [...intersectingTargets].sort(
        (a, b) => nodes.indexOf(a) - nodes.indexOf(b)
      )
      const hash = '#' + (sorted[0].id || '')
      if (location.hash !== hash) {
        changeHash(hash)
        this.onHashChange()
      }
    })

    for (const node of nodes) {
      this.observer.observe(node)
    }

    const { hash } = window.location
    this.setState({ hash })
  }

  componentWillUnmount() {
    window.removeEventListener('hashchange', this.onHashChange)

    this.observer.disconnect()
    this.observer = null
  }

  onHashChange() {
    this.setState({ hash: window.location.hash })
  }

  render() {
    const { props } = this
    const { hash } = this.state

    return (
      <Page dayBanner={false}>
        <Head titlePrefix="" title={`ZEIT API`} />
        <div className="header-wrapper">
          <div className="header">
            <BGContainer darkBg={true}>
              <Header
                clean={true}
                logo={
                  <BGContainer darkBg={false}>
                    <Logo />
                  </BGContainer>
                }
                user={props.user}
                pathname={props.url.pathname}
                onLogout={() => {
                  props.onUser(null)
                  props.url.push('/login')
                }}
                onLogoRightClick={() => props.url.push('/logos')}
              />
            </BGContainer>
          </div>
        </div>
        <FreezePageScroll>
          <div className="sidebar">
            <DocsNavbarToggle />

            <DocsNavbarDesktop
              data={data}
              url={props.url}
              hash={hash}
              scrollSelectedIntoView={true}
            />
          </div>
        </FreezePageScroll>
        <div>
          <div className="doc-layout">
            <div className="topbar">
              <DocsNavbarMobile
                data={data}
                url={props.url}
                hash={hash}
                sticky={true}
              />
            </div>
            <div className="content" ref={ref => (this.contentNode = ref)}>
              {data.map(({ id, posts }) => {
                return (
                  <div key={id} className="category">
                    {posts.map(post => {
                      const Section = (sections[id] || {})[post.id]
                      return Section
                        ? <SectionContainer
                            key={post.id}
                            hash={post.hash}
                            name={post.name}
                          >
                            <Section
                              user={props.user}
                              testingToken={props.testingToken}
                            />
                          </SectionContainer>
                        : null
                    })}
                  </div>
                )
              })}
            </div>
            <div />
          </div>
        </div>
        <style jsx>{`
          :global(body) {
            padding-bottom: 0;
          }

          a {
            text-decoration: none;
            color: #999;
            transition: color .2s ease;
          }

          a:hover {
            color: #000;
          }

          .doc-layout {
            display: flex;
            margin: 0 0 0 240px;
            justify-content: left;
            -webkit-font-smoothing: antialiased;
          }

          .header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 101;
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
            padding: 0 20px;
          }

          .content {
            width: 100%;
          }

          @media screen and (min-width: 700px) {
            /* prettier-ignore */
            .category:first-child :global(.section:first-child .block:first-child .copy),
            .category:first-child :global(.section:first-child .block:first-child .example) {
              padding-top: 95px;
            }

            /* prettier-ignore */
            .category:last-child :global(.section:last-child .block:last-child .copy),
            .category:last-child :global(.section:last-child .block:last-child .example) {
              padding-bottom: 95px;
            }
          }

          @media screen and (max-width: 950px) {
            .header-wrapper {
              height: 95px;
            }

            .header {
              background: #fff;
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
}

export default withAPI(API)

class SectionContainer extends React.PureComponent {
  getChildContext() {
    return {
      hash: this.props.hash,
      name: this.props.name
    }
  }

  render() {
    return this.props.children
  }
}

SectionContainer.childContextTypes = {
  hash: PropTypes.string,
  name: PropTypes.string
}

class BGContainer extends React.PureComponent {
  getChildContext() {
    return { darkBg: this.props.darkBg }
  }

  render() {
    return this.props.children
  }
}

BGContainer.childContextTypes = {
  darkBg: PropTypes.bool
}

function changeHash(hash) {
  const { pathname, query } = Router

  const parsedUrl = parse(location.href)
  parsedUrl.hash = hash

  Router.router.changeState(
    'replaceState',
    format({ pathname, query }),
    format(parsedUrl)
  )
}
