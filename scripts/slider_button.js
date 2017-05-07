import Phaser from 'phaser'
import Button from './button'

export default class extends Button {
  constructor(
    game, x, y, key, label, labelKey, fontSize, callback, callbackContext,
    dragOptions) {
    dragOptions = dragOptions || {}
    dragOptions.scale = dragOptions.scale || 0.01
    dragOptions.labelSize = dragOptions.labelSize || 3
    super(
      game, x, y, key,
      '< ' + label + '0'.repeat(dragOptions.labelSize) + ' >', labelKey,
      fontSize)
    this.dragOptions = dragOptions
    this.labelOriginal = label
    this.callback = callback
    this.callbackContext = callbackContext

    this.dragStart = null
    this.button.onInputDown.add(() => {
      this.dragStart = this.game.input.activePointer.positionDown.clone()
    }, this)
    this.button.onInputUp.add(() => {
      this.dragStart = null
    }, this)

    // initialise label
    this.callback(this, new Phaser.Point(0, 0))
  }

  setLabel(amount) {
    const amountLabel = amount.toString().substring(
      0, this.dragOptions.labelSize)
    this.label.text = '< ' + this.labelOriginal + amountLabel + ' >'
  }

  update() {
    if (this.dragStart && this.callback) {
      const pos = this.game.input.activePointer.position.clone()
      const d = pos.subtract(this.dragStart.x, this.dragStart.y)
      const ds = d.multiply(this.dragOptions.scale, this.dragOptions.scale)
      this.callback(this, ds)
      this.dragStart = this.game.input.activePointer.position.clone()
    }
  }
}
