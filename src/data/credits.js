// "Credits their work reached" on the Clients page, as a ledger instead of a bare name wall.
// Every record and client pairing below comes from clientCatalog in site.js; every stat was
// verified for the practice-page slideshow (RIAA, Billboard 200, Recording Academy). Nothing new
// is claimed here. Artists with no record or client on file stay in `alsoCredited`, name only.

// Headliners: the six strongest verified results, led by the number. Shown as a gallery of the actual
// covers and plaques the firm posted (never artist photos: those are licensed and imply endorsement).
export const headliners = [
  { artist: 'Lil Baby', stat: '7×', statLabel: 'RIAA Platinum', record: 'My Turn', clients: ['Section 8', 'Noah Pettigrew', 'Young TN'], kind: 'Plaque, awarded at 3×', src: '/images/karl/37-CNX9gpWDrWf.jpg' },
  { artist: 'Drake', stat: '#1', statLabel: 'Billboard 200', record: 'Honestly, Nevermind (intro)', clients: ['Kid Masterpiece'], kind: 'Album cover', src: '/images/ig/25-CfEmyUsrv7m.jpg' },
  { artist: 'PARTYNEXTDOOR & Drake', stat: '#1', statLabel: 'Billboard 200', record: '$ome $exy $ongs 4 U (five tracks)', clients: ['Kid Masterpiece'], kind: 'Album cover', src: '/images/ig/10-DGO44mBMOJ_.jpg' },
  { artist: 'Nas', stat: 'Grammy', statLabel: 'Best Rap Album', record: "King's Disease", clients: ['Corbett'], kind: 'Album cover', src: '/images/ig/64-CEaKOOaD2Bh.jpg' },
  { artist: 'Polo G ft Juice WRLD', stat: '4×', statLabel: 'RIAA Platinum', record: 'Flex', clients: ['Corbett'], kind: 'The plaque', src: '/images/ig/06-DM0LkKrM4nU.jpg' },
  { artist: 'Lil Durk', stat: '2×', statLabel: 'RIAA Platinum', record: '7220', clients: ['DMac'], kind: 'Album cover', src: '/images/ig/36-CbsnvkDriTg.jpg' },
]

// The rest of the wall, each with the record and the client behind it.
export const ledger = [
  { artist: 'Drake', record: 'Burning Bridges, Outside Tweaking, WNBA', clients: ['Alex Lustig'] },
  { artist: 'Bleu ft Drake', record: "You're Mine Still", clients: ['Nate Rhoads'], note: 'Platinum' },
  { artist: 'J. Cole', record: '39 Intro (The Fall Off)', clients: ['Coleman'] },
  { artist: 'Jack Harlow', record: 'Nail Tech', clients: ['Coleman'] },
  { artist: 'Jack Harlow & Doja Cat', record: 'Just Us, plus three tracks on Monica', clients: ['Hollywood Cole'] },
  { artist: 'Lil Wayne', record: 'Sharks', clients: ['Coleman'] },
  { artist: 'Yeat', record: '2 Alive (five cuts), ADL, Taller', clients: ['Synthetic', 'Bass'] },
  { artist: 'Don Toliver', record: 'Two cuts on his #1 album', clients: ['Synthetic'] },
  { artist: 'NLE Choppa', record: 'Or What', clients: ['Synthetic'], note: 'Gold' },
  { artist: 'Ken Carson', record: 'More Chaos (two tracks)', clients: ['Bass'] },
  { artist: 'Migos', record: 'Type Shit', clients: ['Section 8'] },
  { artist: 'Ty Dolla $ign', record: 'Chosen, with Blxst and Tyga', clients: ['Blxst', 'Section 8'], note: 'Platinum' },
  { artist: 'Anderson .Paak', record: 'Record featuring Rick Ross', clients: ['Corbett'] },
  { artist: 'Brent Faiyaz & Joony', record: 'Paper Soldiers', clients: ['Joony'], note: 'Gold' },
  { artist: 'Joey Bada$$ · Kodak Black', record: 'Records with both', clients: ['Coleman'] },
]

// On the wall, with no record or client on file: listed by name only, never embellished.
export const alsoCredited = ['Chris Brown', 'Playboi Carti', 'Rod Wave', 'YG']

// Summary band: Honestly, Nevermind; $ome $exy $ongs 4 U; Don Toliver's album = three #1 albums.
export const creditSummary = [
  ['3', '#1 albums on the Billboard 200'],
  ['7×', 'Platinum, the highest certification'],
  ['1', 'Grammy, Best Rap Album'],
]
