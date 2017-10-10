import babis from './babis'
import bartos from './bartos'
import belobradek from './belobradek'
import cech from './cech'
import farsky from './farsky'
import fiala from './fiala'
import filip from './filip'
import kalousek from './kalousek'
import mach from './mach'
import okamura from './okamura'
import robejsek from './robejsek'
import stropnicky from './stropnicky'
import zaoralek from './zaoralek'

export const DEBATES_LIST = [
  cech, // 6. rijna
  farsky, // 5. rijna
  robejsek, // 1. rijna
  okamura, // 1. rijna
  bartos, // 29. zari
  kalousek, // 28. zari
  mach, // 27. zari
  belobradek, // 24. zari
  stropnicky, // 20. zari
  zaoralek, // 15. zari
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
