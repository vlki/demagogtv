import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'

import Home from './Home'
import Debate from './Debate'

class App extends Component {
  render() {
    return (
      <AppContainer>
        <Route exact path="/" component={Home} />
        <Route path="/debate" component={Debate} />
      </AppContainer>
    )
  }
}

const AppContainer = styled.div`
  p {
    font-size: 16px;
    line-height: 1.5;
    color: #222222;
  }

  a {
    color: #EC4F2F;
    text-decoration: none;

    &:focus {
      color: #2795b6;
      text-decoration: none;
    }

    &:hover {
      color: #227594;
      text-decoration: none;
    }
  }
`

export default App
