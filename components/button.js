// Packages
import PropTypes from 'prop-types'
import React from 'react'

class Button extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      animationStartAt: null
    }

    this.el = null
    this.onClick = this.onClick.bind(this)
    this.onElement = this.onElement.bind(this)
    this.onAnimationComplete = this.onAnimationComplete.bind(this)
  }

  onClick(ev) {
    const { onClick } = this.props
    const rect = this.el.getBoundingClientRect()

    this.setState({
      animationStartAt: Date.now(),
      animationX: ev.clientX - rect.left,
      animationY: ev.clientY - rect.top
    })

    if (onClick) {
      onClick()
    }
  }

  onElement(el) {
    this.el = el
  }

  onAnimationComplete() {
    this.setState({
      animationStartAt: null,
      animationX: null,
      animationY: null
    })
  }

  render() {
    const { children, darkBg, ...domProps } = this.props
    const { animationStartAt, animationX, animationY } = this.state

    return (
      <button
        ref={this.onElement}
        {...domProps}
        onClick={this.onClick}
        className={darkBg ? 'light' : ''}
      >
        <b>{children}</b>
        {this.state.animationStartAt && (
          <Animation
            key={animationStartAt}
            x={animationX}
            y={animationY}
            onComplete={this.onAnimationComplete}
          />
        )}
        <style jsx>
          {`
            button {
              color: #fff;
              background: #000;
              display: inline-block;
              width: 200px;
              height: 50px;
              border: 2px solid #000;
              font-size: 12px;
              text-transform: uppercase;
              transition: background 0.2s ease, color 0.2 ease, color 0.2 ease;
              cursor: pointer;
              text-align: center;
              user-select: none;
              position: relative;
              overflow: hidden;
              transition: border 0.2s, background 0.2s, color 0.2s ease-out;
              border-radius: 5px;
            }

            button b {
              display: inline-block;
              overflow: none;
              z-index: 100;
              /* relative positioning is needed so that
             * the text can show up on top of the
             * animated layer shown upon click */
              position: relative;
            }

            button:hover {
              border: 2px solid #000;
              background: transparent;
              color: #000;
            }

            button.light {
              color: #000;
              border: 2px solid #fff;
              background: #fff;
            }

            button.light:hover {
              color: #fff;
              border: 2px solid #fff;
              background: #000;
            }

            button:disabled {
              border: 2px solid;
              background: #eaeaea;
              border-color: #eaeaea;
              color: #ccc;
              cursor: default;
            }
            button.light:disabled {
              border-color: #333;
              background: #333;
              color: #666;
            }
          `}
        </style>
      </button>
    )
  }
}

Button.contextTypes = {
  darkBg: PropTypes.bool
}

class Animation extends React.Component {
  constructor(props) {
    super(props)
    this.el = null
    this.onElement = this.onElement.bind(this)
    this.onAnimationEnd = this.onAnimationEnd.bind(this)
  }

  onElement(el) {
    this.el = el
    if (el) {
      el.addEventListener('animationend', this.onAnimationEnd)
    }
  }

  onAnimationEnd() {
    if (this.props.onComplete) {
      this.props.onComplete()
    }
  }

  render() {
    return (
      <div ref={this.onElement} className={this.context.darkBg ? 'light' : ''}>
        <svg
          style={{
            top: this.props.y - 10,
            left: this.props.x - 10
          }}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g fill="#ddd">
              <rect width="100%" height="100%" rx="10" />
            </g>
          </g>
        </svg>

        <style jsx>{`
          div {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
          }

          svg {
            position: absolute;
            animation: 400ms ease-in expand;
            animation-fill-mode: forwards;
            width: 20px;
            height: 20px;
          }

          div.light g g {
            fill: #333;
          }

          @keyframes expand {
            0% {
              opacity: 0;
              transform: scale(1);
            }

            30% {
              opacity: 1;
            }

            80% {
              opacity: 0.5;
            }

            100% {
              transform: scale(25);
              opacity: 0;
            }
          }
        `}</style>
      </div>
    )
  }
}

Animation.contextTypes = {
  darkBg: PropTypes.bool
}

export default Button
