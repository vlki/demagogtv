import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import styled from 'styled-components'

class PageNotFound extends Component {
  render() {
    return (
      <RouteStatus statusCode={404}>
        <Container className="container-fluid">
          <h1>Stránka neexistuje</h1>
          <Link to="/">Zpět na úvod DemagogTV</Link>
        </Container>
      </RouteStatus>
    )
  }
}

const Container = styled.div`
  max-width: 1000px;
  padding-top: 35px;
`

// From react-router example
// https://reacttraining.com/react-router/web/example/static-router
const RouteStatus = (props) => (
  <Route
    render={({ staticContext }) => {
      // we have to check if staticContext exists
      // because it will be undefined if rendered through a BrowserRouter
      if (staticContext) {
        staticContext.statusCode = props.statusCode
      }

      return (
        <div>
          {props.children}
        </div>
      )
    }}
  />
)

export default PageNotFound
