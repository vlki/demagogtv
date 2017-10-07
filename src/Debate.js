import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import YouTube from 'react-youtube'
import ReactTooltip from 'react-tooltip'
import styled, { css } from 'styled-components'

import { DEBATES_BY_PATH } from './data'
import {
  RESULT_MISLEADING,
  RESULT_UNVERIFIABLE,
  RESULT_COLOR,
  RESULT_ICON,
  RESULT_LABEL
} from './metadata'
import { formatTime, parseTime, convertNewlinesToBr } from './utils'

const CHECK_PLAYER_TIME_INTERVAL_MS = 100

class Debate extends Component {
  checkInterval = null
  player = null
  statementContainers = {}
  state = {
    shownExplanations: [],
    highlightStatement: null
  }

  componentDidMount() {
    this.checkInterval = setInterval(this.checkPlayerTime, CHECK_PLAYER_TIME_INTERVAL_MS)
  }

  componentWillUnmount() {
    clearInterval(this.checkInterval)
    this.checkInterval = null
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
  }

  handlePlayerReady = event => {
    this.player = event.target
  }

  checkPlayerTime = () => {
    if (this.player !== null) {
      this.setState({ time: this.player.getCurrentTime() })
    }
  }

  playerGoToCheck = check => {
    if (this.player !== null) {
      this.player.seekTo(parseTime(check.highlightStart), true)
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

  render() {
    const { match } = this.props
    const { shownExplanations, highlightStatement } = this.state

    const debate = DEBATES_BY_PATH[match.path]

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
            <div className="col-xs-8">
              <VideoAndLabelsContainer>
                <YouTube
                  videoId={debate.videoId}
                  opts={{
                    width: 750,
                    height: 457,
                    playerVars: {
                      rel: 0
                    }
                  }}
                  onReady={this.handlePlayerReady}
                />
              </VideoAndLabelsContainer>
            </div>
            <div className="col-xs-4">
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
                      <p><em>„{check.statement}“</em></p>
                      <StatementResultExpanderWrapper>
                        <StatementResultBadge result={check.result} />
                        {shownExplanations.indexOf(index) === -1
                          ? (
                            <StatementExpanderButton className="btn btn-link" onClick={() => this.toggleExplanation(index)}>
                              {(check.result === RESULT_MISLEADING || check.result === RESULT_UNVERIFIABLE)
                                ? 'zobr. odůvodnění'
                                : 'zobrazit odůvodnění'}
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

const VideoAndLabelsContainer = styled.div`
  position: fixed;
`

const StatementsContainer = styled.div`
  padding-bottom: 500px;
`

const StatementContainer = styled.div`
  display: flex;
  padding: 13px 15px 18px 0;
  margin-bottom: 15px;

  ${props => props.showingExplanation && css`
    background-color: #F5F5F5;
  `}

  ${props => props.higlighted && css`
    background-color: #FDEAE6;
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
  color: #EC4F2F;
  text-decoration: none;

  &:hover, &:focus, &:active {
    text-decoration: none;
  }
`

const StatementTimeline = styled.div`
  position: absolute;
  top: 30px;
  bottom: -40px;
  left: 50%;
  margin-left: -1px;
  border-left: 2px solid #E6E6E6;
`

const StatementContent = styled.div`
  flex: 1;
`

const StatementResultBadge = ({ result }) =>
  <StatementResultBadgeWrapper color={RESULT_COLOR[result]}>
    <StatementResultBadgeIcon className={`glyphicon glyphicon-${RESULT_ICON[result]}`} />
    {' '}
    {RESULT_LABEL[result]}
  </StatementResultBadgeWrapper>

const StatementResultBadgeWrapper = styled.span`
  display: inline-block;
  background-color: ${props => props.color};
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  padding: 5px 10px 7px 10px;
`

const StatementResultBadgeIcon = styled.span`
  font-size: 20px;
  line-height: 17px;
  top: 4px;
`

const StatementResultExpanderWrapper = styled.div`
  margin-top: 15px;
`

const StatementExpanderButton = styled.button`
  padding: 5px;
  vertical-align: top;
  font-size: 16px;
  color: #EC4F2F;
  text-decoration: none;
  margin-left: 7px;
  margin-right: -10px;

  &:focus {
    text-decoration: none;
    outline: 0;
    color: #EC4F2F;
  }

  &:hover, &:active {
    text-decoration: none;
    outline: 0;
  }
`

const StatementExplanation = styled.p`
  margin: 15px 0 0 0;
  font-size: 14px !important;

  & p {
    font-size: 14px !important;
    margin: 15px 0;
  }
`

export default Debate
