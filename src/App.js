import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import styled from 'styled-components'

import Home from './Home'
import Debate from './Debate'
import PageNotFound from './PageNotFound'
import { DEBATES_LIST } from './data'

class App extends Component {
  render() {
    return (
      <AppContainer>
        <Switch>
          <Route exact path="/" component={Home} />
          {DEBATES_LIST.map(debate =>
            <Route key={debate.path} path={debate.path} component={Debate} />
          )}
          <Route component={PageNotFound} />
        </Switch>
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
