import React from 'react'
import styled, { css } from 'styled-components'

import {
  RESULT_TRUTH,
  RESULT_UNTRUTH,
  RESULT_MISLEADING,
  RESULT_UNVERIFIABLE,
  RESULT_COLOR
} from './metadata'

const PersonResultBadge = ({ debate, speaker }) =>
  <div>
    <PictureWrapper>
      <img src={speaker.imageSrc} alt={speaker.name} />
    </PictureWrapper>
    <DetailWrapper>
      <GuestName>{speaker.name}</GuestName>
      <ResultsRow debate={debate} speaker={speaker} />
    </DetailWrapper>
  </div>

const PictureWrapper = styled.div`
  float: left;
  width: 66px;
  height: 66px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #DDDDDD;

  > img {
    width: 100%;
  }
`

const DetailWrapper = styled.div`
  float: left;
  margin-left: 10px;
`

const GuestName = styled.h3`
  font-family: LatoLatinWeb, sans-serif;
  font-weight: bold;
  color: #3C325C;
  font-size: 21px;
  margin: 4px 0 0 0;
`

const ResultsWrapper = styled.div`
  margin: 9px 0 0 0;
`

const Result = ({ result, count }) => {
  const color = count > 0 ? RESULT_COLOR[result] : '#dddddd';

  return (
    <span>
      <ResultIcon result={result} color={color} />
      <ResultLabel color={color}>{count}</ResultLabel>
    </span>
  )
}

export const ResultIcon = styled.span`
  display: inline-block;
  vertical-align: middle;
  position: relative;
  top: -3px;
  width: 24px;
  height: 24px;
  border-radius: 1.3em;
  background-repeat: no-repeat;
  background-color: ${props => props.color};

  ${props => props.result === RESULT_TRUTH && css`
    background-image: url(/true-symbol.svg);
    background-position: 48% 55%;
    background-size: 12px 12px;
  `}

  ${props => props.result === RESULT_UNTRUTH && css`
    background-image: url(/untrue-symbol.svg);
    background-position: 50% 53%;
    background-size: 10px 10px;
  `}

  ${props => props.result === RESULT_MISLEADING && css`
    background-image: url(/misleading-symbol.svg);
    background-position: 50% 50%;
    background-size: 12px 12px;
  `}

  ${props => props.result === RESULT_UNVERIFIABLE && css`
    background-image: url(/unverifiable-symbol.svg);
    background-position: 50% 50%;
    background-size: 12px 12px;
  `}
`

const ResultLabel = styled.span`
  font-family: LatoLatinWeb, sans-serif;
  font-weight: bold;
  font-size: 18px;
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
