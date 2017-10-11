import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import ReactGA from 'react-ga'
import PropTypes from 'prop-types'
import smoothscrollPolyfill from 'smoothscroll-polyfill'

import 'bootstrap/dist/css/bootstrap.css'

import App from './App'

smoothscrollPolyfill.polyfill()

ReactGA.initialize('UA-107985925-1')

class GAListener extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  }

  componentDidMount() {
    this.sendPageView(this.context.router.history.location)
    this.context.router.history.listen(this.sendPageView)
  }

  sendPageView(location) {
    ReactGA.set({ page: location.pathname })
    ReactGA.pageview(location.pathname)
  }

  render() {
    return this.props.children
  }
}

ReactDOM.hydrate(
  <BrowserRouter>
    <GAListener>
      <App />
    </GAListener>
  </BrowserRouter>,
  document.getElementById('root')
)
