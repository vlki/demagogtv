import babis from './babis'
import bartos from './bartos'
import belobradek from './belobradek'
import cech from './cech'
import farsky from './farsky'
import filip from './filip'
import kalousek from './kalousek'
import mach from './mach'

export const DEBATES_LIST = [
  cech,
  farsky,
  bartos,
  kalousek,
  mach,
  belobradek,
  babis,
  filip
]

export const DEBATES_BY_PATH = DEBATES_LIST.reduce(
  (carry, debate) => Object.assign(carry, {
    [debate.path]: debate
  }),
  {}
)
