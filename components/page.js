import PropTypes from 'prop-types'
import React from 'react'
import Head from 'next/head'
import { FONT_FAMILY_SANS } from './css-config'

class Page extends React.Component {
  getChildContext() {
    return {
      darkBg: this.props.darkBg || false
    }
  }

  render() {
    const { darkBg, children } = this.props
    return (
      <div>
        {children}
        <Head>
          <style
            dangerouslySetInnerHTML={{
              __html: `
            html {
              height: 100%;
              box-sizing: border-box;
            }

            *,
            *:before,
            *:after {
              box-sizing: inherit;
            }

            a {
              -webkit-tap-highlight-color: rgba(0,0,0,0);
            }

            body {
              position: relative;
              min-height: 100%;
              margin: 0;
              padding-bottom: 6rem;
              font-family: ${FONT_FAMILY_SANS};
              text-rendering: optimizeLegibility;
            }

            html, body {
              background-color: ${darkBg ? '#000' : '#fff'};
              color: ${darkBg ? '#fff' : '#000'};
            }

            ${darkBg
              ? `
              ::selection {
                background-color: #f81ce5;
                color: #fff;
              }
            `
              : `
              ::selection {
                background-color: #79FFE1;
                color: #000;
              }
            `}
          `
            }}
          />
        </Head>
      </div>
    )
  }
}

Page.childContextTypes = {
  darkBg: PropTypes.bool
}

export default Page
