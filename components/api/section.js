import PropTypes from 'prop-types'
import React from 'react'
import Heading from '../heading'
import { PDIV, P } from '../text/paragraph'
import { UL, LI } from '../text/list'
import { H3, H4 } from '../text/heading'
import { InlineCode } from '../text/code'
import { ExternalLink } from '../text/link'

export default class Section extends React.PureComponent {
  getChildContext() {
    return { id: this.getId() }
  }

  getId() {
    const hash = this.props.hash || this.context.hash
    return hash ? hash.slice(1) : null
  }

  render() {
    const title = this.props.title || this.context.name

    return (
      <div className="section">
        <div className="block">
          <div className="copy">
            <Heading lean={true} offsetTop={95} id={this.getId()}>
              <h1>
                {title}
              </h1>
            </Heading>
          </div>
          <div className="example empty" />
        </div>
        {this.props.contents.map(([copy, example], i) => {
          return (
            <div key={i} className="block">
              <div className="copy">
                {copy}
              </div>
              <div className={'example' + (example ? '' : ' empty')}>
                <DarkBG>
                  {example}
                </DarkBG>
              </div>
            </div>
          )
        })}

        <style jsx>{`
          .section {
            flex: 1;
            position: relative;
          }

          h1 {
            color: #000;
            font-size: 26px;
            line-height: 1.1;
            font-weight: 400;
            margin: 0 0 30px 0;
            padding: 0;
          }

          .block {
            display: flex;
            position: relative;
          }

          .copy {
            background: #fafafa;
            display: flex;
            flex-direction: column;
          }

          .example {
            background: #000;
            color: #999;
            display: flex;
            flex-direction: column;
          }

          .example :global(*::selection) {
            background-color: #f81ce5;
            color: #fff;
          }

          .copy,
          .example {
            padding: 0 50px;
            width: 50%;
          }

          .block:first-child .copy,
          .block:first-child .example {
            padding-top: 35px;
          }

          .block:last-child .copy,
          .block:last-child .example {
            padding-bottom: 15px;
          }

          @media screen and (max-width: 950px) {
            .section {
              width: 100%;
              margin-left: 0;
            }
          }

          @media screen and (min-width: 700px) {
            /* the little line below each section */
            .section::after {
              height: 1px;
              display: block;
              content: '';
              width: 100%;
              background-image: linear-gradient(90deg, #eaeaea 50%, #333 50%);
            }

            .example :global(div:first-child) > :global(pre) {
              margin-top: 0 !important;
            }
          }

          @media screen and (max-width: 700px) {
            .block {
              display: block;
            }

            .copy,
            .example {
              padding: 0 20px;
              width: auto;
            }

            .copy {
              background: #fff;
            }

            .example {
              padding-top: 20px;
              padding-bottom: 20px;
            }

            .example.empty {
              display: none;
            }
          }
        `}</style>
      </div>
    )
  }
}

Section.childContextTypes = {
  id: PropTypes.string
}

Section.contextTypes = {
  hash: PropTypes.string,
  name: PropTypes.string
}

class DarkBG extends React.PureComponent {
  getChildContext() {
    return { darkBg: true }
  }

  render() {
    return this.props.children || null
  }
}

DarkBG.childContextTypes = {
  darkBg: PropTypes.bool
}

class DocH2 extends React.PureComponent {
  render() {
    const { children, id } = this.props
    return (
      <Heading
        lean={true}
        offsetTop={175}
        id={generateId(this.context.id, { children, id })}
      >
        <H3>
          {children}
        </H3>
      </Heading>
    )
  }
}

DocH2.contextTypes = {
  id: PropTypes.string
}

class DocH3 extends React.PureComponent {
  render() {
    const { children, id } = this.props
    return (
      <Heading
        lean={true}
        offsetTop={175}
        id={generateId(this.context.id, { children, id })}
      >
        <H4>
          {children}
        </H4>
      </Heading>
    )
  }
}

DocH3.contextTypes = {
  id: PropTypes.string
}

class DocH4 extends React.PureComponent {
  render() {
    return (
      <h4>
        {this.props.children}
        <style jsx>{`
          h4 {
            margin-top: 50px;
          }
        `}</style>
      </h4>
    )
  }
}

export const Quote = ({ children }, { darkBg } = {}) =>
  <blockquote className={darkBg ? 'dark' : ''}>
    {children}
    <style jsx>{`
      blockquote {
        padding: 10px 20px;
        border-left: 5px solid #000;
        margin: 50px 0;
        color: #000;
      }

      blockquote.dark {
        border-left-color: #fff;
        color: #888;
      }

      blockquote :global(div) {
        margin: 0;
      }
    `}</style>
  </blockquote>

Quote.contextTypes = {
  darkBg: PropTypes.bool
}

export const components = {
  p: PDIV,
  strong: P.B,
  ul: UL,
  li: LI,
  h2: DocH2,
  h3: DocH3,
  h4: DocH4,
  code: InlineCode,
  a: ExternalLink,
  blockquote: Quote
}

function generateId(prefix, { id, children }) {
  if (!id) {
    const text = 'string' === typeof children ? children : children.join('')
    id = text.toLowerCase().replace(/[\s]/g, '-').replace(/[?!]/g, '')
  }

  return `${prefix}/${id}`
}
