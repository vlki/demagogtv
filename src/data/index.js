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
import zeman from './zeman'

import duelHynekHannig from './duel-hynek-hannig'

export const DEBATES_LIST = [
  // rozhlas
  babis,
  zaoralek,
  fiala,
  okamura,
  bartos,
  filip,
  kalousek,
  farsky,
  belobradek,
  stropnicky,
  mach,
  robejsek,
  cech,

  // plus experiments
  duelHynekHannig,
  zeman
]

// sorted by survey at
// http://www.ceskatelevize.cz/ct24/2268226-volebni-potencial-ano-klesl-na-325-procenta-pirati-a-spd-posilili
export const DEBATES_LIST_ROZHLAS = [
  babis,
  zaoralek,
  fiala,
  okamura,
  bartos,
  filip,
  kalousek,
  farsky,
  belobradek,
  stropnicky,

  // these are not in the survey, so just sorted randomly
  mach,
  robejsek,
  cech
]

export const DEBATE_ZEMAN = zeman

export const DEBATES_BY_PATH = DEBATES_LIST.reduce(
  (carry, debate) => Object.assign(carry, {
    [debate.path]: debate
  }),
  {}
)
