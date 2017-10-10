import babis from './babis'
import bartos from './bartos'
import belobradek from './belobradek'
import cech from './cech'
import mach from './mach'

export const DEBATES_LIST = [
  cech,
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
