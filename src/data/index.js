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
import rozhlasDrahos from './rozhlas-drahos'
import rozhlasFischer from './rozhlas-fischer'
import rozhlasHannig from './rozhlas-hannig'
import rozhlasHilser from './rozhlas-hilser'
import rozhlasHoracek from './rozhlas-horacek'
import rozhlasHynek from './rozhlas-hynek'
import rozhlasKulhanek from './rozhlas-kulhanek'
import rozhlasTopolanek from './rozhlas-topolanek'
import stropnicky from './stropnicky'
import zaoralek from './zaoralek'
import zeman from './zeman'
import zemanSoukup from './rozhovor-milose-zemana-v-tv-barrandov'
import zemanVanoce from './zeman-vanoce'

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

  // rozhlas prez
  rozhlasDrahos,
  rozhlasFischer,
  rozhlasHannig,
  rozhlasHilser,
  rozhlasHoracek,
  rozhlasHynek,
  rozhlasKulhanek,
  rozhlasTopolanek,

  // duels
  duelHynekHannig,

  // other
  zeman,
  zemanSoukup,
  zemanVanoce
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

export const DEBATES_LIST_ROZHLAS_PREZ = [
  rozhlasHannig,
  rozhlasFischer,
  rozhlasHynek,
  rozhlasHilser,
  rozhlasKulhanek,
  rozhlasDrahos,
  rozhlasTopolanek,
  rozhlasHoracek
]

export const DEBATE_ZEMAN = zeman

export const DEBATE_ZEMAN_VANOCE = zemanVanoce

export const DEBATE_ZEMAN_SOUKUP = zemanSoukup

export const DEBATES_LIST_SEZNAM_DUELS = [
  duelHynekHannig
]

export const DEBATES_BY_PATH = DEBATES_LIST.reduce(
  (carry, debate) => Object.assign(carry, {
    [debate.path]: debate
  }),
  {}
)
