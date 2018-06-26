import PropTypes from 'prop-types'
import React from 'react'
import NextHead from 'next/head'
import NProgress from 'nprogress'
import debounce from 'lodash.debounce'
import RouterEvents from '../lib/router-events'

const start = debounce(NProgress.start, 200)
RouterEvents.on('routeChangeStart', start)
RouterEvents.on('routeChangeComplete', () => {
  start.cancel()
  NProgress.done()
})
RouterEvents.on('routeChangeError', () => {
  start.cancel()
  NProgress.done()
})

if (global.document) {
  const info = [
    `Check out the awesome peeps that made these docs: https://zeit.co/oss`,
    `Have a great day! 📣🐢`
  ]

  for (const message of info) {
    // eslint-disable-next-line no-console
    console.log(message)
  }
}

class Head extends React.PureComponent {
  render() {
    const titlePrefix =
      null != this.props.titlePrefix ? this.props.titlePrefix : 'IOTA – '
    const ogDescription = this.props.ogDescription || this.props.description
    const { darkBg } = this.context
    return (
      <div>
        <NextHead>
          <title>{titlePrefix + this.props.title}</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta
            name="twitter:card"
            content={this.props.image ? 'summary_large_image' : 'summary'}
          />
          <meta name="twitter:site" content="@iotatoken" />
          <meta
            name="og:title"
            content={this.props.ogTitle || this.props.title}
          />
          <meta name="og:url" content={this.props.url || 'https://iota.org'} />
          {this.props.description ? (
            <meta name="description" content={this.props.description} />
          ) : null}
          {ogDescription ? (
            <meta name="og:description" content={ogDescription} />
          ) : null}
          {this.props.video
            ? [
                <meta name="og:type" content="video" key="0" />,
                <meta name="og:video" content={this.props.video} key="1" />,
                <meta name="og:video:type" content="video/mp4" key="2" />
              ]
            : null}

          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-114859682-1"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());

                      gtag('config', 'UA-114859682-1');
                    `
            }}
          />
          <meta name="theme-color" content="#000" />
          {this.props.children}
        </NextHead>
        <style jsx global>
          {`
            #nprogress {
              pointer-events: none;
            }
            #nprogress .bar {
              position: fixed;
              z-index: 2000;
              top: 0;
              left: 0;
              width: 100%;
              height: 2px;
            }
            #nprogress .peg {
              display: block;
              position: absolute;
              right: 0px;
              width: 100px;
              height: 100%;
              opacity: 1;
              transform: rotate(3deg) translate(0px, -4px);
            }
          `}
        </style>
        <NextHead>
          <style>
            {`
            #nprogress .bar {
              background: ${darkBg ? '#fff' : '#000'};
            }

            #nprogress .peg {
              box-shadow: ${
                darkBg
                  ? '0 0 10px #fff, 0 0 5px #fff'
                  : '0 0 10px #ccc, 0 0 5px #ccc'
              };
            }
          `}
          </style>
        </NextHead>
      </div>
    )
  }
}

Head.contextTypes = {
  darkBg: PropTypes.bool
}

export default Head
