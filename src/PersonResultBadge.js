import React from 'react'
import styled from 'styled-components'

import {
  RESULT_TRUTH,
  RESULT_UNTRUTH,
  RESULT_MISLEADING,
  RESULT_UNVERIFIABLE,
  RESULT_COLOR,
  RESULT_ICON
} from './metadata'

const PersonResultBadge = ({ debate, speaker }) =>
  <PersonResultBadgeContainer>
    <PictureWrapper>
      <img src={speaker.imageSrc} alt={speaker.name} />
    </PictureWrapper>
    <DetailWrapper>
      <GuestName>{speaker.name}</GuestName>
      <ResultsRow debate={debate} speaker={speaker} />
    </DetailWrapper>
  </PersonResultBadgeContainer>

const PersonResultBadgeContainer = styled.div`
  float: left;
  margin-top: 10px;
  padding-right: 20px;
`

const PictureWrapper = styled.div`
  float: left;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;

  > img {
    width: 100%;
  }
`

const DetailWrapper = styled.div`
  float: left;
  margin-left: 15px;
`

const GuestName = styled.h3`
  font-family: 'Oswald', sans-serif;
  font-weight: bold;
  color: #585859;
  font-size: 23px;
  margin: 4px 0 0 0;
`

const ResultsWrapper = styled.div`
  margin: 4px 0 0 0;
`

const Result = ({ result, count }) => {
  const color = count > 0 ? RESULT_COLOR[result] : '#dddddd';

  return (
    <span>
      <ResultIcon
        color={color}
        className={`glyphicon glyphicon-${RESULT_ICON[result]}`}
      />
      <ResultLabel color={color}>{count}</ResultLabel>
    </span>
  )
}

const ResultIcon = styled.span`
  font-size: 22px;
  color: ${props => props.color};
`

const ResultLabel = styled.span`
  font-family: 'Oswald', sans-serif;
  font-weight: normal;
  font-size: 24px;
  color: ${props => props.color};
  margin-left: 5px;
  margin-right: 10px;
`

export const ResultsRow = ({ showImage, debate, speaker }) => {
  const checks = debate.checks.filter(check => check.speaker === speaker.short)

  const truths = checks.filter(({ result }) => result === RESULT_TRUTH)
  const untruths = checks.filter(({ result }) => result === RESULT_UNTRUTH)
  const misleadings = checks.filter(({ result }) => result === RESULT_MISLEADING)
  const unverifiables = checks.filter(({ result }) => result === RESULT_UNVERIFIABLE)

  return (
    <ResultsWrapper>
      {showImage &&
        <ResultImgWrapper>
          <img src={speaker.imageSrc} alt={speaker.name} />
        </ResultImgWrapper>
      }
      <Result result="pravda" count={truths.length} />
      <Result result="nepravda" count={untruths.length} />
      <Result result="zavadejici" count={misleadings.length} />
      <Result result="neoveritelne" count={unverifiables.length} />
    </ResultsWrapper>
  )
}

const ResultImgWrapper = styled.div`
  float: left;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;

  > img {
    width: 100%;
  }
`

export default PersonResultBadge
