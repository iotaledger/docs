import React from 'react'
import debounce from 'lodash.debounce'

class ScrollerContainer extends React.PureComponent {
  state = { hasMoreScroll: false }

  scrollerNode = null

  onScroll = () => {
    this.updateScrollState()
  }

  onWindowResize = debounce(() => {
    this.updateScrollState()
  }, 250)

  updateScrollState() {
    const hasMoreScroll =
      this.scrollerNode.scrollWidth -
        this.scrollerNode.clientWidth -
        this.scrollerNode.scrollLeft >
      10
    if (this.state.hasMoreScroll !== hasMoreScroll) {
      this.setState({ hasMoreScroll })
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.onWindowResize)
    this.updateScrollState()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize)
  }

  render() {
    const { hasMoreScroll } = this.state
    return (
      <main className={hasMoreScroll ? 'has-more-scroll' : null}>
        <div
          className="scroller"
          ref={ref => (this.scrollerNode = ref)}
          onScroll={this.onScroll}
        >
          {this.props.children}
        </div>
        <div className="gradient" />

        <style jsx>{`
          main {
            position: relative;
          }
          .scroller {
            overflow-x: auto;
          }
          .gradient {
            background: linear-gradient(
              to right,
              rgba(255, 255, 255, 0),
              rgba(255, 255, 255, 1)
            );
            opacity: 0;
            pointer-events: none;
            position: absolute;
            transition: opacity ease-in 300ms;
            top: 0;
            right: 0;
            bottom: 0;
            width: 100px;
          }
          .has-more-scroll .gradient {
            opacity: 1;
          }
        `}</style>
      </main>
    )
  }
}

export function Table({ children, head }) {
  return (
    <ScrollerContainer>
      <table>
        {head && <thead>{head}</thead>}
        <tbody>{children}</tbody>
      </table>
    </ScrollerContainer>
  )
}

export function InputTable({ children }) {
  return (
    <Table
      head={
        <Row>
          <Cell isHead>Key</Cell>
          <TypeCell isHead>Type</TypeCell>
          <Cell isHead>Required</Cell>
          <FullWidthCell isHead>Description</FullWidthCell>
        </Row>
      }
    >
      {children}
    </Table>
  )
}

export function OutputTable({ children }) {
  return (
    <Table
      head={
        <Row>
          <Cell isHead>Key</Cell>
          <TypeCell isHead>Type</TypeCell>
          <FullWidthCell isHead>Description</FullWidthCell>
        </Row>
      }
    >
      {children}
    </Table>
  )
}

export function HeadersTable({ children }) {
  return (
    <Table
      head={
        <Row>
          <Cell isHead>Header</Cell>
          <Cell isHead>Description</Cell>
        </Row>
      }
    >
      {children}
    </Table>
  )
}

export function Row({ children }) {
  return <tr>{children}</tr>
}

export function Cell({ children, isHead, center }) {
  const className = center ? 'center' : null
  if (isHead) {
    return (
      <th className={className}>
        {children}
        <style jsx>{`
          th {
            padding: 12px 20px 12px 0;
            color: #999;
            font-size: 12px;
            font-weight: normal;
            line-height: 24px;
            text-align: left;
            text-transform: uppercase;
            vertical-align: top;
          }
          th:last-child {
            padding-right: 0;
          }
          .center {
            text-align: center;
          }
        `}</style>
      </th>
    )
  } else {
    return (
      <td className={className}>
        {children}
        <style jsx>{`
          td {
            border-bottom: 1px solid #eaeaea;
            font-size: 14px;
            line-height: 24px;
            padding: 12px 20px 12px 0;
            vertical-align: top;
          }
          td:last-child {
            padding-right: 0;
          }
          .center {
            text-align: center;
          }
        `}</style>
      </td>
    )
  }
}

export function TypeCell({ children, ...props }) {
  return (
    <Cell {...props}>
      <a className={props.isHead ? 'head' : null} href="/api#api-basics/types">
        <span>{children}</span>
        {props.isHead ? <QuestionInCircle /> : null}
        <style jsx>
          {`
            a {
              text-decoration: none;
              color: #666;
              font-size: inherit;
            }
            a.head {
              align-items: center;
              color: inherit;
              display: flex;
            }
            a:hover,
            a.head:hover {
              color: #000;
              text-decoration: underline dashed;
            }
            a.head span {
              margin-right: 5px;
            }
            a.head:hover :global(svg circle) {
              stroke: #000;
            }
            a.head:hover :global(svg text) {
              fill: #000;
            }
          `}
        </style>
      </a>
    </Cell>
  )
}

export function BoldCell({ children, ...props }) {
  return (
    <Cell {...props}>
      <b>{children}</b>
    </Cell>
  )
}

export function BooleanCell({ status = false, ...props }) {
  return <Cell {...props}>{status ? 'Yes' : 'No'}</Cell>
}

export function FullWidthCell(props) {
  const { children, ...rest } = props
  return (
    <Cell {...rest}>
      <div>{children}</div>
      <style jsx>{`
        @media screen and (max-width: 700px) {
          div {
            width: calc(100vw - 42px);
          }
        }
      `}</style>
    </Cell>
  )
}

class QuestionInCircle extends React.Component {
  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <svg
        width="16px"
        height="16px"
        viewBox="0 0 16 16"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-254.000000, -132.000000)">
            <g transform="translate(255.000000, 133.000000)">
              <circle stroke="#EAEAEA" cx="7" cy="7" r="7" />
              <text
                fontFamily="SFUIText-Bold, SF UI Text"
                fontSize="10"
                fontWeight="bold"
                fill="#999999"
              >
                <tspan x="4.25" y="10.5">
                  ?
                </tspan>
              </text>
            </g>
          </g>
        </g>
      </svg>
    )
  }
}
