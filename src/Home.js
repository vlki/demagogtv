import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import PersonResultBadge from './PersonResultBadge'
import { DEBATES_LIST } from './data'

class Home extends Component {
  render() {
    return (
      <Container className="container-fluid">
        <div className="row">
          <div className="col-xs-4">
            <MainTitle>Demagog TV</MainTitle>
          </div>
          <div className="col-xs-8">
            <MainSummary>
              Shlédněte politické debaty propojené s ověřenými výroky z projektu
              {' '}<a href="http://demagog.cz/">Demagog.cz</a>. Aktuálně tu
              {' '}najdete debaty ze série
              {' '}<a href="https://www.irozhlas.cz/zpravy-tag/rozhovor-s-lidrem">Rozhovor s lídrem Českého rozhlasu</a>.
            </MainSummary>
          </div>
        </div>

        {DEBATES_LIST.map(debate =>
          <DebateContainer key={debate.path} className="row">
            <div className="col-xs-4">
              <Link to={debate.path}>
                <DebateImg src={debate.debateImageSrc} alt="" />
              </Link>
            </div>
            <div className="col-xs-8">
              <Link to={debate.path}>
                <DebateTitle>{debate.title}</DebateTitle>
              </Link>

              <DebateSubtitle>{debate.subtitle}</DebateSubtitle>

              <DebatePersonResultBadge>
                <PersonResultBadge debate={debate} />
              </DebatePersonResultBadge>

              <DebateSummary>{debate.summary}</DebateSummary>

              <DebateOpenLink>
                <Link to={debate.path}>Shlédnout debatu</Link>
              </DebateOpenLink>
            </div>
          </DebateContainer>
        )}

        <FooterContainer className="row">
          <div className="col-xs-8 col-xs-offset-4">
            <FooterText>
              ⓒ 2017 Jan Vlček, data dodal <FooterLink href="http://demagog.cz">Demagog.cz</FooterLink>
            </FooterText>
          </div>
        </FooterContainer>
      </Container>
    )
  }
}

const Container = styled.div`
  max-width: 1000px;
  padding-top: 35px;
`

const MainTitle = styled.h1`
  font-family: 'Oswald', sans-serif;
  font-weight: bold;
  font-size: 55px;
  margin: 0;
`

const MainSummary = styled.p`
  margin-top: 8px;
`

const DebateContainer = styled.div`
  margin-top: 80px;
`

const DebateImg = styled.img`
  width: 100%;
  height: auto;
`

const DebateTitle = styled.h2`
  font-family: 'Oswald', sans-serif;
  font-weight: bold;
  font-size: 37px;
  margin: 7px 0 0 0;
`

const DebateSubtitle = styled.p`
  margin: 10px 0 0 0;
`

const DebatePersonResultBadge = styled.div`
  margin-top: 13px;
`

const DebateSummary = styled.p`
  margin-top: 12px;
`

const DebateOpenLink = styled.p`
`

const FooterContainer = styled.div`
  margin-top: 80px;
  border-top: 1px solid #E0E0E0;
  padding-top: 10px;
  margin-bottom: 80px;
`

const FooterText = styled.span`
  color: #8C8C8C;
  font-size: 16px !important;
`

const FooterLink = styled.a`
  color: #8C8C8C !important;
  text-decoration: underline !important;

  &:hover, &:focus, &:active {
    color: #EC4F2F !important;
  }
`

export default Home
