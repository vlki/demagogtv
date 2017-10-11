import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import DocumentTitle from 'react-document-title'

import { ResultsRow } from './PersonResultBadge'
import { DEBATES_LIST } from './data'

class Home extends Component {
  render() {
    return (
      <DocumentTitle title="DemagogTV">
        <Container className="container-fluid">
          <div className="row">
            <div className="col-xs-12 col-sm-10">
              <MainTitle>DemagogTV</MainTitle>

              <MainSummary>
                Sledujete rozhovor a zároveň vidíte, zda je vyslovená pravda či ne.
                Propojili jsme videozáznamy debat s výroky tak, že v čase vyřčení
                naskočí hodnocení od <a href="http://demagog.cz/">Demagog.cz</a>.
              </MainSummary>

              <MainSummary>
                Přejděte na libovolnou debatu z níže uvedených a zhlédněte výsledek v praxi!
              </MainSummary>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12 col-sm-10">
              <SectionTitle>Rozhovory s lídry v ČRo</SectionTitle>

              <SectionSummary>
                Debaty ze série
                {' '}<a href="https://www.irozhlas.cz/zpravy-tag/rozhovor-s-lidrem">Rozhovor s lídrem Českého rozhlasu</a>,
                řazené dle volebního potenciálu
                {' '}<a href="http://www.ceskatelevize.cz/ct24/2268226-volebni-potencial-ano-klesl-na-325-procenta-pirati-a-spd-posilili">z&nbsp;průzkumu 9. října 2017</a>
                {' '}agentur Median a Kantar TNS pro Českou televizi.
              </SectionSummary>
            </div>
          </div>

          <div className="row">
            {DEBATES_LIST.map(debate =>
              <div key={debate.path} className="col-xs-12 col-sm-6 col-md-4">
                <DebateContainer>
                  <Link to={debate.path}>
                    <DebateImgWrapper>
                      <DebateImg src={debate.debateImageSrc} alt={debate.title} />
                    </DebateImgWrapper>
                    <DebateTitle>{debate.guestName}, {debate.partyName}</DebateTitle>
                    <ResultsRow debate={debate} />
                  </Link>
                </DebateContainer>
              </div>
            )}
          </div>

          <FooterText>
            Projekt DemagogTV vytvořili v říjnu 2017
            {' '}<a href="http://demagog.cz">Demagog.cz</a>
            {' '}a
            {' '}<a href="http://vlki.cz">Jan Vlček</a>.
            {/* Kód je dostupný na GitHubu. */}
          </FooterText>
        </Container>
      </DocumentTitle>
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
  margin: 0 0 25px 0;
`

const MainSummary = styled.p`
  margin-top: 15px;
`

const SectionTitle = styled.h2`
  font-family: 'Oswald', sans-serif;
  font-weight: bold;
  font-size: 37px;
  margin: 40px 0 0 0;
`

const SectionSummary = styled.p`
  margin-top: 15px;
`

const DebateContainer = styled.div`
  margin-top: 30px;
  margin-bottom: 15px;
`

const DebateImgWrapper = styled.div`
  height: 170px;
  overflow: hidden;
`

const DebateImg = styled.img`
  width: 100%;
`

const DebateTitle = styled.h3`
  font-family: 'Oswald', sans-serif;
  font-weight: bold;
  color: #585859;
  font-size: 23px;
  margin: 10px 0 0 0;
`

const FooterText = styled.p`
  font-size: 16px !important;
  margin-top: 50px;
  margin-bottom: 100px;
`

export default Home
