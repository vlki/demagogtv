import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'

import PersonResultBadge, { ResultsRow } from './PersonResultBadge'
import { DEBATES_LIST } from './data'

class Home extends Component {
  render() {
    const featuredDebate = DEBATES_LIST[DEBATES_LIST.length - 1]
    const otherDebates = DEBATES_LIST.slice(0, -1).reverse()

    return (
      <Container className="container-fluid">
        <Helmet>
          <title>DemagogTV</title>
          {/* TODO: update the image to respect new visual */}
          {/* <meta property="og:image" content="https://demagogtv.cz/demagogtv.png" /> */}
          {/* <meta property="og:image:alt" content="DemagogTV" /> */}
        </Helmet>

        <div className="row">
          <div className="col-xs-12 col-sm-9">
            <LogoTitleWrapper>
              <LogoImg src="/logo.svg" alt="Logo Demagog.cz" />
              <Title>DemagogTV</Title>
            </LogoTitleWrapper>
            <MainSummary>
              Sledujte rozhovor a&nbsp;zároveň, zda politik říká pravdu či ne.
              Propojili jsme videozáznamy debat s&nbsp;výroky tak, že v&nbsp;čase vyřčení
              naskočí hodnocení od <a href="https://demagog.cz/">Demagog.cz</a>.
            </MainSummary>
          </div>
        </div>

        <FeaturedBlock>
          <div className="row">
            <div className="col-xs-12 col-sm-4">
              <Link to={featuredDebate.path}>
                <DebateImgWrapper>
                  <img
                    src={featuredDebate.listing.imageSrc}
                    alt={featuredDebate.listing.title}
                  />
                </DebateImgWrapper>
              </Link>
            </div>
            <div className="col-xs-12 col-sm-8">
              <Link to={featuredDebate.path}>
                <FeaturedTitle>{featuredDebate.listing.title}</FeaturedTitle>
              </Link>
              <FeaturedSummary>{featuredDebate.listing.summary}</FeaturedSummary>
              {featuredDebate.speakers.map((speaker, index) =>
                <FeaturedPersonResultBadgeWrapper key={index}>
                  <PersonResultBadge debate={featuredDebate} speaker={speaker} />
                </FeaturedPersonResultBadgeWrapper>
              )}
            </div>
          </div>
        </FeaturedBlock>

        <OtherDebatesSeparator />

        {otherDebates.map(debate =>
          <DebateBlock key={debate.path}>
            <div className="row">
              <div className="col-xs-6 col-sm-3">
                <Link to={debate.path}>
                  <DebateImgWrapper>
                    <img
                      src={debate.listing.imageSrc}
                      alt={debate.listing.title}
                    />
                  </DebateImgWrapper>
                </Link>
              </div>
              <div className="col-xs-12 col-sm-9">
                <Link to={debate.path}>
                  <DebateTitle>{debate.listing.title}</DebateTitle>
                </Link>
                <DebateSummary>{debate.listing.summary}</DebateSummary>
                {debate.speakers.map((speaker, index) =>
                  <DebateResultsRowWrapper key={index}>
                    <ResultsRow debate={debate} speaker={speaker} />
                  </DebateResultsRowWrapper>
                )}
              </div>
            </div>
          </DebateBlock>
        )}

        <FooterSeparator />

        <Footer>
          © 2017—2018 Demagog.cz, z.s. & Jan Vlček. Kód je <a href="https://github.com/vlki/demagogtv">opensource</a>.
        </Footer>
      </Container>
    )
  }
}

const Container = styled.div`
  max-width: 1000px;
  padding-top: 35px;
`

const LogoTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const LogoImg = styled.img`
  height: 48px;
`

const Title = styled.h1`
  margin: 5px 0 0 12px;
  font-family: LatoLatinWebHeavy, sans-serif;
  font-size: 32px;
  color: #3C325C;
`

const MainSummary = styled.p`
  margin-top: 28px;
`

const FeaturedBlock = styled.div`
  margin-top: 45px;
`

const FeaturedTitle = styled.h2`
  margin: 3px 0 0 0;
  font-family: LatoLatinWeb, sans-serif;
  font-weight: bold;
  font-size: 24px;
  line-height: 1.25;

  @media(max-width:767px) {
    margin-top: 18px;
  }
`

const FeaturedSummary = styled.p`
  margin: 13px 0 0 0;
`

const DebateImgWrapper = styled.div`
  img {
    width: 100%;
    overflow: hidden;
  }
`

const FeaturedPersonResultBadgeWrapper = styled.div`
  margin-top: 15px;
`

const OtherDebatesSeparator = styled.hr`
  color: #D8E1E8;
  background-color: #D8E1E8;
  height: 2px;
  margin-top: 55px;
`

const DebateTitle = styled.h2`
  margin: 0;
  font-family: LatoLatinWeb, sans-serif;
  font-weight: bold;
  font-size: 24px;
  line-height: 1.25;

  @media(max-width:767px) {
    margin-top: 15px;
  }
`

const DebateSummary = styled.p`
  margin: 9px 0 0 0;
`

const DebateResultsRowWrapper = styled.div`
  margin-top: 12px;
`

const DebateBlock = styled.div`
  margin-top: 45px;
`

const FooterSeparator = styled.hr`
  color: #D8E1E8;
  background-color: #D8E1E8;
  height: 2px;
  margin-top: 45px;
`

const Footer = styled.p`
  margin-top: 20px;
  margin-bottom: 100px;
`

export default Home
