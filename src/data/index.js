import babis from './babis'
import bartos from './bartos'
import belobradek from './belobradek'
import mach from './mach'

export const DEBATES_LIST = [
  bartos,
  mach,
  belobradek,
  babis
]

export const DEBATES_BY_PATH = DEBATES_LIST.reduce(
  (carry, debate) => Object.assign(carry, {
    [debate.path]: debate
  }),
  {}
)
