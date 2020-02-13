import { range } from './util'

const assets = {
  spritesheets: [
  ],
  images: [
    'bg/country_side', 'bg/hazy_hills', 'bg/palace', 'bg/school', 'bg/sky',
    'bg/space',
    'bg/urban_landscape'
  ],
  heads: [
    ['heads/courtesan', 4], ['heads/king', 6], ['heads/monk', 6],
    ['heads/ogre', 5], ['heads/reticulan', 3]
  ],
  sounds: [
    'beep', 'ugh', 'wib'
  ].concat(
    range('wawa/start/', 4)
  ).concat(
    range('wawa/mid/', 6)
  ).concat(
    range('wawa/end/', 4)
  ),
  music: [
    // 'title', '1'
  ],
  bitmapFonts: [
    'alagard'
  ],
  nineSlices: [
    ['frame', 7, 10, 10, 7]
  ],
  nineSliceButtons: [
    ['button', 9, 6, 6, 9]
  ]
}
export default assets
