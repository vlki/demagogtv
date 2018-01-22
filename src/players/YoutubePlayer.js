import React, { Component } from 'react'
import YouTube from 'react-youtube'

class YoutubePlayer extends Component {
  player = null

  shouldComponentUpdate(nextProps) {
    // we propagate width & height changes ourselves using setSize
    return nextProps.debate !== this.props.debate
      || nextProps.onReady !== this.props.onReady
  }

  handleYoutubeReady = event => {
    this.player = event.target
    this.props.onReady({
      getTime: this.getTime,
      goToTime: this.goToTime,
      setSize: this.setSize
    })
  }

  getTime = () => {
    return this.player.getCurrentTime()
  }

  goToTime = time => {
    this.player.seekTo(time, true)
  }

  setSize = (width, height) => {
    this.player.setSize(width, height)
  }

  render() {
    const { debate, height, width } = this.props

    return (
      <YouTube
        videoId={debate.player.videoId}
        opts={{
          width,
          height,
          playerVars: {
            playsinline: 1,
            rel: 0
          }
        }}
        onReady={this.handleYoutubeReady}
      />
    )
  }
}

export default YoutubePlayer
