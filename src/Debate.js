import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ReactTooltip from 'react-tooltip'
import styled, { css } from 'styled-components'
import debounce from 'lodash/debounce'
import { Helmet } from 'react-helmet'

import { DEBATES_BY_PATH } from './data'
import {
  RESULT_COLOR,
  RESULT_ICON,
  RESULT_LABEL
} from './metadata'
import { formatTime, parseTime, convertNewlinesToBr } from './utils'
import PersonResultBadge, { ResultIcon } from './PersonResultBadge'
import FacebookPlayer from './players/FacebookPlayer'
import Html5Player from './players/Html5Player'
import YoutubePlayer from './players/YoutubePlayer'

const CHECK_PLAYER_TIME_INTERVAL_MS = 100
const VIDEO_ASPECT_RATIO = 9/16

class Debate extends Component {
  checkInterval = null
  player = null
  statementContainers = {}
  videoContainer = null
  state = {
    shownExplanations: [],
    highlightStatement: null,
    videoWidth: 657
  }

  componentDidMount() {
    this.checkInterval = setInterval(this.checkPlayerTime, CHECK_PLAYER_TIME_INTERVAL_MS)

    if (window) {
      window.addEventListener('resize', this.updateVideoSizeDebounced)
    }
  }

  componentWillUnmount() {
    clearInterval(this.checkInterval)
    this.checkInterval = null

    if (window) {
      window.removeEventListener('resize', this.updateVideoSizeDebounced)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { match } = this.props
    const debate = DEBATES_BY_PATH[match.path]

    if (prevState.time !== this.state.time && this.state.time !== null) {
      const checkIndex = debate.checks.findIndex(check =>
        this.state.time >= parseTime(check.highlightStart) &&
        this.state.time <= parseTime(check.highlightEnd)
      )

      this.setState({
        highlightStatement: checkIndex !== -1 ? checkIndex : null
      })
    }

    if (
      prevState.highlightStatement !== this.state.highlightStatement &&
      this.state.highlightStatement !== null
    ) {
      window.scroll({
        top: this.statementContainers[this.state.highlightStatement].offsetTop,
        left: 0,
        behavior: 'smooth'
      })
    }

    if (prevState.videoWidth !== this.state.videoWidth && this.player !== null) {
      this.player.setSize(this.state.videoWidth, this.state.videoWidth * VIDEO_ASPECT_RATIO)
    }
  }

  handlePlayerReady = player => {
    this.player = player
    this.updateVideoSizeDebounced()
  }

  checkPlayerTime = () => {
    if (this.player !== null) {
      this.setState({ time: this.player.getTime() })
    }
  }

  playerGoToCheck = check => {
    if (this.player !== null) {
      this.player.goToTime(parseTime(check.highlightStart))
    }
  }

  toggleExplanation = index => {
    const { shownExplanations } = this.state

    if (shownExplanations.indexOf(index) === -1) {
      // hidden, show
      this.setState({
        shownExplanations: [...shownExplanations, index]
      })
    } else {
      // shown, hide
      this.setState({
        shownExplanations: shownExplanations.filter(i => i !== index)
      })
    }
  }

  updateVideoSize = () => {
    if (this.videoContainer) {
      this.setState({
        videoWidth: this.videoContainer.offsetWidth - 30 // 30 = gutter
      })
    }
  }

  updateVideoSizeDebounced = debounce(this.updateVideoSize, 1000)

  render() {
    const { match } = this.props
    const { shownExplanations, highlightStatement, videoWidth } = this.state

    const debate = DEBATES_BY_PATH[match.path]

    let Player = null
    switch (debate.player.type) {
      case 'html5':
        Player = Html5Player
        break

      case 'facebook':
        Player = FacebookPlayer
        break

      case 'youtube':
        Player = YoutubePlayer
        break
    }

    let ogImage = debate.listing.imageSrc
    if (!ogImage.startsWith('http')) {
      ogImage = `https://demagogtv.cz${ogImage}`
    }

    return (
      <div>
        <Helmet>
          <title>{debate.title} – DemagogTV</title>
          <meta property="og:image" content={ogImage} />
          <meta property="og:image:alt" content={debate.title} />
        </Helmet>

        <TopBar>
          <TopBarContainer className="container-fluid">
            <Link to="/">
              <TopBarTitle>
                <TopBarLogoImg src="/logo.svg" alt="Logo Demagog.cz" /> DemagogTV
              </TopBarTitle>
            </Link>
            <TopBarLink to="/">Přehled všech debat</TopBarLink>
            <TopBarOuterLink href="http://demagog.cz/jak-hodnotime-metodika">Jak hodnotíme?</TopBarOuterLink>

            <SupportLinkWrapper>
              Líbí se vám co děláme?
              <SupportLink href="https://www.darujme.cz/projekt/1200037">Podpořte Demagog.cz</SupportLink>
            </SupportLinkWrapper>
          </TopBarContainer>
        </TopBar>

        <Container className="container-fluid">
          <div className="row">
            <div className="col-xs-6 col-lg-7" ref={container => this.videoContainer = container}>
              <VideoAndLabelsContainer videoWidth={videoWidth} >
                {Player !== null &&
                  <Player
                    debate={debate}
                    height={videoWidth * VIDEO_ASPECT_RATIO}
                    onReady={this.handlePlayerReady}
                    width={videoWidth}
                  />
                }

                <LabelsContainer videoHeight={videoWidth * VIDEO_ASPECT_RATIO}>
                  <DebateTitle>{debate.title}</DebateTitle>

                  <DebateSubtitle>{debate.subtitle}</DebateSubtitle>

                  <DebatePersonResultBadge>
                    <div className="clearfix">
                      {debate.speakers.map((speaker, index) =>
                        <PersonResultBadge key={index} debate={debate} speaker={speaker} />
                      )}
                    </div>
                  </DebatePersonResultBadge>

                  <DebateSummary>{debate.summary}</DebateSummary>

                  <DebateLinks>
                    {debate.links.map((link, index) =>
                      <DebateLink key={index} href={link.href}>{link.label}</DebateLink>
                    )}
                  </DebateLinks>

                  <FooterText>
                    © 2017—2018 Demagog.cz, z.s. & Jan Vlček. Kód je <a href="https://github.com/vlki/demagogtv">opensource</a>.
                  </FooterText>
                </LabelsContainer>
              </VideoAndLabelsContainer>
            </div>
            <div className="col-xs-6 col-lg-5">
              <StatementsContainer>
                {debate.checks.map((check, index) =>
                  <StatementContainer
                    key={index}
                    innerRef={container => this.statementContainers[index] = container}
                    showingExplanation={shownExplanations.indexOf(index) !== -1}
                    higlighted={highlightStatement === index}
                    className="clearfix"
                  >
                    <StatementTime>
                      <StatementTimeButton
                        className="btn btn-link"
                        onClick={() => this.playerGoToCheck(check)}
                        data-tip={`Kliknutím skočte na čas ${formatTime(parseTime(check.highlightStart))}`}
                        data-for={`statement-${index}`}
                      >{formatTime(parseTime(check.highlightStart))}</StatementTimeButton>

                      <ReactTooltip place="top" id={`statement-${index}`} effect="solid" />

                      {index < (debate.checks.length - 1) && <StatementTimeline />}
                    </StatementTime>
                    <StatementContent>
                      <StatementText>
                        {debate.speakers.length > 1 && <span>{check.speaker}: </span>}
                        „{check.statement}“
                      </StatementText>
                      <StatementResultExpanderWrapper>
                        <StatementResultBadge result={check.result} />
                        {shownExplanations.indexOf(index) === -1
                          ? (
                            <StatementExpanderButton className="btn btn-link" onClick={() => this.toggleExplanation(index)}>
                              zobrazit odůvodnění
                            </StatementExpanderButton>
                          ) : (
                            <StatementExpanderButton className="btn btn-link" onClick={() => this.toggleExplanation(index)}>
                              skrýt odůvodnění
                            </StatementExpanderButton>
                          )
                        }
                      </StatementResultExpanderWrapper>
                      {shownExplanations.indexOf(index) !== -1 &&
                        <StatementExplanation
                          dangerouslySetInnerHTML={{ __html: convertNewlinesToBr(check.explanation) }}
                        />
                      }
                    </StatementContent>
                  </StatementContainer>
                )}
              </StatementsContainer>
            </div>
          </div>
        </Container>
      </div>
    )
  }
}

const TopBar = styled.div`
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 52px;
  border-bottom: 2px solid #D8E1E8;
  background-color: #F4F9FD;
`

const TopBarContainer = styled.div`
  min-width: 900px;
  max-width: 1170px;
`

const TopBarTitle = styled.h1`
  float: left;
  font-family: LatoLatinWebHeavy, sans-serif;
  font-size: 24px;
  color: #3C325C;
  margin: 11px 15px 0 0;
`

const TopBarLogoImg = styled.img`
  height: 32px;
  top: -3px;
  position: relative;
  padding-right: 2px;
`

const TopBarLink = styled(Link)`
  float: left;
  font-size: 16px !important;
  line-height: 22px !important;
  padding: 13px 15px 15px;
`

const TopBarOuterLink = styled.a`
  float: left;
  font-size: 16px !important;
  line-height: 22px !important;
  padding: 13px 15px 15px;
`

const SupportLinkWrapper = styled.span`
  float: right;
  font-size: 16px !important;
`

const SupportLink = styled.a`
  display: inline-block;
  font-weight: bold;
  padding: 13px 10px 15px;
`

const Container = styled.div`
  min-width: 900px;
  max-width: 1170px;
  margin-top: 72px;
`

const VideoAndLabelsContainer = styled.div`
  position: fixed;
  top: 72px;
  bottom: 0;
  width: ${props => `${props.videoWidth}px`};
`

const LabelsContainer = styled.div`
  position: absolute;
  top: ${props => `${props.videoHeight}px`};
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
`

const StatementsContainer = styled.div`
  padding-bottom: 500px;
`

const StatementContainer = styled.div`
  display: flex;
  padding: 13px 15px 18px 0;
  margin-bottom: 15px;

  ${props => props.showingExplanation && css`
    background-color: #E1EBF3;
  `}

  ${props => props.higlighted && css`
    background-color: #FAE4DD;
  `}
`

const StatementTime = styled.div`
  position: relative;
  flex: 0 0 65px;
  padding: 0 5px;
`

const StatementTimeButton = styled.button`
  width: 100%;
  padding: 0;
  font-size: 16px;
  color: #F26538;
  text-decoration: none;

  &:hover, &:focus, &:active {
    text-decoration: none;
  }

  &:focus {
    color: #0078a0;
  }

  &:hover {
    color: #0060ff;
  }
`

const StatementTimeline = styled.div`
  position: absolute;
  top: 30px;
  bottom: -40px;
  left: 50%;
  margin-left: -1px;
  border-left: 2px solid #D8E1E8;
`

const StatementContent = styled.div`
  flex: 1;
`

const StatementText = styled.p`
  margin: 0;
`

const StatementResultBadge = ({ result }) =>
  <StatementResultBadgeWrapper>
    <ResultIcon result={result} color={RESULT_COLOR[result]} />
    <StatementResultBadgeLabel color={RESULT_COLOR[result]}>
      {RESULT_LABEL[result]}
    </StatementResultBadgeLabel>
  </StatementResultBadgeWrapper>

const StatementResultBadgeWrapper = styled.span`
  display: inline-block;
  padding-top: 7px;
`

const StatementResultBadgeLabel = styled.span`
  text-transform: uppercase;
  font-size: 16px;
  font-weight: bold;
  color: ${props => props.color};
  margin-left: 8px;
`

const StatementResultExpanderWrapper = styled.div`
  margin-top: 7px;
`

const StatementExpanderButton = styled.button`
  padding: 5px;
  vertical-align: top;
  font-size: 16px;
  color: #F26538;
  text-decoration: none;
  margin-left: 15px;

  &:focus {
    text-decoration: none;
    color: #0078a0;
  }

  &:hover, &:active {
    text-decoration: none;
    color: #0060ff;
  }
`

const StatementExplanation = styled.p`
  margin: 15px 0 0 0;
  font-size: 14px !important;

  & p {
    font-size: 14px !important;
    margin: 15px 0;
  }

  & img {
    width: 100%;
  }

  & iframe {
    width: 100%;
  }
`

const DebateTitle = styled.h2`
  font-family: LatoLatinWeb, sans-serif;
  font-weight: bold;
  font-size: 32px;
  margin: 20px 0 0 0;
`

const DebateSubtitle = styled.p`
  margin: 10px 0 0 0;
`

const DebatePersonResultBadge = styled.div`
  margin-top: 10px;
`

const DebateSummary = styled.p`
  margin-top: 20px;
`

const DebateLinks = styled.div`
  margin-top: 20px;
`

const DebateLink = styled.a`
  display: block;
  font-size: 16px;
  margin-top: 2px;
`

const FooterText = styled.p`
  margin-top: 40px;
  margin-bottom: 50px;
`

export default Debate
