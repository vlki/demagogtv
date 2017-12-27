import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'

import { ResultsRow } from './PersonResultBadge'
import {
  DEBATES_LIST_ROZHLAS,
  DEBATE_ZEMAN,
  DEBATE_ZEMAN_VANOCE,
  DEBATES_LIST_SEZNAM_DUELS
} from './data'

class Home extends Component {
  render() {

    return (
      <Container className="container-fluid">
        <Helmet>
          <title>DemagogTV</title>
          <meta property="og:image" content="https://demagogtv.cz/demagogtv.png" />
          <meta property="og:image:alt" content="DemagogTV" />
        </Helmet>

        <div className="row">
          <div className="col-xs-12 col-sm-10">
            <MainTitle>DemagogTV</MainTitle>

            <MainSummary>
              Sledujte rozhovor a&nbsp;zároveň, zda politik říká pravdu či ne.
              Propojili jsme videozáznamy debat s&nbsp;výroky tak, že v&nbsp;čase vyřčení
              naskočí hodnocení od <a href="http://demagog.cz/">Demagog.cz</a>.
            </MainSummary>

            <MainSummary>
              Přejděte na libovolnou debatu z&nbsp;níže uvedených a&nbsp;zhlédněte výsledek v&nbsp;praxi!
            </MainSummary>
          </div>
        </div>

        {/* <div className="row">
          <div className="col-xs-12 col-sm-10">
            <SectionTitle>Duely prezidentských kandidátů v Seznam Zprávy</SectionTitle>

            <SectionDate>
              Listopad 2017 – leden 2018
            </SectionDate>

            <SectionSummary>
              Debaty dvojic prezidentských kandidátů v Seznam Zprávy.
            </SectionSummary>
          </div>
        </div>

        <div className="row">
          {DEBATES_LIST_SEZNAM_DUELS.map(debate =>
            <div key={debate.path} className="col-xs-12 col-sm-6 col-md-4">
              <DebateContainer>
                <Link to={debate.path}>
                  <DebateImgWrapper>
                    <DebateImg src={debate.listing.imageSrc} alt={debate.listing.title} />
                  </DebateImgWrapper>
                  <DebateTitle>{debate.listing.title}</DebateTitle>
                  <ResultsRow debate={debate} speaker={debate.speakers[0]} showImage />
                  <ResultsRow debate={debate} speaker={debate.speakers[1]} showImage />
                </Link>
              </DebateContainer>
            </div>
          )}
        </div> */}

        <div className="row">
          <div className="col-xs-12 col-sm-10">
            <SectionTitle>Vánoční poselství prezidenta republiky</SectionTitle>

            <SectionDate>
              Prosinec 2017
            </SectionDate>

            <SectionSummary>
              Stejně jako v dalších letech přednesl prezident Miloš Zeman své vánoční poselství. Letos bilancoval, jak si z jeho pohledu vedla Česká republika. Vyzdvihl např. bezpečnost a ekonomický stav země, popsal ovšem i ze svého pohledu některé neduhy, které nás trápí.
            </SectionSummary>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-4">
            <DebateContainer>
              <Link to={DEBATE_ZEMAN_VANOCE.path}>
                <DebateImgWrapper>
                  <DebateImg src={DEBATE_ZEMAN_VANOCE.listing.imageSrc} alt={DEBATE_ZEMAN_VANOCE.listing.title} />
                </DebateImgWrapper>
                <DebateTitle>{DEBATE_ZEMAN_VANOCE.listing.title}</DebateTitle>
                <ResultsRow debate={DEBATE_ZEMAN_VANOCE} speaker={DEBATE_ZEMAN_VANOCE.speakers[0]} />
              </Link>
            </DebateContainer>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 col-sm-10">
            <SectionTitle>Prezidentův projev na konferenci hnutí SPD</SectionTitle>

            <SectionDate>
              Prosinec 2017
            </SectionDate>

            <SectionSummary>
              Prezident Miloš Zeman během probíhající předvolební kampaně navštívil celostátní konferenci hnutí SPD Tomia Okamury.
            </SectionSummary>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-4">
            <DebateContainer>
              <Link to={DEBATE_ZEMAN.path}>
                <DebateImgWrapper>
                  <DebateImg src={DEBATE_ZEMAN.listing.imageSrc} alt={DEBATE_ZEMAN.listing.title} />
                </DebateImgWrapper>
                <DebateTitle>{DEBATE_ZEMAN.listing.title}</DebateTitle>
                <ResultsRow debate={DEBATE_ZEMAN} speaker={DEBATE_ZEMAN.speakers[0]} />
              </Link>
            </DebateContainer>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 col-sm-10">
            <SectionTitle>Rozhovory s lídry v ČRo</SectionTitle>

            <SectionDate>
              Září – říjen 2017
            </SectionDate>

            <SectionSummary>
              Debaty ze série
              {' '}<a href="https://www.irozhlas.cz/zpravy-tag/rozhovor-s-lidrem">Rozhovor s&nbsp;lídrem Českého rozhlasu</a>,
              řazené dle volebního potenciálu
              {' '}<a href="http://www.ceskatelevize.cz/ct24/2268226-volebni-potencial-ano-klesl-na-325-procenta-pirati-a-spd-posilili">z&nbsp;průzkumu 9.&nbsp;října&nbsp;2017</a>
              {' '}agentur Median a&nbsp;Kantar TNS pro Českou televizi.
            </SectionSummary>
          </div>
        </div>

        <div className="row">
          {DEBATES_LIST_ROZHLAS.map(debate =>
            <div key={debate.path} className="col-xs-12 col-sm-6 col-md-4">
              <DebateContainer>
                <Link to={debate.path}>
                  <DebateImgWrapper>
                    <DebateImg src={debate.listing.imageSrc} alt={debate.listing.title} />
                  </DebateImgWrapper>
                  <DebateTitle>{debate.listing.title}</DebateTitle>
                  <ResultsRow debate={debate} speaker={debate.speakers[0]} />
                </Link>
              </DebateContainer>
            </div>
          )}
        </div>

        <FooterText>
          Projekt DemagogTV vytvořili v&nbsp;říjnu 2017
          {' '}<a href="http://demagog.cz">Demagog.cz</a>
          {' '}a
          {' '}<a href="http://vlki.cz">Jan Vlček</a>.
          {' '}Kód je <a href="https://github.com/vlki/demagogtv">opensource</a>.
        </FooterText>
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
  margin: 0 0 25px 0;
`

const MainSummary = styled.p`
  margin-top: 15px;
`

const SectionTitle = styled.h2`
  font-family: 'Oswald', sans-serif;
  font-weight: bold;
  font-size: 37px;
  margin: 60px 0 0 0;
`

const SectionDate = styled.p`
  margin-top: 15px;
  margin-bottom: 0;
  color: #888888 !important;
`

const SectionSummary = styled.p`
  margin-top: 5px;
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
