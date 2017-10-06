import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import YouTube from 'react-youtube'
import styled from 'styled-components'

import { DEBATES_BY_PATH } from './data'

class Debate extends Component {
  player = null

  handlePlayerReady = event => {
    this.player = event.target
  }

  render() {
    const debate = DEBATES_BY_PATH[this.props.match.path]

    return (
      <div>
        <TopBar>
          <TopBarContainer className="container-fluid">
            <Link to="/">
              <TopBarTitle>Demagog TV</TopBarTitle>
            </Link>
            <TopBarLink to="/">Přehled všech debat</TopBarLink>
          </TopBarContainer>
        </TopBar>

        <Container className="container-fluid">
          <div className="row">
            <VideoSideContainer className="col-xs-8">
              <YouTube
                videoId={debate.videoId}
                opts={{
                  width: 750,
                  height: 457
                }}
                onReady={this.handlePlayerReady}
              />
            </VideoSideContainer>
            <div className="col-xs-4">

            </div>
          </div>
        </Container>
      </div>
    )
  }
}

const TopBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 52px;
  border-bottom: 1px solid #D8D8D8;
  background-color: #ffffff;
`

const TopBarContainer = styled.div`
  min-width: 900px;
  max-width: 1170px;
`

const TopBarTitle = styled.h1`
  float: left;
  font-family: 'Oswald', sans-serif;
  font-weight: bold;
  font-size: 24px;
  color: #222222;
  margin: 11px 15px 0 0;
`

const TopBarLink = styled(Link)`
  float: left;
  font-size: 16px !important;
  line-height: 22px !important;
  color: #585859 !important;
  padding: 14px 15px 15px;

  &:hover {
    background-color: #F4F4F4;
  }
`

const Container = styled.div`
  min-width: 900px;
  max-width: 1170px;
  margin-top: 72px;
`

const VideoSideContainer = styled.div`
  position: fixed;
`

export default Debate
