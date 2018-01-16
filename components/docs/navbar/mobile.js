import React from 'react'
import DocsNavbarDesktop from './desktop'
import DocsNavbarToggle from './toggle'
import Arrow from '../../arrow'

export default class DocsNavbarMobile extends React.PureComponent {
  state = { show: false }

  toggle = () => {
    this.setState({ show: !this.state.show })
  }

  render() {
    const { sticky } = this.props
    const { show } = this.state

    return (
      <div className={sticky ? 'sticky' : null}>
        <div className={show ? 'arrow show' : 'arrow'} onClick={this.toggle}>
          <Arrow />
        </div>
        {show ? (
          <div className="navbar-container" onClick={this.toggle}>
            <DocsNavbarToggle />
            <DocsNavbarDesktop {...this.props} />
          </div>
        ) : null}
        <style jsx>{`
          .arrow {
            position: absolute;
            top: 40px;
            right: 20px;
            width: 27px;
            transition: transform 0.2s ease;
            z-index: 102;
          }

          .arrow.show {
            transform: rotate(180deg);
          }

          .sticky .arrow {
            position: fixed;
          }

          .navbar-container {
            background: #fff;
            width: 100%;
            overflow: scroll;
            z-index: 102;
          }

          .sticky .navbar-container {
            height: calc(100% - 95px);
            padding: 0 20px;
            position: fixed;
            top: 95px;
            left: 0;
          }
        `}</style>
      </div>
    )
  }
}
