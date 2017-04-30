import Phaser from 'phaser'

export default class extends Phaser.State {
  init() {
    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL
    this.game.scale.compatibility.forceMinimumDocumentHeight = true
    this.game.scale.windowConstraints = {'right': 'layout', 'bottom': 'layout'}
    this.game.renderer.renderSession.roundPixels = true
  }

  preload() {
    this.game.load.spritesheet(
      'merc', 'images/merc.png', 32, 32
    )
  }

  create() {
    this.game.stage.backgroundColor = 0xffffff
    this.input.maxPointers = 1

    this.state.start('Preload')
  }
}
