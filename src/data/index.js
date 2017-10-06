import pirati from './pirati'
import svobodni from './svobodni'

export const DEBATES_LIST = [
  pirati,
  svobodni
]

export const DEBATES_BY_PATH = DEBATES_LIST.reduce(
  (carry, debate) => Object.assign(carry, {
    [debate.path]: debate
  }),
  {}
)
