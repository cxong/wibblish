import Phaser from 'phaser'

export default class extends Phaser.Button {
  constructor(game, x, y, key, label, callback, callbackContext) {
    super(game, x, y, key, callback, callbackContext, 1, 0, 2)
    this.scale.setTo(2)
  }
}
