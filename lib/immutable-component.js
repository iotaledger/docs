import React from 'react'

const immutableComponent = c =>
  class ImmutableComponent extends React.Component {
    shouldComponentUpdate() {
      return false
    }

    render() {
      return c(this.props)
    }
  }

export default immutableComponent
