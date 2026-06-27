import React, { Component } from "react";

const APP_ID = "150764505690468";

// Loads the Facebook JS SDK once and resolves with the global FB object.
const loadFB = () => {
  if (window.FB) {
    return Promise.resolve(window.FB);
  }

  return new Promise((resolve) => {
    window.fbAsyncInit = () => resolve(window.FB);

    const id = "facebook-jssdk";
    if (document.getElementById(id)) {
      return;
    }

    const fjs = document.getElementsByTagName("script")[0];
    const js = document.createElement("script");
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3";
    js.onload = () => resolve(window.FB);
    fjs.parentNode.insertBefore(js, fjs);
  });
};

// Vendored replacement for the abandoned `react-facebook-player` package
// (incompatible with React 19). It renders the Facebook embedded video player
// and exposes the same imperative API the rest of the app relies on.
class FacebookPlayer extends Component {
  player = null;
  container = null;

  componentDidMount() {
    loadFB().then((FB) => {
      if (FB) {
        this.createPlayer(FB);
      }
    });
  }

  createPlayer = (FB) => {
    const { debate, width } = this.props;
    const videoId = debate.player.videoId;

    this.container.innerHTML = "";

    const playerDiv = document.createElement("div");
    playerDiv.classList.add("fb-video");
    playerDiv.setAttribute(
      "data-href",
      `https://www.facebook.com/facebook/videos/${videoId}`
    );
    playerDiv.setAttribute("data-allowfullscreen", "false");
    playerDiv.setAttribute("data-autoplay", "false");
    playerDiv.setAttribute("data-width", width);
    playerDiv.setAttribute("data-show-text", "false");
    playerDiv.setAttribute("data-show-captions", "false");

    this.container.appendChild(playerDiv);

    FB.init({ appId: APP_ID, xfbml: true, version: "v2.5" });

    FB.Event.subscribe("xfbml.ready", (msg) => {
      if (msg.type === "video") {
        this.handleReady(msg.instance);
      }
    });
  };

  handleReady = (player) => {
    this.player = player;

    if (this.player.isMuted()) {
      this.player.unmute();
    }

    this.props.onReady({
      getTime: this.getTime,
      goToTime: this.goToTime,
      setSize: this.setSize,
    });
  };

  getTime = () => {
    return this.player.getCurrentPosition();
  };

  goToTime = (time) => {
    this.player.seek(time);
    this.player.play();
  };

  setSize = (width, height) => {
    // intentionally nothing
  };

  render() {
    return <span ref={(container) => (this.container = container)} />;
  }
}

export default FacebookPlayer;
