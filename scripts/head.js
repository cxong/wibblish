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

    this.eyelids = game.add.sprite(0, 0, key + '_eyelids')
    this.eyelids.anchor.setTo(0.5, 1)
    this.addChild(this.eyelids)
    this.eyelids.bringToTop()
    this.eyesOpen()

    // Blink on click
    this.inputEnabled = true
    this.events.onInputDown.add(this.eyesToggle, this)
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

  eyesOpen() {
    this.eyelids.visible = false
    this.blinkCounter = (Math.random() * 8 + 2) * 60
  }

  eyesClose() {
    this.eyelids.visible = true
    this.blinkCounter = 10
  }

  eyesToggle() {
    if (this.eyelids.visible) {
      this.eyesOpen()
    } else {
      this.eyesClose()
    }
  }

  update() {
    this.blinkCounter--
    if (this.blinkCounter <= 0) {
      this.eyesToggle()
    }
  }
}
