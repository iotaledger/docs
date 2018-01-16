import PropTypes from 'prop-types'
import React from 'react'

class Logo extends React.PureComponent {
  render() {
    return (
      <svg
        className={this.context.darkBg ? 'dark' : ''}
        viewBox="0 0 226 200"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            x1="196.572434%"
            y1="228.815483%"
            x2="50%"
            y2="50%"
            id="l1"
          >
            <stop offset="0%" />
            <stop offset="100%" />
          </linearGradient>
        </defs>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-141.000000, -156.000000)" fill="url(#l1)">
            <polygon points="254 156.459299 367 356 141 356 " />
          </g>
        </g>
        <style jsx>
          {`
            linearGradient stop:first-child {
              stop-color: #fff;
            }

            linearGradient stop:last-child {
              stop-color: #000;
            }

            .dark linearGradient stop:first-child {
              stop-color: #000;
            }

            .dark linearGradient stop:last-child {
              stop-color: #fff;
            }
          `}
        </style>
      </svg>
    )
  }
}

Logo.contextTypes = {
  darkBg: PropTypes.bool
}

export default Logo
