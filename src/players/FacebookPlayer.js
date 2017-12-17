import React, { Component } from 'react'
import { default as ReactFacebookPlayer } from 'react-facebook-player'

const APP_ID = '150764505690468'

class FacebookPlayer extends Component {
  player = null

  handleReactFacebookPlayerReady = (id, player) => {
    this.player = player

    if (this.player.isMuted()) {
      this.player.unmute()
    }

    this.props.onReady({
      getTime: this.getTime,
      goToTime: this.goToTime,
      setSize: this.setSize
    })
  }

  getTime = () => {
    return this.player.getCurrentPosition()
  }

  goToTime = time => {
    this.player.seek(time)
    this.player.play()
  }

  setSize = (width, height) => {
    // intentionally nothing
  }

  render() {
    const { debate, width } = this.props

    return (
      <ReactFacebookPlayer
        appId={APP_ID}
        videoId={debate.player.videoId}
        onReady={this.handleReactFacebookPlayerReady}
        width={width}
      />
    )
  }
}

export default FacebookPlayer
