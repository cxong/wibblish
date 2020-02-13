import Phaser from 'phaser'
import Assets from './assets'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from './graphics'

const headImages = (name) => {
  return [name, name + '_eyelids', name + '_mouth']
}

export default class extends Phaser.State {
  init() {
    this.preloadBar = null
  }

  preload() {
    this.preloadBar = this.add.sprite((SCREEN_WIDTH - 15) / 2,
                                      (SCREEN_HEIGHT - 15) / 2,
                                      'qubodup-small-glad')
    this.load.setPreloadSprite(this.preloadBar)

    var basicGame = this
    Assets.spritesheets.map((s) => {
      basicGame.game.load.spritesheet(
        s[0], 'images/' + s[0] + '.png', s[1], s[2])
    })
    Assets.images.map((i) => {
      basicGame.game.load.image(i, 'images/' + i + '.png')
    })
    Assets.heads.map((i) => {
      headImages(i[0]).map((j) => {
        basicGame.game.load.image(j, 'images/' + j + '.png')
      })
    })
    Assets.music.map((i) => {
      basicGame.game.load.audio(i, 'music/' + i + '.ogg')
    })
    Assets.sounds.map((i) => {
      basicGame.game.load.audio(i, 'sounds/' + i + '.ogg')
    })
    Assets.bitmapFonts.map((i) => {
      basicGame.game.load.bitmapFont(
        i, 'images/' + i + '.png', 'images/' + i + '.xml')
    })
    Assets.nineSlices.map((s) => {
      basicGame.game.load.nineSlice(
        s[0], 'images/' + s[0] + '.png', s[1], s[2], s[3], s[4])
    })
    Assets.nineSliceButtons.map((s) => {
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
