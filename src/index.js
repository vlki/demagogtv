import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import smoothscrollPolyfill from 'smoothscroll-polyfill'

import 'bootstrap/dist/css/bootstrap.css'

import App from './App'

smoothscrollPolyfill.polyfill()

ReactDOM.hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)
