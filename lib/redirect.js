// Packages
import React from 'react'
import Router from 'next/router'

const redirectTo = destination =>
  class RedirectRoute extends React.Component {
    static getInitialProps({ res }) {
      if (res) {
        res.writeHead(301, { Location: destination })
        res.end()
      } else {
        if (destination.charAt(0) === '/') {
          Router.push(destination)
        } else {
          window.location = destination
        }
      }

      return {}
    }
  }

export default redirectTo
