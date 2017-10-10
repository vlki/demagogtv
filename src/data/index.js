import babis from './babis'
import bartos from './bartos'
import mach from './mach'

export const DEBATES_LIST = [
  bartos,
  mach,
  babis
]

export const DEBATES_BY_PATH = DEBATES_LIST.reduce(
  (carry, debate) => Object.assign(carry, {
    [debate.path]: debate
  }),
  {}
)
