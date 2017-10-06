import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Home from './Home'
import Debate from './Debate'

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/debate" component={Debate} />
      </div>
    )
  }
}

export default App
