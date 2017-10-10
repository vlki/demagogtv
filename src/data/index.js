import babis from './babis'
import bartos from './bartos'
import belobradek from './belobradek'
import cech from './cech'
import farsky from './farsky'
import fiala from './fiala'
import filip from './filip'
import kalousek from './kalousek'
import mach from './mach'
import stropnicky from './stropnicky'

export const DEBATES_LIST = [
  cech, // 6. rijna
  farsky, // 5. rijna
  bartos, // 29. zari
  kalousek, // 28. zari
  mach, // 27. zari
  belobradek, // 24. zari
  stropnicky, // 20. zari
  fiala, // 12. zari
  babis, // 10. zari
  filip // 8. zari
]

export const DEBATES_BY_PATH = DEBATES_LIST.reduce(
  (carry, debate) => Object.assign(carry, {
    [debate.path]: debate
  }),
  {}
)
