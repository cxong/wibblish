import Phaser from 'phaser'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from './graphics'

const assets = {
  spritesheets: [
  ],
  images: [
    'bg/country_side', 'bg/hazy_hills', 'bg/sky', 'bg/urban_landscape'
  ],
  sounds: [
    'beep'
  ],
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

export default class extends Phaser.State {
  init() {
    this.preloadBar = null
  }

  preload() {
    this.preloadBar = this.add.sprite((SCREEN_WIDTH - 24) / 2,
                                      (SCREEN_HEIGHT - 24) / 2,
                                      'merc')
    /*this.preloadBar.animations.add(
      'run_right', [12, 13, 14, 15], 20, true
    );
    this.preloadBar.animations.play('run_right');*/
    this.load.setPreloadSprite(this.preloadBar)

    var basicGame = this
    assets.spritesheets.map((s) => {
      basicGame.game.load.spritesheet(
        s[0], 'images/' + s[0] + '.png', s[1], s[2])
    })
    assets.images.map((i) => {
      basicGame.game.load.image(i, 'images/' + i + '.png')
    })
    assets.music.map((i) => {
      basicGame.game.load.audio(i, 'music/' + i + '.ogg')
    })
    assets.sounds.map((i) => {
      basicGame.game.load.audio(i, 'sounds/' + i + '.ogg')
    })
    assets.bitmapFonts.map((i) => {
      basicGame.game.load.bitmapFont(
        i, 'images/' + i + '.png', 'images/' + i + '.xml')
    })
    assets.nineSlices.map((s) => {
      basicGame.game.load.nineSlice(
        s[0], 'images/' + s[0] + '.png', s[1], s[2], s[3], s[4])
    })
    assets.nineSliceButtons.map((s) => {
      basicGame.game.load.nineSlice(
        s[0], 'images/' + s[0] + '.png', s[1], s[2], s[3], s[4])
      basicGame.game.load.nineSlice(
        s[0] + '_over', 'images/' + s[0] + '_over.png', s[1], s[2], s[3], s[4])
      basicGame.game.load.nineSlice(
        s[0] + '_down', 'images/' + s[0] + '_down.png', s[1], s[2], s[3], s[4])
    })
  }

  create() {
    this.state.start('Game')
  }
}
