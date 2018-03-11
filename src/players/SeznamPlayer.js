import React, { Component } from 'react'

class SeznamPlayer extends Component {
  iframeEl = null

  state = {
    currentTime: null
  }

  componentDidMount() {
    this.props.onReady({
      getTime: this.getTime,
      goToTime: this.goToTime,
      setSize: () => {}
    })

    window.addEventListener('message', this.onWindowMessageEvent, false)
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.onWindowMessageEvent, false)
  }

  onWindowMessageEvent = e => {
    if (e.origin === 'https://www.seznamzpravy.cz' && e.data && e.data.sentinel === 'szn-player-up') {
      if (e.data.type === 'timeupdate') {
        this.setState({ currentTime: e.data.originalEvent.time })
      }
    }
  }

  getTime = () => {
    return this.state.currentTime
  }

  goToTime = time => {
    if (this.iframeEl !== null) {
      // TODO:
      // We want to jump to specific time in video here, is there
      // a message we can use to do it?
      //
      // Something like:
      //
      //   this.iframeEl.contentWindow.postMessage(
      //     {
      //       sentinel: 'szn-player-up'
      //       type: 'playAtTime',
      //       time: 40.5
      //     },
      //     'https://www.seznamzpravy.cz'
      //   )
    }
  }

  render() {
    const { debate, height, width } = this.props

    return (
      <iframe
        src={debate.player.src}
        width={width}
        height={height}
        style={{ margin: 0, padding: 0, border: 'none' }}
        ref={iframeEl => this.iframeEl = iframeEl}
      />
    )
  }
}

export default SeznamPlayer
