import React from 'react'
import Link from 'next/link'
import qs from 'querystring'
import { parse } from 'url'
import _scrollIntoViewIfNeeded from 'scroll-into-view-if-needed'

function scrollIntoViewIfNeeded(elem, centerIfNeeded, options, config) {
  const finalElement = findClosestScrollableElement(elem)
  return _scrollIntoViewIfNeeded(
    elem,
    centerIfNeeded,
    options,
    finalElement,
    config
  )
}

function findClosestScrollableElement(_elem) {
  const { parentNode } = _elem
  if (!parentNode) return null

  if (
    parentNode.scrollHeight > parentNode.clientHeight ||
    parentNode.scrollWidth > parentNode.clientWidth
  ) {
    return parentNode
  } else {
    return findClosestScrollableElement(parentNode)
  }
}

export class NavLink extends React.Component {
  constructor(props) {
    super(props)
    this.node = null
    this.state = { selected: this.isSelected() }
  }

  componentDidMount() {
    this.scrollIntoViewIfNeeded()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ selected: this.isSelected(nextProps) })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.selected !== nextState.selected
  }

  componentDidUpdate() {
    this.scrollIntoViewIfNeeded()
  }

  getCurrentHref(props = this.props) {
    const { url, hash } = props
    const query = qs.stringify(url.query)
    return `${url.pathname}${query ? '?' + query : ''}${hash || ''}`
  }

  isSelected(props = this.props) {
    const { href, aliases = [], posts } = props.info
    const currentHref = this.getCurrentHref(props)

    if (href === currentHref) return true
    if (href.includes('#')) {
      if (posts && posts.length && currentHref === href) return true
      if ((!posts || !posts.length) && currentHref.startsWith(href)) return true
    }
    if (aliases.indexOf(currentHref) >= 0) return true

    return false
  }

  onlyHashChange() {
    const { pathname } = parse(this.props.info.href)
    return pathname === this.props.url.pathname
  }

  scrollIntoViewIfNeeded() {
    if (this.props.scrollSelectedIntoView && this.state.selected) {
      if (this.node.scrollIntoViewIfNeeded) {
        this.node.scrollIntoViewIfNeeded()
      } else {
        scrollIntoViewIfNeeded(this.node)
      }
    }
  }

  render() {
    const { info, level } = this.props
    const { selected } = this.state

    return (
      <div
        ref={ref => (this.node = ref)}
        className={selected ? 'selected' : ''}
      >
        {// NOTE: use just anchor element for triggering `hashchange` event
        this.onlyHashChange() ? (
          <a className={selected ? 'selected' : ''} href={info.as || info.href}>
            {level > 2 && <span>-</span>} {info.name}
          </a>
        ) : (
          <Link href={info.href} as={info.as || info.href} prefetch>
            <a className={selected ? 'selected' : ''}>
              {level > 2 && <span>-</span>} {info.name}
            </a>
          </Link>
        )}
        <style jsx>{`
          div {
            padding: 4px 10px 4px 30px;
          }
          div.selected {
            border-left: 4px solid black;
            box-sizing: border-box;
            padding-left: 26px;
          }

          a {
            text-decoration: none;
            font-size: 14px;
            color: #000;
            box-sizing: border-box;
          }

          a.selected {
            font-weight: 600;
            color: #000;
          }

          span {
            color: #979797;
          }

          @media screen and (max-width: 950px) {
            div {
              padding-top: 0;
              padding-left: 0;
              padding-bottom: 0;
            }

            div.selected {
              border-left: none;
              padding-left: 0;
            }

            a {
              display: block;
              padding: 20px 0;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default class DocsNavbarDesktop extends React.PureComponent {
  isCategorySelected(info) {
    const { href } = info

    if (href.includes('#')) {
      const { hash } = parse(href)
      if (this.props.hash && this.props.hash.startsWith(hash)) {
        return true
      }
    }

    return false
  }

  renderPost(info, level) {
    if (info.posts) {
      return this.renderCategory(info, level)
    }

    return (
      <div className="link" key={info.href}>
        <NavLink
          info={info}
          url={this.props.url}
          hash={this.props.hash}
          scrollSelectedIntoView={this.props.scrollSelectedIntoView}
          level={level}
        />
        <style jsx>{`
          .link {
            margin: 10px 0;
          }

          @media screen and (max-width: 950px) {
            .link {
              margin: 0;
              border-bottom: 1px solid #eee;
            }
          }
        `}</style>
      </div>
    )
  }

  renderCategory(info, level = 1) {
    const levelClass = `level-${level}`

    return (
      <div className={`category ${levelClass}`} key={info.name || ''}>
        <div className={'label' + (info.href ? ' link' : '')}>
          {info.href ? (
            <NavLink
              info={info}
              url={this.props.url}
              hash={this.props.hash}
              level={level}
            />
          ) : (
            info.name
          )}
        </div>
        {!info.href || this.isCategorySelected(info) ? (
          <div className="posts">
            {info.posts.map(postInfo => this.renderPost(postInfo, level + 1))}
          </div>
        ) : null}
        <style jsx>{`
          .label {
            margin: 0 0 15px 0;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 1.3px;
            font-weight: 400;
            color: #888;
            cursor: default;
          }

          .level-2 .label {
            font-size: 14px;
            font-weight: 400;
            margin: 10px 0;
            text-transform: none;
            letter-spacing: 0;
            cursor: default;
          }

          .category.level-1 {
            margin: 0 0 50px 0;
          }

          .label:not(.link) {
            padding-left: 30px;
          }

          @media screen and (max-width: 950px) {
            .label {
              margin: 0;
            }

            .label:not(.link) {
              padding-left: 0;
            }

            .level-2 .label {
              margin: 0;
              border-bottom: 1px solid #eee;
            }

            .level-2 .label:not(.link) {
              padding: 20px 0;
            }
          }
        `}</style>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.props.data.map(categoryInfo => this.renderCategory(categoryInfo))}
      </div>
    )
  }
}
