import React, { Component } from 'react'

const BARTOS_SRC = 'https://www.seznamzpravy.cz/iframe/player?duration=null&serviceSlug=zpravy&src=https%3A%2F%2Flive-a.sdn.szn.cz%2Fv_39%2Fvmd%2F5a9d071165375b117d38de62%3Ffl%3Dmdk%2C7d99e3a7%7C&itemType=livevod&autoPlay=false&title=V%C3%BDzva%20-%20Barto%C5%A1&series=V%C3%BDzva&serviceName=Seznam%20Zpr%C3%A1vy&poster=%2F%2Fd39-a.sdn.szn.cz%2Fd_39%2Fc_img_F_L%2F8FWRz.jpeg%3Ffl%3Dcrs%2C600%2C337%2C7%7Cjpg%2C80%2C%2C1&width=16&height=9&cutFrom=0&cutTo=0&splVersion=VOD&contentId=341619&contextId=43357&showAdvert=true&collocation=nejctenejsiclanky3b&hideFullScreen=false&hideSubtitles=false&embed=&isVideoTooShortForPreroll=false&isVideoTooShortForPreroll2=false&isVideoTooLongForPostroll=false&fakePostrollZoneID=seznam.clanky.zpravy.preroll&fakePrerollZoneID=seznam.clanky.zpravy.preroll&videoCommentId=&trim=default_16x9&noPrerollVideoLength=30&noPreroll2VideoLength=60&noMidrollVideoLength=360&noPostrollVideoLength=999999&version=5.0.49&dotService=zpravy&gemiusPrismIdentifier=zD3g7byfW5ekpXmxTVLaq5Srjw5i4hsYo0HY1aBwIe..27&abTest=nejctenejsiclanky3%2Fb&zoneIdPreroll=seznam.pack.videospot&skipOffsetPreroll=5&sectionPrefixPreroll=%2Fzpravy%2Fvyzva&zoneIdPreroll2=seznam.zpravy.sponzor.poradu&skipOffsetPreroll2=5&sectionPrefixPreroll2=%2Fzpravy%2Fvyzva&zoneIdPostroll=seznam.pack.videospot&skipOffsetPostroll=5&sectionPrefixPostroll=%2Fzpravy%2Fvyzva&regression=false'

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
        src={BARTOS_SRC}
        width={width}
        height={height}
        style={{ margin: 0, padding: 0, border: 'none' }}
        ref={iframeEl => this.iframeEl = iframeEl}
      />
    )
  }
}

export default SeznamPlayer
