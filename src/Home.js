import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Home</h1>
        <Link to="/debate">Go to debate</Link>
      </div>
    )
  }
}

export default Home
