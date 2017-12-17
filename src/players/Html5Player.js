import React, { Component } from 'react'

class Html5Player extends Component {
  player = null

  componentDidMount() {
    this.props.onReady({
      getTime: this.getTime,
      goToTime: this.goToTime,
      setSize: this.setSize
    })
  }

  getTime = () => {
    return this.player.currentTime
  }

  goToTime = time => {
    this.player.currentTime = time
    this.player.play()
  }

  setSize = (width, height) => {
    // intentionally nothing
  }

  render() {
    const { debate, height, width } = this.props

    return (
      <video
        src={debate.player.src}
        preload="preload"
        controls="controls"
        width={width}
        height={height}
        ref={player => this.player = player}
      />
    )
  }
}

export default Html5Player
