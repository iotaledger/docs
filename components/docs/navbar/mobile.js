import React from 'react'
import DocsNavbarDesktop from './desktop'
import Arrow from '../../arrow'

export default class DocsNavbarMobile extends React.Component {
  state = { show: false }

  toggle() {
    this.setState({ show: !this.state.show })
  }

  render() {
    const { show } = this.state

    return (
      <div>
        <div
          className={show ? 'arrow show' : 'arrow'}
          onClick={() => this.toggle()}
        >
          <Arrow />
        </div>
        {show ? <DocsNavbarDesktop {...this.props} /> : null}
        <style jsx>{`
          .arrow {
            margin: 0 0 30px 0;
            width: 27px;
          }

          .arrow.show {
            transform: rotate(180deg);
          }
        `}</style>
      </div>
    )
  }
}
