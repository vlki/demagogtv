export const RESULT_TRUTH = 'pravda'
export const RESULT_UNTRUTH = 'nepravda'
export const RESULT_MISLEADING = 'zavadejici'
export const RESULT_UNVERIFIABLE = 'neoveritelne'

export const RESULT_COLOR = {
  [RESULT_TRUTH]: '#22ab55',
  [RESULT_UNTRUTH]: '#ec4f2f',
  [RESULT_MISLEADING]: '#ec912f',
  [RESULT_UNVERIFIABLE]: '#227594'
}

export const RESULT_ICON = {
  [RESULT_TRUTH]: 'ok-sign',
  [RESULT_UNTRUTH]: 'remove-sign',
  [RESULT_MISLEADING]: 'exclamation-sign',
  [RESULT_UNVERIFIABLE]: 'question-sign'
}

export const RESULT_LABEL = {
  [RESULT_TRUTH]: 'Pravda',
  [RESULT_UNTRUTH]: 'Nepravda',
  [RESULT_MISLEADING]: 'Zavádějící',
  [RESULT_UNVERIFIABLE]: 'Neověřitelné'
}
