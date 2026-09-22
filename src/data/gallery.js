// Every image pulled from @fowlkesfirm on Instagram (69 posts, pulled 2026-09-22).
// Files live in /public/images/ig/<nn>-<shortcode>.jpg; `post` is the shortcode so each
// figure can link back to the original post. Kinds: cover (client release art), plaque
// (RIAA certifications), press (articles about Karl), event (stages and panels), firm (notices).
// `clients` are Instagram handles from the post tags, matched to clientCatalog in site.js.

const P = (code) => `https://www.instagram.com/p/${code}/`
const IG = '/images/ig/'

export const ig = [
  { n: '01', post: 'DWrAxPLkRBd', kind: 'firm', title: 'Public notice on impersonators', sub: 'April 2026', year: 2026 },
  { n: '02', post: 'DTGQNskEX0x', kind: 'firm', area: 'nil', title: 'NIL & College Sports Law practice launch', sub: 'January 2026', year: 2026 },
  { n: '03', post: 'DYstmWikW06', kind: 'cover', title: 'Client production', sub: 'Alex Lustig & DRTWRK · 2026', year: 2026, clients: ['alexlustig', 'drtwrk'] },
  { n: '04', post: 'DV9NVMTEW4V', kind: 'cover', title: 'Client production', sub: 'Hollywood Cole · 2026', year: 2026, clients: ['_hollywoodcole'] },
  { n: '05', post: 'DUrOnGXkgIL', kind: 'cover', title: 'Client production', sub: 'Synthetic · Hologram · 2026', year: 2026, clients: ['iamsynthetic'] },
  { n: '06', post: 'DM0LkKrM4nU', kind: 'plaque', cert: 'RIAA 3× Platinum · 3,000,000 units', title: 'Polo G ft Juice WRLD, Flex', sub: '3× Platinum · co-produced by Corbett', year: 2025, clients: ['corbettmusic'] },
  { n: '07', post: 'DLoAcrdMZrJ', kind: 'cover', title: 'Client production', sub: 'Synthetic, Cai Burns & Primo · 2025', year: 2025, clients: ['iamsynthetic', 'caiburns', 'talk2primo'] },
  { n: '08', post: 'DI1FL86xdG5', kind: 'plaque', cert: 'RIAA 4× Platinum · 4,000,000 units', title: 'Synthetic', sub: '4× Platinum plaque · 2025', year: 2025, clients: ['iamsynthetic'] },
  { n: '09', post: 'DHwRlcFRZH8', kind: 'cover', title: 'Client production', sub: 'Hollywood Cole · 2025', year: 2025, clients: ['_hollywoodcole'] },
  { n: '10', post: 'DGO44mBMOJ_', kind: 'cover', cert: 'Five tracks on a #1 album', title: 'PARTYNEXTDOOR & Drake, $ome $exy $ongs 4 U', sub: 'Five tracks produced by Kid Masterpiece · 2025', year: 2025, clients: ['kidmasterpiece', 'scandibeats', 'lm_niko'] },
  { n: '11', post: 'DF_s9kMsACC', kind: 'cover', title: 'Client production', sub: 'Synthetic, Radiate & Perdu · 2025', year: 2025, clients: ['iamsynthetic', '1radiate', 'prodperdu'] },
  { n: '12', post: 'DFltpsHR7XW', kind: 'event', area: 'nil', title: 'Fireside chat with Karl Fowlkes', sub: 'LIU Roc Nation School of Music, Sports & Entertainment · 2025', year: 2025 },
  { n: '13', post: 'DFfz1fjRoDv', kind: 'cover', title: 'Millkzy', sub: 'Artist client · 2025', year: 2025, clients: ['millkzy'] },
  { n: '14', post: 'DFYW8lGx49K', kind: 'cover', title: 'Client production', sub: 'Synthetic & Flxwrency · 2025', year: 2025, clients: ['iamsynthetic'] },
  { n: '15', post: 'DEuwpCuMfbp', kind: 'cover', title: 'Millkzy', sub: 'Artist client · 2025', year: 2025, clients: ['millkzy'] },
  { n: '16', post: 'DEA5N0rxAtr', kind: 'plaque', cert: 'RIAA Gold · 500,000 units', title: '41, Bent', sub: 'Gold · produced by Nate Rhoads · 2024', year: 2024, clients: ['naterhoads'] },
  { n: '17', post: 'CrLev0ossWK', kind: 'press', outlet: 'CNN Business', title: 'Universal Music Group calls AI music a "fraud"', sub: 'Karl quoted · April 2023', year: 2023 },
  { n: '18', post: 'CpOHPlrLVbL', kind: 'press', outlet: 'Boardroom', title: '2023 Black History Month Playmakers', sub: 'February 2023', year: 2023 },
  { n: '19', post: 'CoVqEXqL7mi', kind: 'press', outlet: 'CNN', title: 'Karl on AI and the music industry', sub: 'Live segment · February 2023', year: 2023 },
  { n: '20', post: 'Cm7ZttVJ1po', kind: 'plaque', cert: '1,000,000 units sold in the US (Chart Data)', title: 'Lil Uzi Vert, Just Wanna Rock', sub: '1M units · produced by Synthetic · 2023', year: 2023, clients: ['iamsynthetic'] },
  { n: '21', post: 'CmFLZ2pJwLd', kind: 'press', outlet: 'Billboard Pro', title: 'What happens to songwriters when AI can generate music?', sub: 'December 2022', year: 2022 },
  { n: '22', post: 'CiIo9sYLGFd', kind: 'event', title: 'CultureCon, presented by HBO Max', sub: 'Featured speaker · New York · 2022', year: 2022 },
  { n: '23', post: 'CfPG9yhLRZT', kind: 'cover', title: '3breezy', sub: 'Artist client · 2022', year: 2022, clients: ['3breezy__'] },
  { n: '24', post: 'CfPGqQrroRq', kind: 'cover', title: 'The Game × Hit-Boy, Violence', sub: 'Produced by Corbett · 2022', year: 2022, clients: ['corbettmusic'] },
  { n: '25', post: 'CfEmyUsrv7m', kind: 'cover', cert: 'Intro and "Flight\'s Booked" on a #1 album', title: 'Drake, Honestly, Nevermind', sub: 'Intro produced by Kid Masterpiece · 2022', year: 2022, clients: ['kidmasterpiece'] },
  { n: '26', post: 'CfEmeMzrk8s', kind: 'cover', title: 'DDG, Storyteller', sub: 'Produced by Corbett · 2022', year: 2022, clients: ['corbettmusic'] },
  { n: '27', post: 'CfElrdKLj52', kind: 'cover', title: 'Vory, Lost Souls', sub: 'Client productions · 2022', year: 2022, clients: ['sectionnn8', 'noahpettigrew_'] },
  { n: '28', post: 'CeEXKU5rOUW', kind: 'cover', title: 'Joony, Pretty In Black', sub: 'Artist client · 2022', year: 2022, clients: ['joonyoftv'] },
  { n: '29', post: 'CdjM3EeJVkF', kind: 'cover', title: 'Client production', sub: 'UNKWN · 2022', year: 2022, clients: ['itsunkwn'] },
  { n: '30', post: 'CdjMUsOpyGl', kind: 'cover', title: 'Drokenji', sub: 'Artist client · 2022', year: 2022, clients: ['drokenji'] },
  { n: '31', post: 'CdKD-aZsOn3', kind: 'cover', title: 'Phora, Love Hurts', sub: 'Produced by Rrarebear · 2022', year: 2022, clients: ['rrarebearbeats'] },
  { n: '32', post: 'Cc0KTdXL84_', kind: 'cover', title: 'Yiho Jean, Bluffin', sub: 'Artist client · 2022', year: 2022, clients: ['yihojean'] },
  { n: '33', post: 'CcTS3UXprfL', kind: 'cover', cert: '#1 rap album', title: '42 Dugg & Est Gee, Last Ones Left', sub: 'Produced by Section 8 · 2022', year: 2022, clients: ['sectionnn8'] },
  { n: '34', post: 'CcTSgTXJAe6', kind: 'cover', title: 'Joyner Lucas, Ye Not Crazy', sub: 'Produced by UNKWN · 2022', year: 2022, clients: ['itsunkwn'] },
  { n: '35', post: 'CcTSUwbp76w', kind: 'cover', title: 'Yeat, Geek Pack', sub: 'Client production · 2022', year: 2022, clients: ['iamsynthetic'] },
  { n: '36', post: 'CbsnvkDriTg', kind: 'cover', title: 'Lil Durk, 7220', sub: 'Produced by DMac · 2022', year: 2022, clients: ['prodbydmac'] },
  { n: '37', post: 'Ca3Qr4nsuTz', kind: 'cover', title: 'DaBaby & NBA YoungBoy, Better Than You', sub: 'Produced by DMac · 2022', year: 2022, clients: ['prodbydmac'] },
  { n: '38', post: 'Ca3OJs2Mxwz', kind: 'cover', title: 'Kodak Black, Back For Everything', sub: 'Produced by Coleman · 2022', year: 2022, clients: ['colxmxn'] },
  { n: '39', post: 'CanMQiRpoKO', kind: 'firm', area: 'business', title: 'Legal tips: think LOMO', sub: 'Length, Obligation, Money, Ownership · 2022', year: 2022 },
  { n: '40', post: 'CaILddYJce4', kind: 'cover', title: 'Ty Dolla $ign ft Wiz Khalifa, Champions', sub: 'Produced by Section 8 · 2022', year: 2022, clients: ['sectionnn8'] },
  { n: '41', post: 'CaILTVEpBLC', kind: 'cover', title: 'Client production', sub: '2022', year: 2022 },
  { n: '42', post: 'CaIK_0XpGV-', kind: 'cover', title: 'DDG ft Gunna, Elon Musk', sub: 'Produced by Corbett · 2022', year: 2022, clients: ['corbettmusic'] },
  { n: '43', post: 'CaIKtcLJHNz', kind: 'cover', cert: 'Five tracks on the album · 4× Platinum producer', title: 'Yeat, 2 Alive', sub: 'Produced by Synthetic · 2022', year: 2022, clients: ['iamsynthetic'] },
  { n: '44', post: 'CZsRNGEpvFv', kind: 'cover', title: 'Client production', sub: 'Gibbo · 2022', year: 2022, clients: ['gibbobeats'] },
  { n: '45', post: 'CZSL5QTJ5_9', kind: 'plaque', cert: 'RIAA Platinum · 1,000,000 units · certified Jan 26, 2022', title: 'Mo3 & OG Bobby Billions, Outside', sub: 'Platinum · produced by Deemarc · 2022', year: 2022, clients: ['prodbydeemarc'] },
  { n: '46', post: 'CZSLk75pTNw', kind: 'cover', title: 'Drokenji', sub: 'Internet Money / 10K Projects · 2022', year: 2022, clients: ['drokenji'] },
  { n: '47', post: 'CYo2VyGLeZX', kind: 'plaque', cert: 'RIAA Gold · 500,000 units', title: 'Blxst ft Tyga & Ty Dolla $ign, Chosen', sub: 'Certified Gold · EVGLE / Red Bull Records · 2022', year: 2022, clients: ['blxst'] },
  { n: '48', post: 'CYRhoW4L8GF', kind: 'press', outlet: 'Muse by Clio', title: 'Liner Notes: Karl Fowlkes on Wu-Tang, EYL and building the Fowlkes Firm', sub: 'January 2022', year: 2022 },
  { n: '49', post: 'CS61anLrI2r', kind: 'cover', title: 'Rod Wave, SoulFly (Deluxe)', sub: '"Escape" produced by Ebon · 2021', year: 2021, clients: ['ebononthetrack'] },
  { n: '50', post: 'CRmT79CsZaX', kind: 'cover', title: 'Est Gee, Bigger Than Life or Death', sub: 'Client productions · 2021', year: 2021, clients: ['sectionnn8'] },
  { n: '51', post: 'CRj4nPgMjjs', kind: 'press', outlet: 'Bloomberg Law', title: "They've Got Next: The 40 Under 40", sub: 'Inaugural edition · July 2021', year: 2021 },
  { n: '52', post: 'CP_FEGsjkUm', kind: 'cover', cert: 'Culture III · #1 album', title: 'Migos ft Cardi B, Type Shit', sub: 'Produced by Section 8 · 2021', year: 2021, clients: ['sectionnn8'] },
  { n: '53', post: 'CPsobB3jEJ_', kind: 'cover', title: 'Lil Baby & Lil Durk, The Voice of the Heroes', sub: 'Client productions · 2021', year: 2021, clients: ['sectionnn8'] },
  { n: '54', post: 'CPJC2DzsJ5E', kind: 'cover', title: '42 Dugg, Free Dem Boyz', sub: 'Client productions · 2021', year: 2021, clients: ['sectionnn8', 'noahpettigrew_'] },
  { n: '55', post: 'CO2kA-JDG89', kind: 'cover', title: 'Nicki Minaj, Seeing Green (with Drake & Lil Wayne)', sub: 'Produced by Kid Masterpiece · 2021', year: 2021, clients: ['kidmasterpiece'] },
  { n: '56', post: 'CO2jmkSDWg7', kind: 'cover', cert: '"95 South" on a #1 album', title: 'J. Cole, The Off-Season', sub: '"95 South" co-produced by Coleman · 2021', year: 2021, clients: ['colxmxn'] },
  { n: '57', post: 'COfbzjrjfSt', kind: 'cover', title: 'Joyner Lucas & Lil Baby, Ramen & OJ', sub: 'Produced by Glaazer & Tom French · 2021', year: 2021, clients: ['glaazer', 'itstomfrench'] },
  { n: '58', post: 'CLHnU_nD0iB', kind: 'cover', title: 'Benny the Butcher, Trade It All', sub: 'Co-produced by Corbett · 2021', year: 2021, clients: ['corbettmusic'] },
  { n: '59', post: 'CHxy6nBDEvr', kind: 'cover', title: 'Hit-Boy ft Big Sean & Fivio Foreign, Salute', sub: 'Co-produced by Corbett · 2020', year: 2020, clients: ['corbettmusic'] },
  { n: '60', post: 'CGaBye6jjLm', kind: 'cover', cert: 'RIAA Platinum · 1,000,000 units', title: "Bleu ft Drake, You're Mine Still", sub: 'Platinum · produced by Nate Rhoads · 2020', year: 2020, clients: ['naterhoads'] },
  { n: '61', post: 'CGSdMw4DvqF', kind: 'cover', title: 'Lil Baby × Noodah05, Wild Child', sub: 'Co-produced by Young TN · 2020', year: 2020, clients: ['youngtn'] },
  { n: '62', post: 'CFetHITjopb', kind: 'press', outlet: 'Pigeons & Planes', title: 'How to Survive a Viral Hit', sub: 'Legal commentary · September 2020', year: 2020 },
  { n: '63', post: 'CFcojTHjs28', kind: 'plaque', cert: 'RIAA 2× Platinum · 2,000,000 units · certified Sep 11, 2020 (later 3× Platinum)', title: 'Lil Baby, My Turn', sub: '2× Platinum · Section 8, Noah Pettigrew & Young TN · 2020', year: 2020, clients: ['sectionnn8', 'noahpettigrew_', 'youngtn'] },
  { n: '64', post: 'CEaKOOaD2Bh', kind: 'cover', cert: '"Ultrablack" on a #1 track', title: "Nas, King's Disease", sub: '"Ultrablack" co-produced by Corbett · 2020', year: 2020, clients: ['corbettmusic'] },
  { n: '65', post: 'CD4Lkldjkyi', kind: 'cover', title: 'Anderson .Paak ft Rick Ross, Cut Em In', sub: 'Co-produced by Corbett · 2020', year: 2020, clients: ['corbettmusic'] },
  { n: '66', post: 'CDllwSGjiAa', kind: 'cover', cert: '"Or What" · RIAA Gold · 500,000 units', title: 'NLE Choppa, Top Shotta', sub: '"Or What" produced by Synthetic · 2020', year: 2020, clients: ['iamsynthetic'] },
  { n: '67', post: 'CDgzPdMDJsg', kind: 'cover', title: '645AR ft FKA twigs, Sum Bout U', sub: 'Artist client · 2020', year: 2020, clients: ['645ar'] },
  { n: '68', post: 'CAiwhbmngnC', kind: 'plaque', cert: 'RIAA Gold · 500,000 units · certified May 20, 2020', title: 'Rod Wave, Ghetto Gospel', sub: 'Gold · 2020', year: 2020 },
  { n: '69', post: 'CAF4n2kjhFI', kind: 'cover', title: 'French Montana & Tory Lanez, Cold', sub: 'Client production · 2020', year: 2020 },
].map((x) => ({ ...x, src: `${IG}${x.n}-${x.post}.jpg`, url: P(x.post) }))

const byN = Object.fromEntries(ig.map((x) => [x.n, x]))
export const pick = (...ns) => ns.map((n) => byN[n]).filter(Boolean)

export const covers = ig.filter((x) => x.kind === 'cover')
export const plaques = ig.filter((x) => x.kind === 'plaque')
export const pressShots = ig.filter((x) => x.kind === 'press')
export const events = ig.filter((x) => x.kind === 'event')

// Home page "Clients" wall: the most recognisable covers, newest first.
export const clientWall = pick('10', '25', '56', '43', '64', '38', '52', '55', '36', '24', '49', '33')
// Home page plaque strip.
export const plaqueStrip = pick('06', '08', '47', '63', '16', '20')
// One image per client handle for the catalog on the Music Law page.
export const clientImage = {
  iamsynthetic: byN['43'], corbettmusic: byN['64'], colxmxn: byN['56'], kidmasterpiece: byN['25'], sectionnn8: byN['52'],
  _hollywoodcole: byN['09'], blxst: byN['47'], joonyoftv: byN['28'], '1radiate': byN['11'], _bass______: byN['05'],
  noahpettigrew_: byN['54'], youngtn: byN['61'], alexlustig: byN['03'], itsunkwn: byN['34'], prodbydmac: byN['36'], naterhoads: byN['60'],
}
// Practice pages: imagery per area.
export const areaImages = {
  'music-law': { lead: pick('43', '10', '64'), work: covers, plaques },
  'nil-college-sports-law': { lead: pick('02', '12'), work: pick('22', '12', '39') },
  'business-entertainment-law': { lead: pick('39', '22'), work: pick('47', '06', '08', '16') },
  'fractional-general-counsel': { lead: pick('22', '39'), work: pick('12', '51', '18', '20') },
  'of-counsel': { lead: pick('12', '22'), work: pick('51', '48', '17', '21') },
}

// Karl's personal account (@esqfowlkes), pulled 2026-09-22. Law-related posts only; the wine venture is
// deliberately excluded. Files in /public/images/karl/. See research/instagram-esqfowlkes.md.
const K = '/images/karl/'
export const karl = [
  { n: 'k00', post: 'DWrLmeojohh', kind: 'firm', outlet: 'Rutgers Business School', title: 'Teaching at Rutgers Business School', sub: 'Management Skills · Fall 2026', year: 2026 },
  { n: 'k01', post: 'C5OUMS6rylr', kind: 'press', outlet: 'Billboard', title: 'Top Music Lawyers 2024', sub: 'Second consecutive year', year: 2024 },
  { n: 'k06', post: 'DDPITs8pEDj', kind: 'event', outlet: 'XP Music Futures', title: 'XP Music Futures, Riyadh', sub: 'Panelist · MDLBEAST · December 2024', year: 2024 },
  { n: 'k07', post: 'C_YO4I2xnGA', kind: 'event', outlet: 'Reeperbahn Festival', title: 'Reeperbahn Festival, Hamburg', sub: 'Wunderkinder talent scout · September 2024', year: 2024 },
  { n: 'k08', post: 'C-2tpTgxy2B', kind: 'portrait', title: 'Karl Fowlkes, Esq.', sub: 'New York · 2024', year: 2024 },
  { n: 'k09', post: 'C31XIRYs-Cn', kind: 'portrait', title: 'Karl Fowlkes, Esq.', sub: '2024', year: 2024 },
  { n: 'k10', post: 'C1DYaMKMPEJ', kind: 'event', title: 'On the panel', sub: 'December 2023', year: 2023 },
  { n: 'k12', post: 'CzH1pXsM9Af', kind: 'press', outlet: 'ABC News Live', title: 'AI songs that mimic popular artists', sub: 'On air · November 2023', year: 2023 },
  { n: 'k14', post: 'CxTgXTExV-l', kind: 'portrait', title: 'Karl Fowlkes, Esq.', sub: '2023', year: 2023 },
  { n: 'k15', post: 'CxIyjlwMOQv', kind: 'portrait', title: 'Karl Fowlkes, Esq.', sub: '2023', year: 2023 },
  { n: 'k16', post: 'CwIPq7PLA7s', kind: 'portrait', title: 'Karl Fowlkes, Esq.', sub: '2023', year: 2023 },
  { n: 'k17', post: 'Cu7EG14LEsu', kind: 'portrait', title: 'Karl Fowlkes, Esq.', sub: 'Paris · 2023', year: 2023 },
  { n: 'k18', post: 'CqlGabSrRmr', kind: 'press', outlet: 'Billboard', title: 'Top Music Lawyers 2023', sub: 'April 2023', year: 2023 },
  { n: 'k19', post: 'CoXjQFsLaQ6', kind: 'press', outlet: 'Boardroom', title: 'Build & Transcend', sub: 'Black History Month Playmaker · 2023', year: 2023 },
  { n: 'k20', post: 'CoNrMpUpCQv', kind: 'press', outlet: 'CNN', title: 'AI will both take jobs and create new ones', sub: 'Live · February 2023', year: 2023 },
  { n: 'k21', post: 'CnmsZLmpAwB', kind: 'event', title: 'With Blxst at Crypto.com Arena', sub: 'January 2023', year: 2023, clients: ['blxst'] },
  { n: 'k23', post: 'Ck_IkAsLv1y', kind: 'press', outlet: 'NJ.com', title: 'N.J. entertainment lawyer helps hip-hop artists take ownership of their music', sub: 'November 2022', year: 2022 },
  { n: 'k26', post: 'CiAnx6CvSBv', kind: 'event', outlet: 'CultureCon', title: 'CultureCon, presented by HBO Max', sub: 'Featured speaker · October 2022', year: 2022 },
  { n: 'k27', post: 'ChcgSyvL5Ap', kind: 'portrait', title: 'Karl Fowlkes, Esq.', sub: '2022', year: 2022 },
  { n: 'k29', post: 'CcLw8eMpRgE', kind: 'event', title: 'Blxst · EVGLE · Amazon Music', sub: '"Forever Humble" · 2022', year: 2022, clients: ['blxst'] },
  { n: 'k31', post: 'CUYpfWLMc7G', kind: 'press', outlet: 'Trapital', title: 'Representing star clients', sub: 'Podcast · 2021', year: 2021 },
  { n: 'k33', post: 'CRT7U1Ps519', kind: 'press', outlet: 'Bloomberg Law', title: "They've Got Next: The 40 Under 40", sub: 'July 2021', year: 2021 },
  { n: 'k36', post: 'CNaWNitMeM3', kind: 'press', outlet: 'Variety', title: 'Legal Impact Report 2021', sub: 'Up Next · #88', year: 2021 },
  { n: 'k37', post: 'CNX9gpWDrWf', kind: 'plaque', title: 'Lil Baby, My Turn', sub: '3× Platinum · highest selling & streaming album of 2020', year: 2021, clients: ['sectionnn8', 'noahpettigrew_', 'youngtn'] },
  { n: 'k38', post: 'CMhkvoYDQ77', kind: 'press', outlet: 'HITS Daily Double', title: 'Noisemakers: Karl Fowlkes', sub: '2021', year: 2021 },
  { n: 'k39', post: 'CDo59nojnRF', kind: 'portrait', title: 'Karl Fowlkes, Esq.', sub: 'New York · 2020', year: 2020 },
  { n: 'k40', post: 'CB63dg5DSNL', kind: 'event', title: 'With Section 8', sub: '"Only Up" · 2020', year: 2020, clients: ['sectionnn8'] },
].map((x) => ({ ...x, src: `${K}${x.n.slice(1)}-${x.post}.jpg`, url: P(x.post) }))

const byK = Object.fromEntries(karl.map((x) => [x.n, x]))
export const karlPortraits = karl.filter((x) => x.kind === 'portrait')
export const karlEvents = karl.filter((x) => x.kind === 'event')
export const karlPress = karl.filter((x) => x.kind === 'press')
// Recommended hero/about portraits, best first.
export const karlLead = ['k09', 'k39', 'k08', 'k10', 'k27'].map((n) => byK[n])

// Press images keyed by outlet, for the Articles page and the home press section. Firm-account shots win; Karl's fill the gaps.
export const pressImage = Object.fromEntries([...karl.filter((x) => x.outlet), ...pressShots].map((x) => [x.outlet.toLowerCase(), x]))
