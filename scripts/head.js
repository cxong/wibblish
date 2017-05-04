import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor(game, x, y, key, scale) {
    super(game, x, y, key)
    this.anchor.setTo(0.5, 1)
    this.scale.setTo(scale)
    this.mouth = game.add.sprite(0, 0, key + '_mouth')
    this.mouth.anchor.setTo(0.5, 1)
    this.addChild(this.mouth)
    this.mouth.bringToTop()
    this.mouthClose()
  }

  mouthOpen() {
    this.mouth.visible = true
  }

  mouthClose() {
    this.mouth.visible = false
  }

  mouthToggle() {
    this.mouth.visible = !this.mouth.visible
  }
}
