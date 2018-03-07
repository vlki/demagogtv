import babis from './babis'
import bartos from './bartos'
import bartos20180307 from './bartos20180307'
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
  filip, // 8.9.
  babis, // 10.9.
  fiala, // 12.9.
  zaoralek, // 15.9.
  stropnicky, // 20.9.
  belobradek, // 24.9.
  mach, // 27.9.
  kalousek, // 28.9.
  bartos, // 29.9.
  okamura, // 1.10.
  robejsek, // 1.10.
  farsky, // 5.10.
  cech, // 6.10.
  zeman,
  zemanVanoce,
  rozhlasHoracek,
  rozhlasTopolanek,
  rozhlasDrahos,
  rozhlasKulhanek,
  rozhlasHilser,
  rozhlasHynek,
  rozhlasFischer,
  rozhlasHannig,
  zemanSoukup,
  bartos20180307
]

export const DEBATES_BY_PATH = DEBATES_LIST.reduce(
  (carry, debate) => Object.assign(carry, {
    [debate.path]: debate
  }),
  {}
)
